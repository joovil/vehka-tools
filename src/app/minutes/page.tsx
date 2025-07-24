"use client";

import { Examiners, FinEng, Signatures } from "@/types";
import { SplitPage } from "../SplitView/SplitComponent";
import MinutesContent from "./MainContent";
import MinutesSidebar from "./Sidebar";

export interface MinutesProps {
  data: MinutesData;
  setData: React.Dispatch<React.SetStateAction<MinutesData>>;
}

export interface MinutesData {
  minuteNumber?: number;
  location?: FinEng;
  attendants: string[];
  meetingItems: FinEng[];
  otherItems: FinEng[];
  startTime?: Date;
  endTime?: Date;
  signatures: Signatures;
  examiners: Examiners;
  newMembers?: string[];
  nextMeeting?: Date;
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
        examiners: {
          examiner1: "",
          examiner2: "",
        },
      }}
    />
  );
};

export default MinutesPage;
