import { DocumentDefinition } from "@/app/components/document/types";
import { formatDate } from "@/app/utils/formatDate";
import { ResidentMeetingData } from "./page";

const formatTime = (date: Date | undefined) =>
  date ? formatDate(date).split(" ")[1] : "";

export const buildResidentMeetingDocument = (
  data: ResidentMeetingData,
  t: (key: string) => string,
): DocumentDefinition => {
  const {
    minutesNumber,
    date,
    location,
    attendants,
    startTime,
    meetingChairman,
    meetingSecretary,
    examiners,
    committeeYear,
    committeeMembers,
    committeeChairman,
    chairmanConsent,
    committeeSecretary,
    otherRoles,
    representative,
    termLength,
    endTime,
    signatures,
  } = data;

  const lang = data.language ?? "bilingual";
  const loc = location ?? { fin: "_", eng: "_" };
  const locationText =
    lang === "fin"
      ? loc.fin
      : lang === "eng"
        ? loc.eng
        : `${loc.fin} / ${loc.eng}`;

  const consentText = chairmanConsent
    ? t(`residentMeeting.pdf.${chairmanConsent}`)
    : `${t("residentMeeting.pdf.yes")} / ${t("residentMeeting.pdf.no")}`;

  const subheading = (text: string) => ({
    type: "inline" as const,
    segments: [{ text, bold: true }],
  });

  return [
    // Header
    {
      blocks: [
        { type: "text", content: t("residentMeeting.pdf.organization") },
        {
          type: "text",
          content: `${t("residentMeeting.pdf.minutesLabel")} ${minutesNumber ?? "_"}/${(date ?? new Date()).getFullYear()}`,
        },
      ],
    },
    // Title
    {
      blocks: [
        { type: "heading", content: t("residentMeeting.pdf.title"), level: 1 },
      ],
    },
    // Date/time and location
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.dateAndTime"),
          level: 2,
        },
        { type: "text", content: formatDate(date) },
        {
          type: "heading",
          content: t("residentMeeting.pdf.location"),
          level: 2,
        },
        { type: "text", content: locationText },
      ],
    },
    // Present
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.present"),
          level: 2,
        },
        { type: "list", items: attendants, fieldKey: "attendants" },
      ],
    },
    // 1 – Opening
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.section1"),
          level: 2,
        },
        {
          type: "text",
          content: `${t("residentMeeting.pdf.chairmanOpenedAt")} ${formatTime(startTime)}`,
        },
        {
          type: "text",
          content: t("residentMeeting.pdf.meetingDeclaredLegal"),
        },
      ],
    },
    // 2 – Meeting chairman and secretary
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.section2"),
          level: 2,
        },
        {
          type: "inline",
          segments: [
            {
              text: `${t("residentMeeting.pdf.chairmanAndSecretaryElected")} `,
            },
            { text: meetingChairman ?? "", underline: true },
            { text: " / " },
            { text: meetingSecretary ?? "", underline: true },
          ],
        },
      ],
    },
    // 3 – Vote counters / minutes examiners
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.section3"),
          level: 2,
        },
        {
          type: "inline",
          segments: [
            { text: `${t("residentMeeting.pdf.elected")} ` },
            { text: examiners.examiner1, underline: true },
            { text: " / " },
            { text: examiners.examiner2, underline: true },
          ],
        },
      ],
    },
    // 4 – Agenda
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.section4"),
          level: 2,
        },
        { type: "text", content: t("residentMeeting.pdf.agendaApproved") },
      ],
    },
    // 5 – Committee election
    {
      blocks: [
        {
          type: "heading",
          content: `${t("residentMeeting.pdf.section5Prefix")} ${committeeYear || "____"} ${t("residentMeeting.pdf.section5Suffix")}`,
          level: 2,
        },
        { type: "text", content: t("residentMeeting.pdf.electedMembers") },
        {
          type: "list",
          items: committeeMembers,
          fieldKey: "committeeMembers",
        },
      ],
    },
    // 6 – Committee organization
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.section6"),
          level: 2,
        },
        subheading(t("residentMeeting.pdf.section6_1")),
        {
          type: "inline",
          segments: [
            { text: `${t("residentMeeting.pdf.committeeChairmanElected")} ` },
            { text: committeeChairman ?? "", underline: true },
          ],
        },
        {
          type: "inline",
          segments: [
            { text: `${t("residentMeeting.pdf.chairmanConsent")} ` },
            { text: consentText, bold: true },
          ],
        },
        subheading(t("residentMeeting.pdf.section6_2")),
        {
          type: "inline",
          segments: [
            { text: `${t("residentMeeting.pdf.committeeSecretaryElected")} ` },
            { text: committeeSecretary ?? "", underline: true },
          ],
        },
        subheading(t("residentMeeting.pdf.section6_3")),
        { type: "list", items: otherRoles, fieldKey: "otherRoles" },
        subheading(t("residentMeeting.pdf.section6_4")),
        {
          type: "inline",
          segments: [
            { text: `${t("residentMeeting.pdf.representativeElected")} ` },
            { text: representative ?? "", underline: true },
          ],
        },
      ],
    },
    // 7 – Other matters
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.section7"),
          level: 2,
        },
        { type: "text", content: t("residentMeeting.pdf.termInfo") },
        {
          type: "inline",
          segments: [
            { text: `${t("residentMeeting.pdf.termLength")} ` },
            { text: termLength ?? "", underline: true },
          ],
        },
      ],
    },
    // 8 – Closing
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.section8"),
          level: 2,
        },
        {
          type: "text",
          content: `${t("residentMeeting.pdf.chairmanClosedAt")} ${formatTime(endTime)}`,
        },
      ],
    },
    // Signatures
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.certification"),
          level: 2,
        },
        {
          type: "signatures",
          entries: Object.entries(signatures).map(([key, value]) => ({
            key,
            label: `${t(`residentMeeting.labels.${key}`)} ${t("residentMeeting.labels.signature")}`,
            value,
          })),
        },
      ],
    },
  ];
};
