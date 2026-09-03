"use client";

import { useEffect, useRef, useState } from "react";
import SplitLayout from "./SplitLayout";

export interface SplitPageProps<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

const STORAGE_PREFIX = "vehka-";

const dateReviver = (_key: string, value: unknown) => {
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)
  ) {
    const date = new Date(value);
    if (!isNaN(date.getTime())) return date;
  }
  return value;
};

export function SplitPage<T>({
  MainContent,
  Sidebar,
  initialData,
  storageKey,
}: {
  MainContent: React.ComponentType<SplitPageProps<T>>;
  Sidebar: React.ComponentType<SplitPageProps<T>>;
  initialData: T;
  storageKey?: string;
}) {
  const [data, setData] = useState<T>(initialData);
  const loaded = useRef(false);

  // Load saved state from localStorage after hydration
  useEffect(() => {
    if (!storageKey) {
      loaded.current = true;
      return;
    }
    try {
      const stored = localStorage.getItem(STORAGE_PREFIX + storageKey);
      if (stored) {
        setData(JSON.parse(stored, dateReviver));
      }
    } catch {
      // ignore corrupted data
    }
    loaded.current = true;
  }, [storageKey]);

  // Persist state changes to localStorage (skip until initial load is done)
  useEffect(() => {
    if (!loaded.current || !storageKey) return;
    try {
      localStorage.setItem(STORAGE_PREFIX + storageKey, JSON.stringify(data));
    } catch {
      // ignore quota errors
    }
  }, [data, storageKey]);

  return (
    <SplitLayout
      sidebar={
        <Sidebar
          data={data}
          setData={setData}
        />
      }
    >
      <MainContent
        data={data}
        setData={setData}
      />
    </SplitLayout>
  );
}
