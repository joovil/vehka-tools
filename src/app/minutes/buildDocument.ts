import { DocumentDefinition } from "@/app/components/document/types";
import { formatDate } from "@/app/utils/formatDate";
import { MinutesData } from "./page";

/**
 * Build the minutes DocumentDefinition from form data and a translation
 * function.  Both the HTML preview and the PDF renderer consume this
 * definition, so the content is defined in exactly one place.
 */
export const buildMinutesDocument = (
  data: MinutesData,
  t: (key: string) => string,
): DocumentDefinition => {
  const {
    location,
    attendants,
    signatures,
    examiners,
    newMembers,
    nextMeeting,
    minutesNumber,
    startTime,
    endTime,
    timeOfMeeting,
  } = data;

  const loc = location ?? { fin: "_", eng: "_" };

  return [
    // Header
    {
      blocks: [
        { type: "text", content: t("minutes.pdf.organization") },
        {
          type: "text",
          content: `${t("minutes.pdf.minutesLabel")} ${minutesNumber ?? "_"}/${new Date().getFullYear()}`,
        },
      ],
    },
    // Title
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.meetingTitle"), level: 1 },
      ],
    },
    // Date/time and location
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.dateAndTime"), level: 2 },
        { type: "text", content: formatDate(timeOfMeeting) },
        { type: "text", content: `${loc.fin} / ${loc.eng}` },
      ],
    },
    // Present
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.present"), level: 2 },
        { type: "list", items: attendants, fieldKey: "attendants" },
      ],
    },
    // 1 – Opening
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.section1"), level: 2 },
        {
          type: "text",
          content: `${t("minutes.pdf.chairmanOpenedAt")} ${formatDate(startTime)}`,
        },
        { type: "text", content: t("minutes.pdf.meetingDeclaredLegal") },
      ],
    },
    // 2 – Examiners
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.section2"), level: 2 },
        {
          type: "inline",
          segments: [
            { text: `${t("minutes.pdf.elected")} ` },
            { text: examiners.examiner1, underline: true },
            { text: " / " },
            { text: examiners.examiner2, underline: true },
          ],
        },
      ],
    },
    // 3 – Agenda
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.section3"), level: 2 },
        { type: "text", content: t("minutes.pdf.agendaApproved") },
      ],
    },
    // 4 – Meeting items
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.section4"), level: 2 },
        {
          type: "bilingual-list",
          items: data.meetingItems,
          fieldKey: "meetingItems",
        },
      ],
    },
    // 5 – Other items
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.section5"), level: 2 },
        {
          type: "bilingual-list",
          items: data.otherItems,
          fieldKey: "otherItems",
        },
      ],
    },
    // New members
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.newMembers"), level: 2 },
        { type: "list", items: newMembers ?? [], fieldKey: "newMembers" },
      ],
    },
    // 6 – Next meeting
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.section6"), level: 2 },
        {
          type: "text",
          content: `${t("minutes.pdf.nextMeetingHeldAt")} ${formatDate(nextMeeting)}`,
        },
      ],
    },
    // 7 – Closing
    {
      blocks: [
        { type: "heading", content: t("minutes.pdf.section7"), level: 2 },
        {
          type: "text",
          content: `${t("minutes.pdf.chairmanClosedAt")} ${endTime ? formatDate(endTime).split(" ")[1] : ""}`,
        },
      ],
    },
    // Signatures
    {
      blocks: [
        {
          type: "heading",
          content: t("minutes.pdf.certification"),
          level: 2,
        },
        {
          type: "signatures",
          entries: Object.entries(signatures).map(([key, value]) => ({
            key,
            label: `${t(`minutes.labels.${key}`)} ${t("minutes.labels.signature")}`,
            value,
          })),
        },
      ],
    },
  ];
};
