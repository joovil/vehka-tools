"use client";

import { FinEng } from "@/types";
import { SplitPage } from "../SplitView/SplitComponent";
import MeetingInviteContent from "./MainContent/MeetingInviteMainContent";
import MeetingInviteSidebar from "./Sidebar/MeetingInviteSidebar";

export interface MeetingInviteProps {
  data: MeetingInviteData;
  setData: React.Dispatch<React.SetStateAction<MeetingInviteData>>;
}

export interface MeetingInviteData {
  date?: Date;
  location?: FinEng;
  agendaItems: FinEng[];
  moreInfo?: FinEng;
}

const MeetingInvitePage = () => {
  return (
    <SplitPage<MeetingInviteData>
      MainContent={MeetingInviteContent}
      Sidebar={MeetingInviteSidebar}
      initialData={{
        agendaItems: [],
      }}
    />
  );
};

export default MeetingInvitePage;
