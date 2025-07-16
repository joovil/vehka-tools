"use client";

import { SplitPage } from "../SplitView/SplitComponent";
import MinutesContent from "./MainContent";
import MinutesSidebar from "./Sidebar";

export interface MinutesProps {
  data: MinutesData;
  setData: React.Dispatch<MinutesData>;
}

export interface MinutesData {
  test?: string;
}

const MinutesPage = () => {
  return (
    <SplitPage<MinutesData>
      MainContent={MinutesContent}
      Sidebar={MinutesSidebar}
      initialData={{}}
    />
  );
};

export default MinutesPage;
