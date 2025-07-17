"use client";

import { FinEng, Signatures } from "@/types";
import { SplitPage } from "../SplitView/SplitComponent";
import MinutesContent from "./MainContent";
import MinutesSidebar from "./Sidebar";

export interface MinutesProps {
  data: MinutesData;
  setData: React.Dispatch<MinutesData>;
}

export interface MinutesData {
  minuteNumber?: number;
  attendants: string[];
  meetingItems: string[];
  otherItems: string[];
  location?: FinEng;
  startTime?: Date;
  endTime?: Date;
  signatures: Signatures;
}

const MinutesPage = () => {
  return (
    <SplitPage<MinutesData>
      MainContent={MinutesContent}
      Sidebar={MinutesSidebar}
      initialData={{
        attendants: [],
        meetingItems: [],
        otherItems: [],
        signatures: {
          chairman: "",
          secretary: "",
          examiner1: "",
          examiner2: "",
        },
      }}
    />
  );
};

export default MinutesPage;
