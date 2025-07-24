export type Locale = "en" | "fi";

export interface Dictionary {
  finnish: string;
  english: string;
  addItem: string;
  toggleOpen: string;
  toggleClose: string;
  minutes: {
    labels: {
      attendants: string;
      items: string;
      otherItems: string;
      location: string;
      startTime: string;
      endTime: string;
      signatures: string;
      chairman: string;
      secretary: string;
      examiners: string;
      examiner1: string;
      examiner2: string;
      newMembers: string;
      acceptAgenda: string;
      nextMeeting: string;
    };
    placeholders: {
      attendants: string;
      items: string;
      otherItems: string;
      location: string;
      startTime: string;
      endTime: string;
      signatures: string;
      examiner1: string;
      examiner2: string;
      newMembers: string;
      nextMeeting: string;
    };
    buttons: {
      startMeeting: string;
      endMeeting: string;
      nextMeeting: string;
    };
  };
}
