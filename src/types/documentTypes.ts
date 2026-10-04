// Every kind of PDF a committee can save. The type is the folder the file is
// stored in (`<committee>/<type>/<filename>`), and labelKey is the translation
// used as its heading on the documents page.
export const DOCUMENT_TYPES = [
  { type: "minutes", labelKey: "nav.minutes" },
  { type: "meeting-invite", labelKey: "nav.meetingInvite" },
  { type: "accounting", labelKey: "nav.accountingForm" },
  { type: "key-form", labelKey: "nav.keyForm" },
  { type: "compensation-prices", labelKey: "nav.compensationPriceList" },
  { type: "event-participants", labelKey: "nav.eventParticipantList" },
  { type: "resident-meeting-minutes", labelKey: "nav.residentMeetingMinutes" },
  {
    type: "resident-meeting-contact",
    labelKey: "nav.residentMeetingContactForm",
  },
] as const;

export type DocumentType = (typeof DOCUMENT_TYPES)[number]["type"];

export const isDocumentType = (value: unknown): value is DocumentType =>
  DOCUMENT_TYPES.some((d) => d.type === value);
