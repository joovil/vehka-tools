import { DocumentDefinition } from "@/app/components/document/types";
import { formatDate } from "@/app/utils/formatDate";
import { MeetingInviteData } from "./page";

/**
 * Build the meeting-invite DocumentDefinition from form data and a
 * translation function.  Both the HTML preview and the PDF renderer
 * consume this definition.
 */
export const buildInviteDocument = (
  data: MeetingInviteData,
  t: (key: string) => string,
): DocumentDefinition => {
  const { date, location, agendaItems, moreInfo } = data;

  const sections: DocumentDefinition = [
    // Banner image
    {
      blocks: [
        { type: "image", src: "/banner.svg", alt: "Meeting invite banner" },
      ],
    },
    // Date & location info rows
    {
      htmlClassName: "mx-auto w-fit px-10",
      tag: "info",
      blocks: [
        {
          type: "inline",
          segments: [
            { text: t("meetingInvite.labels.date"), bold: true },
            { text: ` ${date ? formatDate(date) : ""}` },
          ],
        },
        {
          type: "inline",
          segments: [
            { text: t("meetingInvite.labels.location"), bold: true },
            {
              text: ` ${location ? `${location.fin} / ${location.eng}` : ""}`,
            },
          ],
        },
      ],
    },
    // Agenda
    {
      htmlClassName: "px-10",
      blocks: [
        {
          type: "bilingual-list",
          items: agendaItems,
          fieldKey: "agendaItems",
          finHeader: t("meetingInvite.agendaFin"),
          engHeader: t("meetingInvite.agendaEng"),
        },
      ],
    },
  ];

  // More info (optional)
  if (moreInfo) {
    sections.push({
      htmlClassName: "px-10",
      blocks: [
        {
          type: "bilingual-columns",
          columns: [
            {
              header: t("meetingInvite.labels.furtherInformation"),
              content: moreInfo.fin,
            },
            {
              header: t("meetingInvite.labels.moreInfo"),
              content: moreInfo.eng,
            },
          ],
        },
      ],
    });
  }

  // Footer
  sections.push({
    htmlClassName: "px-10",
    blocks: [
      {
        type: "bilingual-columns",
        columns: [
          {
            header: t("meetingInvite.labels.welcome"),
            content: t("meetingInvite.labels.yourCommittee"),
          },
          { header: "Welcome", content: "-Your tenant committee" },
        ],
      },
    ],
  });

  return sections;
};
