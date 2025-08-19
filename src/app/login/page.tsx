"use client";

import { useState } from "react";
import { apiFetch } from "../utils/apiFetch";

const Login = () => {
  const [committeeName, setCommitteeName] = useState("");
  const [password, setPassword] = useState("");

  const [newCommitteeName, setNewCommitteeName] = useState("");
  const [newCommitteePassword, setNewCommitteePassword] = useState("");

  const login = async () => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ committeeName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  const handleCreate = async () => {
    // Implement create logic here
    const res = await apiFetch("/committees", {
      method: "POST",
      body: JSON.stringify({
        committeeName: newCommitteeName,
        password: newCommitteePassword,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-2xl items-center justify-center gap-8">
        {/* Login form */}
        <div className="flex w-full max-w-xs flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Committee name"
            value={committeeName}
            onChange={(e) => setCommitteeName(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <button
            onClick={login}
            className="w-full rounded bg-blue-600 px-3 py-2 transition hover:bg-blue-700"
          >
            Log in
          </button>
        </div>
        {/* Create form */}
        <div className="flex w-full max-w-xs flex-col items-center gap-4">
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
          <button
            onClick={handleCreate}
            className="w-full rounded bg-green-600 px-3 py-2 transition hover:bg-green-700"
          >
            Create
          </button>
        </div>
        <div>
          <button onClick={() => apiFetch("/auth/logout", { method: "POST" })}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
