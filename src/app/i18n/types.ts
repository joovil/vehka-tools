export type Locale = "en" | "fi";

export interface Dictionary {
  minutes: {
    labels: {
      attendants: string;
      items: string;
      otherItems: string;
      location: string;
      startTime: string;
      endTime: string;
      signatures: string;
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
