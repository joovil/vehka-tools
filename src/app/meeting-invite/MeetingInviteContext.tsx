"use client";

import React, { createContext, useContext, useState } from "react";

interface MeetingInviteData {
  title?: string;
  date?: Date;
  location?: string;
  agendaItems?: string[];
  attendees?: string[];
  // Add more fields as needed
}

type MeetingInviteContextType = {
  inviteData: MeetingInviteData;
  setInviteData: (data: MeetingInviteData) => void;
};

const MeetingInviteContext = createContext<
  MeetingInviteContextType | undefined
>(undefined);

export function MeetingInviteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inviteData, setInviteData] = useState<MeetingInviteData>({});

  return (
    <MeetingInviteContext.Provider value={{ inviteData, setInviteData }}>
      {children}
    </MeetingInviteContext.Provider>
  );
}

export function useMeetingInvite() {
  const context = useContext(MeetingInviteContext);
  if (context === undefined) {
    throw new Error(
      "useMeetingInvite must be used within a MeetingInviteProvider",
    );
  }
  return context;
}
