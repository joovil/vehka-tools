"use client";

import { Examiners, FinEng, SavedDocument, Signatures } from "@/types";
import { SplitPage } from "../SplitView/SplitComponent";
import { DocumentLanguage } from "../components/document/types";
import MinutesContent from "./MainContent/MinutesMainContent";
import MinutesSidebar from "./Sidebar/MinutesSidebar";

export interface MinutesProps {
  data: MinutesData;
  setData: React.Dispatch<React.SetStateAction<MinutesData>>;
}

export interface MinutesData {
  minutesNumber?: number;
  suggestedNumber?: number;
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
  timeOfMeeting?: Date;
  language?: DocumentLanguage;
  saved?: SavedDocument;
}

const MinutesPage = () => {
  return (
    <SplitPage<MinutesData>
      MainContent={MinutesContent}
      Sidebar={MinutesSidebar}
      storageKey="minutes"
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
