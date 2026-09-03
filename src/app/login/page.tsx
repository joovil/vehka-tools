"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { apiFetch } from "../utils/apiFetch";

const Login = () => {
  const t = useTranslations();
  const [committeeName, setCommitteeName] = useState("");
  const [password, setPassword] = useState("");

  const [newCommitteeName, setNewCommitteeName] = useState("");
  const [newCommitteePassword, setNewCommitteePassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [loginMessage, setLoginMessage] = useState("");
  const [createMessage, setCreateMessage] = useState("");

  const login = async () => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ committeeName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setLoginMessage(
      res.ok
        ? t("login.loginSuccess")
        : (data.message ?? t("login.loginFailed")),
    );
  };

  const handleCreate = async () => {
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
    setCreateMessage(
      res.ok
        ? t("login.createSuccess")
        : (data.message ?? t("login.createFailed")),
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-2xl items-center justify-center gap-8">
        {/* Login form */}
        <div className="flex w-full max-w-xs flex-col items-center gap-4">
          <input
            type="text"
            placeholder={t("login.committeeName")}
            value={committeeName}
            onChange={(e) => setCommitteeName(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <input
            type="password"
            placeholder={t("login.password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <button
            onClick={login}
            className="w-full rounded bg-blue-600 px-3 py-2 transition hover:bg-blue-700"
          >
            {t("login.logIn")}
          </button>
          {loginMessage && <div className="text-sm">{loginMessage}</div>}
        </div>
        {/* Create form */}
        <div className="flex w-full max-w-xs flex-col items-center gap-4">
          <input
            type="text"
            placeholder={t("login.newCommitteeName")}
            value={newCommitteeName}
            onChange={(e) => setNewCommitteeName(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <input
            type="password"
            placeholder={t("login.newPassword")}
            value={newCommitteePassword}
            onChange={(e) => setNewCommitteePassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <input
            type="password"
            placeholder={t("login.adminPassword")}
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
          />
          <button
            onClick={handleCreate}
            className="w-full rounded bg-green-600 px-3 py-2 transition hover:bg-green-700"
          >
            {t("login.create")}
          </button>
          {createMessage && <div className="text-sm">{createMessage}</div>}
        </div>
        <div>
          <button onClick={() => apiFetch("/auth/logout", { method: "POST" })}>
            {t("login.logout")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
