"use client";

import { DateTime, FinEng } from "@/types";
import { SplitPage } from "../SplitView/SplitComponent";
import MeetingInviteContent from "./MainContent/MeetingInviteContent";
import MeetingInviteSidebar from "./Sidebar/MeetingInviteSidebar";

interface MeetingInviteData {
  date?: DateTime;
  location?: FinEng;
  agendaItems?: FinEng[];
  moreInfo?: FinEng;
  attendees?: string[];
}

const MeetingInvitePage = () => {
  return (
    <SplitPage<MeetingInviteData>
      MainContent={MeetingInviteContent}
      Sidebar={MeetingInviteSidebar}
      initialData={{}}
    />
  );
};

export default MeetingInvitePage;
