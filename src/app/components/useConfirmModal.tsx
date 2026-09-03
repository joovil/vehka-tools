"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../utils/apiFetch";
import { useAuth } from "./AuthProvider";

export const useConfirmModal = (promptMessage?: string) => {
  const t = useTranslations();
  const { refresh } = useAuth();
  const formRef = useRef<HTMLFormElement | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const [visible, setVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const setVisibleWithResolve = (newVisible: boolean, loginSuccess = false) => {
    setVisible(newVisible);
    if (!newVisible && resolveRef.current) {
      resolveRef.current(loginSuccess);
      resolveRef.current = null;
    }
  };

  const showModal = (): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setVisible(true);
    });
  };

  useEffect(() => {
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(e.target as HTMLElement)
      ) {
        setVisibleWithResolve(false, false);
      }
    };

    document.addEventListener("click", detectOutsideClick);
    return () => document.removeEventListener("click", detectOutsideClick);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const committeeName = e.currentTarget.committeeName.value;
    const password = e.currentTarget.password.value;
    if (!committeeName || !password) {
      setErrorMessage(t("confirmModal.invalidCredentials"));
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ committeeName, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      setErrorMessage(t("confirmModal.invalidCredentials"));
      return;
    }

    // Every login in the app goes through this hook, so refreshing here keeps
    // the menu's indicator in sync no matter which entry point was used.
    await refresh();
    setVisibleWithResolve(false, true);
  };

  const ConfirmModal = visible ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className="rounded-lg border bg-white p-6 pt-4 shadow-lg"
      >
        <div className="font-bold text-wrap">
          {promptMessage ?? t("confirmModal.loginPrompt")}
        </div>
        <div className="flex flex-col">
          <label>{t("confirmModal.committeeName")}</label>
          <input
            name="committeeName"
            type="text"
            className="input-wrapper"
          />
        </div>
        <div className="flex flex-col">
          <label>{t("confirmModal.password")}</label>
          <input
            name="password"
            type="password"
            className="input-wrapper"
          />
        </div>
        <div className="mt-2 flex gap-2">
          <button className="w-full">{t("confirmModal.logIn")}</button>
          <button
            type="button"
            onClick={() => setVisibleWithResolve(false, false)}
            className="w-full"
          >
            {t("confirmModal.cancel")}
          </button>
        </div>
        {errorMessage && (
          <div className="mt-2 text-red-700">{errorMessage}</div>
        )}
      </form>
    </div>
  ) : null;

  return {
    ConfirmModal,
    confirmModalControls: {
      visible,
      setVisible: setVisibleWithResolve,
      showModal,
    },
  };
};

export default useConfirmModal;
