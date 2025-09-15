"use client";

import { apiFetch } from "@/app/utils/apiFetch";
import { useState } from "react";

const CreateCommittee = () => {
  const [newCommitteeName, setNewCommitteeName] = useState("");
  const [newCommitteePassword, setNewCommitteePassword] = useState("");
  const [adminPassword, setAdminPassword] = useState<string>("");

  const handleCreate = async () => {
    // Implement create logic here
    const res = await apiFetch("/committees", {
      method: "POST",
      body: JSON.stringify({
        committeeName: newCommitteeName,
        password: newCommitteePassword,
        adminPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <h1>Luo uusi asukastoimikunta</h1>
        <input
          type="text"
          placeholder="New committee name"
          value={newCommitteeName}
          onChange={(e) => setNewCommitteeName(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="password"
          placeholder="New password"
          value={newCommitteePassword}
          onChange={(e) => setNewCommitteePassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="password"
          placeholder="Admin password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <button
          onClick={handleCreate}
          className="w-full rounded bg-green-600 px-3 py-2 transition hover:bg-green-700"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateCommittee;
