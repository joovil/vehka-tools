import { DocumentDefinition } from "@/app/components/document/types";
import { formatDate } from "@/app/utils/formatDate";
import { ResidentMeetingData } from "./page";

export const buildResidentMeetingDocument = (
  data: ResidentMeetingData,
  t: (key: string) => string,
): DocumentDefinition => {
  const {
    meetingNumber,
    date,
    location,
    attendantCount,
    agendaItems,
    decisions,
    nextMeeting,
    signatures,
  } = data;

  const lang = data.language ?? "bilingual";
  const singleLang = lang !== "bilingual" ? lang : undefined;
  const loc = location ?? { fin: "_", eng: "_" };
  const locationText =
    lang === "fin"
      ? loc.fin
      : lang === "eng"
        ? loc.eng
        : `${loc.fin} / ${loc.eng}`;

  const sections: DocumentDefinition = [
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.pdf.title"),
          level: 1,
        },
        {
          type: "text",
          content: `${t("residentMeeting.labels.meetingNumber")}: ${meetingNumber ?? ""}`,
        },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.labels.dateAndLocation"),
          level: 2,
        },
        { type: "text", content: formatDate(date) },
        { type: "text", content: locationText },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.labels.attendantCount"),
          level: 2,
        },
        { type: "text", content: `${attendantCount ?? ""}` },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.labels.agendaItems"),
          level: 2,
        },
        {
          type: "bilingual-list",
          items: agendaItems,
          fieldKey: "agendaItems",
          language: singleLang,
        },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.labels.decisions"),
          level: 2,
        },
        {
          type: "bilingual-list",
          items: decisions,
          fieldKey: "decisions",
          language: singleLang,
        },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.labels.nextMeeting"),
          level: 2,
        },
        { type: "text", content: formatDate(nextMeeting) },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("residentMeeting.labels.certification"),
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

  return sections;
};
