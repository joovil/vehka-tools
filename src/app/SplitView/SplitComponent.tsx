"use client";

import { useState } from "react";
import SplitLayout from "./SplitLayout";

export interface SplitPageProps<T> {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
}

export function SplitPage<T>({
  MainContent,
  Sidebar,
  initialData,
}: {
  MainContent: React.ComponentType<SplitPageProps<T>>;
  Sidebar: React.ComponentType<SplitPageProps<T>>;
  initialData: T;
}) {
  const [data, setData] = useState<T>(initialData);

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
