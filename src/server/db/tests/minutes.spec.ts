import "./utils/setup";

import { sql } from "kysely";
import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";
import { db } from "../database";
import {
  addMinutes,
  getMinutes,
  getMinutesByCommittee,
  getNextMinutesNumber,
} from "../repos/minutesRepo";

describe("Minutes Repository", () => {
  let committeeId: number;

  beforeEach(async () => {
    // Clean tables before each test
    await sql`TRUNCATE TABLE minutes, committees RESTART IDENTITY CASCADE`.execute(
      db,
    );

    // Create a test committee
    const result = await db
      .insertInto("committees")
      .values({
        name: "Test Committee",
        passwordHash: "TestPassword",
      })
      .returning("id")
      .executeTakeFirstOrThrow();

    committeeId = result.id;
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
        committeeId,
      });

      await addMinutes({
        filename: "test-minutes-2.pdf",
        blobUrl: "https://example.com/blob2",
        committeeId,
      });

      const minutes = await getMinutes();
      assert.strictEqual(minutes.length, 2);
      assert.strictEqual(minutes[0].filename, "test-minutes-1.pdf");
      assert.strictEqual(minutes[1].filename, "test-minutes-2.pdf");
    });
  });

  describe("getMinutesByCommittee", () => {
    it("should return only the given committee's minutes", async () => {
      const secondCommittee = await db
        .insertInto("committees")
        .values({
          name: "Second Committee",
          passwordHash: "SecondPassword",
        })
        .returning("id")
        .executeTakeFirstOrThrow();

      await addMinutes({
        filename: "committee1-minutes.pdf",
        blobUrl: "https://example.com/blob1",
        committeeId: committeeId,
      });
      await addMinutes({
        filename: "committee2-minutes.pdf",
        blobUrl: "https://example.com/blob2",
        committeeId: secondCommittee.id,
      });

      const minutes = await getMinutesByCommittee(committeeId);
      assert.strictEqual(minutes.length, 1);
      assert.strictEqual(minutes[0].filename, "committee1-minutes.pdf");
      assert.strictEqual(minutes[0].committeeId, committeeId);
    });

    it("should return empty array for a committee with no minutes", async () => {
      await addMinutes({
        filename: "committee1-minutes.pdf",
        blobUrl: "https://example.com/blob1",
        committeeId: committeeId,
      });

      const minutes = await getMinutesByCommittee(committeeId + 1);
      assert.deepStrictEqual(minutes, []);
    });
  });

  describe("addMinutes", () => {
    it("should store the given number and document type", async () => {
      const currentYear = new Date().getFullYear();

      await addMinutes({
        filename: "first-minutes.pdf",
        blobUrl: "https://example.com/blob",
        committeeId,
        documentType: "minutes",
        number: `1/${currentYear}`,
      });

      const minutes = await getMinutes();
      assert.strictEqual(minutes.length, 1);
      assert.strictEqual(minutes[0].filename, "first-minutes.pdf");
      assert.strictEqual(minutes[0].blobUrl, "https://example.com/blob");
      assert.strictEqual(minutes[0].committeeId, committeeId);
      assert.strictEqual(minutes[0].documentType, "minutes");
      assert.strictEqual(minutes[0].number, `1/${currentYear}`);
    });

    it("should store no number when none is given", async () => {
      await addMinutes({
        filename: "invite.pdf",
        blobUrl: "https://example.com/blob",
        committeeId,
        documentType: "meeting-invite",
      });

      const minutes = await getMinutes();
      assert.strictEqual(minutes.length, 1);
      assert.strictEqual(minutes[0].number, null);
    });

    it("should create minutes with current date", async () => {
      await addMinutes({
        filename: "date-test-minutes.pdf",
        blobUrl: "https://example.com/blob",
        committeeId: committeeId,
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

    it("should not add minutes for an invalid committee", async () => {
      let errorThrown = false;
      try {
        // Try to add minutes with invalid committee ID
        await addMinutes({
          filename: "invalid-minutes.pdf",
          blobUrl: "https://example.com/blob",
          committeeId: 99999, // Non-existent ID
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

  describe("getNextMinutesNumber", () => {
    const year = new Date().getFullYear();
    let blob = 0;
    const save = (
      documentType: "minutes" | "resident-meeting-minutes" | "accounting",
      number?: string,
      committee = committeeId,
    ) =>
      addMinutes({
        filename: `doc-${blob}.pdf`,
        blobUrl: `https://example.com/blob${blob++}`,
        committeeId: committee,
        documentType,
        number,
      });

    it("should start at 1 when nothing is saved", async () => {
      assert.strictEqual(
        await getNextMinutesNumber(committeeId, "minutes", year),
        1,
      );
    });

    it("should continue from the highest saved number", async () => {
      await save("minutes", `1/${year}`);
      await save("minutes", `4/${year}`);
      assert.strictEqual(
        await getNextMinutesNumber(committeeId, "minutes", year),
        5,
      );
    });

    it("should not advance when the same number is saved again", async () => {
      await save("minutes", `2/${year}`);
      await save("minutes", `2/${year}`);
      assert.strictEqual(
        await getNextMinutesNumber(committeeId, "minutes", year),
        3,
      );
    });

    it("should keep a separate sequence per document type", async () => {
      await save("minutes", `3/${year}`);
      await save("resident-meeting-minutes", `1/${year}`);
      await save("accounting");
      await save("accounting");

      assert.strictEqual(
        await getNextMinutesNumber(committeeId, "minutes", year),
        4,
      );
      assert.strictEqual(
        await getNextMinutesNumber(
          committeeId,
          "resident-meeting-minutes",
          year,
        ),
        2,
      );
    });

    it("should only count the given year", async () => {
      await save("minutes", `9/${year - 1}`);
      assert.strictEqual(
        await getNextMinutesNumber(committeeId, "minutes", year),
        1,
      );
      assert.strictEqual(
        await getNextMinutesNumber(committeeId, "minutes", year - 1),
        10,
      );
    });

    it("should only count the given committee", async () => {
      const other = await db
        .insertInto("committees")
        .values({ name: "Other Committee", passwordHash: "OtherPassword" })
        .returning("id")
        .executeTakeFirstOrThrow();

      await save("minutes", `5/${year}`, other.id);
      assert.strictEqual(
        await getNextMinutesNumber(committeeId, "minutes", year),
        1,
      );
    });
  });
});
