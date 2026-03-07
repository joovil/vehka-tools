import { DocumentDefinition } from "@/app/components/document/types";
import { formatDate } from "@/app/utils/formatDate";
import { EventParticipantsData } from "./page";

export const buildEventParticipantsDocument = (
  data: EventParticipantsData,
  t: (key: string) => string,
): DocumentDefinition => {
  const { eventName, date, location, participants } = data;

  const lang = data.language ?? "bilingual";
  const loc = location ?? { fin: "", eng: "" };
  const locationText =
    lang === "fin"
      ? loc.fin
      : lang === "eng"
        ? loc.eng
        : `${loc.fin} / ${loc.eng}`;
  const eventText = eventName
    ? lang === "fin"
      ? eventName.fin
      : lang === "eng"
        ? eventName.eng
        : `${eventName.fin} / ${eventName.eng}`
    : "";

  return [
    {
      blocks: [
        {
          type: "heading",
          content: t("eventParticipants.pdf.title"),
          level: 1,
        },
      ],
    },
    {
      blocks: [
        {
          type: "text",
          content: `${t("eventParticipants.labels.eventName")}: ${eventText}`,
        },
        {
          type: "text",
          content: `${t("eventParticipants.labels.date")}: ${formatDate(date)}`,
        },
        {
          type: "text",
          content: `${t("eventParticipants.labels.location")}: ${locationText}`,
        },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("eventParticipants.labels.participants"),
          level: 2,
        },
        {
          type: "table",
          headers: [
            t("eventParticipants.labels.name"),
            t("eventParticipants.labels.apartment"),
          ],
          rows: participants.map((p) => [p.name, p.apartment]),
          fieldKey: "participants",
        },
      ],
    },
  ];
};
