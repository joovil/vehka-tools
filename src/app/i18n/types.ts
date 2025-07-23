export type Locale = "en" | "fi";

export interface Dictionary {
  finnish: string;
  english: string;
  addItem: string;
  minutes: {
    labels: {
      attendants: string;
      items: string;
      otherItems: string;
      location: string;
      startTime: string;
      endTime: string;
      signatures: {
        chairman: string;
        secretary: string;
        examiner1: string;
        examiner2: string;
      };
    };
    placeholders: {
      attendants: string;
      items: string;
      otherItems: string;
      location: string;
      startTime: string;
      endTime: string;
      signatures: string;
    };
    buttons: {
      startMeeting: string;
      endMeeting: string;
    };
  };
}
