"use client";

import { apiFetch } from "@/app/utils/apiFetch";
import { AuthStatus, checkAuthStatus } from "@/app/utils/checkAuthStatus";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  committeeName: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [committeeName, setCommitteeName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const applyStatus = useCallback((status: AuthStatus) => {
    setIsLoggedIn(status.isLoggedIn);
    setCommitteeName(status.committeeName);
    setLoading(false);
  }, []);

  const refresh = useCallback(async () => {
    applyStatus(await checkAuthStatus());
  }, [applyStatus]);

  const logout = useCallback(async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    await refresh();
  }, [refresh]);

  useEffect(() => {
    let cancelled = false;

    checkAuthStatus().then((status) => {
      if (!cancelled) applyStatus(status);
    });

    return () => {
      cancelled = true;
    };
  }, [applyStatus]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, committeeName, loading, refresh, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
