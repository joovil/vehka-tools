"use client";

import { FinEng } from "@/types";
import { DocumentLanguage } from "../components/document/types";
import { SplitPage } from "../SplitView/SplitComponent";
import ResidentMeetingContent from "./MainContent/ResidentMeetingMainContent";
import ResidentMeetingSidebar from "./Sidebar/ResidentMeetingSidebar";

export interface ResidentMeetingProps {
  data: ResidentMeetingData;
  setData: React.Dispatch<React.SetStateAction<ResidentMeetingData>>;
}

export interface ResidentMeetingData {
  meetingNumber?: number;
  date?: Date;
  location?: FinEng;
  attendantCount?: number;
  agendaItems: FinEng[];
  decisions: FinEng[];
  nextMeeting?: Date;
  signatures: { chairman: string; secretary: string };
  language?: DocumentLanguage;
}

const ResidentMeetingPage = () => (
  <SplitPage<ResidentMeetingData>
    MainContent={ResidentMeetingContent}
    Sidebar={ResidentMeetingSidebar}
    storageKey="resident-meeting-minutes"
    initialData={{
      agendaItems: [],
      decisions: [],
      signatures: { chairman: "", secretary: "" },
    }}
  />
);

export default ResidentMeetingPage;
