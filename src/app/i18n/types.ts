export type Locale = "en" | "fi";

export interface Dictionary {
  finnish: string;
  english: string;
  addItem: string;
  toggleOpen: string;
  toggleClose: string;
  openMenu: string;
  closeMenu: string;
  minutes: {
    errors: {
      chairman: string;
      secretary: string;
      examiner1: string;
      examiner2: string;
      location: string;
      timeOfMeeting: string;
      attendants: string;
      examiners: string;
    };
    labels: {
      minutesNumber: string;
      attendants: string;
      items: string;
      otherItems: string;
      location: string;
      startTime: string;
      endTime: string;
      signature: string;
      signatures: string;
      chairman: string;
      secretary: string;
      examiners: string;
      examiner1: string;
      examiner2: string;
      newMembers: string;
      acceptAgenda: string;
      nextMeeting: string;
      timeOfMeeting: string;
    };
    placeholders: {
      minutesNumber: string;
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
      timeOfMeeting: string;
      chairmanSignature: string;
      secretarySignature: string;
      examinerSignature: string;
    };
    buttons: {
      startTime: string;
      endTime: string;
      nextMeeting: string;
    };
  };
  meetingInvite: {
    headers: {
      date: string;
      location: string;
    };
    labels: {
      date: string;
      location: string;
      agenda: string;
      furtherInformation: string;
      welcome: string;
      yourCommittee: string;
    };
    placeholders: {
      date: string;
      location: string;
      agenda: string;
      furtherInformation: string;
    };
  };
}
