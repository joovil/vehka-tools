"use client";

import { Examiners, FinEng, Signatures } from "@/types";
import { DocumentLanguage } from "../components/document/types";
import { SplitPage } from "../SplitView/SplitComponent";
import ResidentMeetingContent from "./MainContent/ResidentMeetingMainContent";
import ResidentMeetingSidebar from "./Sidebar/ResidentMeetingSidebar";

export interface ResidentMeetingProps {
  data: ResidentMeetingData;
  setData: React.Dispatch<React.SetStateAction<ResidentMeetingData>>;
}

// Follows HOAS's start-of-year resident meeting minutes template.
export interface ResidentMeetingData {
  minutesNumber?: number;
  date?: Date;
  location?: FinEng;
  attendants: string[];
  startTime?: Date;
  meetingChairman?: string;
  meetingSecretary?: string;
  examiners: Examiners;
  committeeYear?: string;
  committeeMembers: string[];
  committeeChairman?: string;
  chairmanConsent?: "yes" | "no";
  committeeSecretary?: string;
  otherRoles: string[];
  representative?: string;
  termLength?: string;
  endTime?: Date;
  signatures: Signatures;
  language?: DocumentLanguage;
}

const ResidentMeetingPage = () => (
  <SplitPage<ResidentMeetingData>
    MainContent={ResidentMeetingContent}
    Sidebar={ResidentMeetingSidebar}
    // Bumped when the form changed shape so old saved data isn't loaded
    storageKey="resident-meeting-minutes-v2"
    initialData={{
      attendants: [],
      examiners: { examiner1: "", examiner2: "" },
      committeeMembers: [],
      otherRoles: [],
      signatures: {
        chairman: "",
        secretary: "",
        examiner1: "",
        examiner2: "",
      },
    }}
  />
);

export default ResidentMeetingPage;
