import "./utils/setup";

import { sql } from "kysely";
import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";
import { db } from "../database";
import { createCommittee, getCommittee } from "../repos/committeesRepo";

/**
 * Test suite for Committee Repository functions
 *
 * This test suite covers:
 * - createCommittee: Creating committees with various input types and edge cases
 * - getCommittee: Retrieving committees by ID with validation and error handling
 * - Integration tests: End-to-end functionality and performance scenarios
 *
 * The tests ensure proper database interaction, data validation, error handling,
 * and support for special characters, Unicode, and edge cases.
 */

describe("Committee Repository", () => {
  beforeEach(async () => {
    // Clean tables before each test
    await sql`TRUNCATE TABLE minutes, committees RESTART IDENTITY CASCADE`.execute(
      db,
    );
  });

  describe("createCommittee", () => {
    it("should create a committee with name and password", async () => {
      const name = "Test Committee";
      const password = "TestPassword123";

      const committee = await createCommittee(name, password);

      assert.ok(committee);
      assert.strictEqual(committee.name, name);
      assert.strictEqual(committee.password, password);
      assert.ok(typeof committee.id === "number");
      assert.ok(committee.id > 0);
    });

    it("should create multiple committees with unique IDs", async () => {
      const committee1 = await createCommittee("Committee 1", "Password1");
      const committee2 = await createCommittee("Committee 2", "Password2");

      assert.ok(committee1.id);
      assert.ok(committee2.id);
      assert.notStrictEqual(committee1.id, committee2.id);
      assert.strictEqual(committee1.name, "Committee 1");
      assert.strictEqual(committee2.name, "Committee 2");
    });

    it("should handle special characters in name and password", async () => {
      const name = "Committee with Special @#$% Characters";
      const password = "P@ssw0rd!#$%^&*()";

      const committee = await createCommittee(name, password);

      assert.strictEqual(committee.name, name);
      assert.strictEqual(committee.password, password);
    });

    it("should handle empty strings", async () => {
      const committee = await createCommittee("", "");

      assert.strictEqual(committee.name, "");
      assert.strictEqual(committee.password, "");
      assert.ok(typeof committee.id === "number");
    });

    it("should handle long strings", async () => {
      const longName = "A".repeat(255); // Assuming reasonable DB column limits
      const longPassword = "B".repeat(255);

      const committee = await createCommittee(longName, longPassword);

      assert.strictEqual(committee.name, longName);
      assert.strictEqual(committee.password, longPassword);
    });

    it("should allow duplicate names with different passwords", async () => {
      const name = "Duplicate Name Committee";

      const committee1 = await createCommittee(name, "Password1");
      const committee2 = await createCommittee(name, "Password2");

      assert.strictEqual(committee1.name, name);
      assert.strictEqual(committee2.name, name);
      assert.strictEqual(committee1.password, "Password1");
      assert.strictEqual(committee2.password, "Password2");
      assert.notStrictEqual(committee1.id, committee2.id);
    });

    it("should handle Unicode characters", async () => {
      const unicodeName = "委員会 🏛️ Committee";
      const unicodePassword = "密码123 🔐";

      const committee = await createCommittee(unicodeName, unicodePassword);

      assert.strictEqual(committee.name, unicodeName);
      assert.strictEqual(committee.password, unicodePassword);
    });
  });

  describe("getCommittee", () => {
    let testCommitteeId: number;

    beforeEach(async () => {
      // The database is already cleared by the parent beforeEach
      // Create a test committee for getCommittee tests
      const committee = await createCommittee("Test Committee", "TestPassword");
      testCommitteeId = committee.id;
    });

    it("should retrieve committee by ID", async () => {
      const committee = await getCommittee(testCommitteeId);

      assert.ok(committee);
      assert.strictEqual(committee.name, "Test Committee");
      assert.strictEqual(committee.password, "TestPassword");
    });

    it("should return only name and password fields", async () => {
      const committee = await getCommittee(testCommitteeId);

      // Verify only expected fields are present
      const keys = Object.keys(committee);
      assert.strictEqual(keys.length, 2);
      assert.ok(keys.includes("name"));
      assert.ok(keys.includes("password"));
      assert.ok(!keys.includes("id"));
    });

    it("should throw error when committee does not exist", async () => {
      const nonExistentId = 99999;

      let errorThrown = false;
      try {
        await getCommittee(nonExistentId);
      } catch (error) {
        errorThrown = true;
        assert.ok(error instanceof Error);
        // The exact error message depends on Kysely's implementation
        assert.ok(
          error.message.includes("no result") ||
            error.message.includes("not found") ||
            error.message.includes("NoResultError"),
        );
      }

      assert.strictEqual(
        errorThrown,
        true,
        "Expected an error to be thrown for non-existent committee",
      );
    });

    it("should retrieve correct committee when multiple exist", async () => {
      // Create additional committees
      const committee2 = await createCommittee("Committee 2", "Password2");
      const committee3 = await createCommittee("Committee 3", "Password3");

      // Get each committee and verify correct data
      const retrieved1 = await getCommittee(testCommitteeId);
      const retrieved2 = await getCommittee(committee2.id);
      const retrieved3 = await getCommittee(committee3.id);

      assert.strictEqual(retrieved1.name, "Test Committee");
      assert.strictEqual(retrieved1.password, "TestPassword");

      assert.strictEqual(retrieved2.name, "Committee 2");
      assert.strictEqual(retrieved2.password, "Password2");

      assert.strictEqual(retrieved3.name, "Committee 3");
      assert.strictEqual(retrieved3.password, "Password3");
    });

    it("should handle committee with special characters", async () => {
      const specialCommittee = await createCommittee(
        "Special @#$% Committee",
        "Sp3c!@l_P@ssw0rd",
      );

      const retrieved = await getCommittee(specialCommittee.id);

      assert.strictEqual(retrieved.name, "Special @#$% Committee");
      assert.strictEqual(retrieved.password, "Sp3c!@l_P@ssw0rd");
    });

    it("should handle committee with empty name and password", async () => {
      const emptyCommittee = await createCommittee("", "");

      const retrieved = await getCommittee(emptyCommittee.id);

      assert.strictEqual(retrieved.name, "");
      assert.strictEqual(retrieved.password, "");
    });

    it("should throw error for invalid ID types", async () => {
      let errorThrown = false;
      try {
        // Test with negative ID
        await getCommittee(-1);
      } catch (error) {
        errorThrown = true;
        assert.ok(error instanceof Error);
      }

      assert.strictEqual(
        errorThrown,
        true,
        "Expected an error to be thrown for negative ID",
      );
    });

    it("should handle very large IDs", async () => {
      const veryLargeId = 999999999;

      let errorThrown = false;
      try {
        await getCommittee(veryLargeId);
      } catch (error) {
        errorThrown = true;
        assert.ok(error instanceof Error);
        assert.ok(
          error.message.includes("no result") ||
            error.message.includes("not found") ||
            error.message.includes("NoResultError"),
        );
      }

      assert.strictEqual(
        errorThrown,
        true,
        "Expected an error to be thrown for very large ID",
      );
    });
  });

  describe("Integration tests", () => {
    it("should work together - create then retrieve", async () => {
      const name = "Integration Test Committee";
      const password = "IntegrationPassword";

      // Create committee
      const created = await createCommittee(name, password);

      // Retrieve committee
      const retrieved = await getCommittee(created.id);

      // Verify they match
      assert.strictEqual(retrieved.name, created.name);
      assert.strictEqual(retrieved.password, created.password);
      assert.strictEqual(retrieved.name, name);
      assert.strictEqual(retrieved.password, password);
    });

    it("should handle rapid creation and retrieval", async () => {
      const committees = [];

      // Create multiple committees rapidly
      for (let i = 0; i < 3; i++) {
        const committee = await createCommittee(
          `Committee ${i}`,
          `Password${i}`,
        );
        committees.push(committee);
      }

      // Retrieve all committees and verify
      for (let i = 0; i < committees.length; i++) {
        const retrieved = await getCommittee(committees[i].id);
        assert.strictEqual(retrieved.name, `Committee ${i}`);
        assert.strictEqual(retrieved.password, `Password${i}`);
      }
    });
  });
});
