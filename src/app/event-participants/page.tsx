"use client";

import { FinEng } from "@/types";
import { DocumentLanguage } from "../components/document/types";
import { SplitPage } from "../SplitView/SplitComponent";
import EventParticipantsContent from "./MainContent/EventParticipantsMainContent";
import EventParticipantsSidebar from "./Sidebar/EventParticipantsSidebar";

export interface EventParticipantsProps {
  data: EventParticipantsData;
  setData: React.Dispatch<React.SetStateAction<EventParticipantsData>>;
}

export interface EventParticipantsData {
  eventName?: FinEng;
  date?: Date;
  location?: FinEng;
  participants: Array<{ name: string; apartment: string }>;
  language?: DocumentLanguage;
}

const EventParticipantsPage = () => (
  <SplitPage<EventParticipantsData>
    MainContent={EventParticipantsContent}
    Sidebar={EventParticipantsSidebar}
    storageKey="event-participants"
    initialData={{ participants: [] }}
  />
);

export default EventParticipantsPage;
