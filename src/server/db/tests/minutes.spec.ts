import "./utils/setup";

import { sql } from "kysely";
import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";
import { db } from "../database";
import { addMinutes, getMinutes } from "../repos/minutesRepo";

describe("Minutes Repository", () => {
  let tenantCommitteeId: number;

  beforeEach(async () => {
    // Clean tables before each test
    await sql`TRUNCATE TABLE minutes, tenant_committees RESTART IDENTITY CASCADE`.execute(
      db,
    );

    // Create a test tenant committee
    const result = await db
      .insertInto("tenantCommittees")
      .values({
        name: "Test Committee",
      })
      .returning("id")
      .executeTakeFirstOrThrow();

    tenantCommitteeId = result.id;
  });

  describe("getMinutes", () => {
    it("should return empty array when no minutes exist", async () => {
      const minutes = await getMinutes();
      assert.strictEqual(Array.isArray(minutes), true);
      assert.strictEqual(minutes.length, 0);
    });

    it("should return all minutes when they exist", async () => {
      // Add test minutes
      await addMinutes({
        filename: "test-minutes-1.pdf",
        blobUrl: "https://example.com/blob1",
        tenantCommitteeId,
      });

      await addMinutes({
        filename: "test-minutes-2.pdf",
        blobUrl: "https://example.com/blob2",
        tenantCommitteeId,
      });

      const minutes = await getMinutes();
      assert.strictEqual(minutes.length, 2);
      assert.strictEqual(minutes[0].filename, "test-minutes-1.pdf");
      assert.strictEqual(minutes[1].filename, "test-minutes-2.pdf");
    });
  });

  describe("addMinutes", () => {
    it("should add minutes with correct number format for first entry of year", async () => {
      const currentYear = new Date().getFullYear();

      await addMinutes({
        filename: "first-minutes.pdf",
        blobUrl: "https://example.com/blob",
        tenantCommitteeId,
      });

      const minutes = await getMinutes();
      assert.strictEqual(minutes.length, 1);
      assert.strictEqual(minutes[0].filename, "first-minutes.pdf");
      assert.strictEqual(minutes[0].blobUrl, "https://example.com/blob");
      assert.strictEqual(minutes[0].tenantCommitteeId, tenantCommitteeId);
      assert.strictEqual(minutes[0].number, `1/${currentYear}`);
      assert.strictEqual(minutes[0].created instanceof Date, true);
    });

    it("should increment number correctly for subsequent entries in same year", async () => {
      const currentYear = new Date().getFullYear();

      // Add first minutes
      await addMinutes({
        filename: "first-minutes.pdf",
        blobUrl: "https://example.com/blob1",
        tenantCommitteeId,
      });

      // Add second minutes
      await addMinutes({
        filename: "second-minutes.pdf",
        blobUrl: "https://example.com/blob2",
        tenantCommitteeId,
      });

      const minutes = await getMinutes();
      assert.strictEqual(minutes.length, 2);

      // Find the entries by filename since order might vary
      const firstMinutes = minutes.find(
        (m) => m.filename === "first-minutes.pdf",
      );
      const secondMinutes = minutes.find(
        (m) => m.filename === "second-minutes.pdf",
      );

      assert.ok(firstMinutes);
      assert.ok(secondMinutes);
      assert.strictEqual(firstMinutes.number, `1/${currentYear}`);
      assert.strictEqual(secondMinutes.number, `2/${currentYear}`);
    });

    it("should handle multiple tenant committees separately", async () => {
      const currentYear = new Date().getFullYear();

      // Create second tenant committee
      const secondCommittee = await db
        .insertInto("tenantCommittees")
        .values({
          name: "Second Committee",
        })
        .returning("id")
        .executeTakeFirstOrThrow();

      // Add minutes for first committee
      await addMinutes({
        filename: "committee1-minutes.pdf",
        blobUrl: "https://example.com/blob1",
        tenantCommitteeId,
      });

      // Add minutes for second committee
      await addMinutes({
        filename: "committee2-minutes.pdf",
        blobUrl: "https://example.com/blob2",
        tenantCommitteeId: secondCommittee.id,
      });

      // Add another for first committee
      await addMinutes({
        filename: "committee1-minutes-2.pdf",
        blobUrl: "https://example.com/blob3",
        tenantCommitteeId,
      });

      const minutes = await getMinutes();
      assert.strictEqual(minutes.length, 3);

      const committee1Minutes = minutes.filter(
        (m) => m.tenantCommitteeId === tenantCommitteeId,
      );
      const committee2Minutes = minutes.filter(
        (m) => m.tenantCommitteeId === secondCommittee.id,
      );

      assert.strictEqual(committee1Minutes.length, 2);
      assert.strictEqual(committee2Minutes.length, 1);

      // Check numbering is separate per committee
      const committee1Numbers = committee1Minutes.map((m) => m.number).sort();
      const committee2Numbers = committee2Minutes.map((m) => m.number);

      assert.deepStrictEqual(committee1Numbers, [
        `1/${currentYear}`,
        `2/${currentYear}`,
      ]);
      assert.deepStrictEqual(committee2Numbers, [`1/${currentYear}`]);
    });

    it("should create minutes with current date", async () => {
      await addMinutes({
        filename: "date-test-minutes.pdf",
        blobUrl: "https://example.com/blob",
        tenantCommitteeId,
      });

      const minutes = await getMinutes();

      assert.strictEqual(minutes.length, 1);
      const createdDate = minutes[0].created;

      // Verify that the created date is a valid Date object and is recent
      assert.ok(
        createdDate instanceof Date,
        "Created date should be a Date object",
      );

      // Check that the date is within the last day (allowing for timezone differences)
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      assert.ok(
        createdDate >= oneDayAgo && createdDate <= oneDayFromNow,
        `Created date ${createdDate.toISOString()} should be within the last day. Range: ${oneDayAgo.toISOString()} to ${oneDayFromNow.toISOString()}`,
      );
    });

    it("should handle transaction rollback on error", async () => {
      // This test ensures that if something fails during the transaction,
      // no partial data is left in the database

      let errorThrown = false;
      try {
        // Try to add minutes with invalid tenant committee ID
        await addMinutes({
          filename: "invalid-minutes.pdf",
          blobUrl: "https://example.com/blob",
          tenantCommitteeId: 99999, // Non-existent ID
        });
      } catch (error) {
        errorThrown = true;
        // Verify it's a foreign key constraint error
        assert.ok(error instanceof Error);
        assert.ok(
          error.message.includes("violates foreign key constraint") ||
            error.message.includes("foreign key") ||
            error.message.includes("constraint"),
        );
      }

      // Verify an error was thrown
      assert.strictEqual(
        errorThrown,
        true,
        "Expected an error to be thrown for invalid foreign key",
      );

      // Verify no minutes were added
      const minutes = await getMinutes();
      assert.strictEqual(minutes.length, 0);
    });
  });
});
