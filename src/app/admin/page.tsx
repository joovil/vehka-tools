"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import SidebarInputComponent from "../components/inputs/SidebarInputComponent";
import { apiFetch } from "../utils/apiFetch";

type Status = { ok: boolean; message: string } | null;

const Admin = () => {
  const t = useTranslations();
  const [committeeName, setCommitteeName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  // Like the other forms, errors are only shown after a submit attempt
  const [checkErrors, setCheckErrors] = useState(false);

  const passwordsMatch = password === passwordAgain;
  const formValid =
    !!committeeName.trim() && !!password && passwordsMatch && !!adminPassword;

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValid) {
      setCheckErrors(true);
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      const res = await apiFetch("/committees", {
        method: "POST",
        body: JSON.stringify({ committeeName, password, adminPassword }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus({
          ok: false,
          message: data.message ?? t("admin.createFailed"),
        });
        return;
      }

      setStatus({
        ok: true,
        message: t("admin.createSuccess", { name: committeeName }),
      });
      setCommitteeName("");
      setPassword("");
      setPasswordAgain("");
      setCheckErrors(false);
    } catch {
      setStatus({ ok: false, message: t("admin.createFailed") });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="text-teal-darker mb-3 inline-block text-sm underline-offset-2 hover:underline"
        >
          ← {t("documents.backToHome")}
        </Link>

        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-lg"
        >
          <div>
            <h1 className="text-teal-darker">{t("admin.title")}</h1>
            <p className="text-sm text-gray-600">
              {t("admin.createCommitteeTitle")}
            </p>
          </div>

          <SidebarInputComponent
            label={t("admin.newCommitteeName")}
            value={committeeName}
            onChange={(e) => setCommitteeName(e.target.value)}
            hasError={checkErrors && !committeeName.trim()}
            errorMessage={t("admin.required")}
          />
          <SidebarInputComponent
            label={t("admin.newPassword")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            hasError={checkErrors && !password}
            errorMessage={t("admin.required")}
          />
          <SidebarInputComponent
            label={t("admin.retypePassword")}
            type="password"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            hasError={checkErrors && !passwordsMatch}
            errorMessage={t("admin.passwordsDontMatch")}
          >
            {checkErrors && !passwordsMatch && (
              <p className="text-sm text-red-700">
                {t("admin.passwordsDontMatch")}
              </p>
            )}
          </SidebarInputComponent>

          <hr className="my-1 border-gray-200" />

          <SidebarInputComponent
            label={t("admin.adminPassword")}
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            hasError={checkErrors && !adminPassword}
            errorMessage={t("admin.required")}
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-2"
          >
            {submitting ? t("admin.creating") : t("admin.create")}
          </button>

          {status && (
            <p
              className={`text-sm ${status.ok ? "text-teal-darker" : "text-red-700"}`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Admin;
