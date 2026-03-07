import { DocumentDefinition } from "@/app/components/document/types";
import { formatDate } from "@/app/utils/formatDate";
import { ContactFormData } from "./page";

export const buildContactFormDocument = (
  data: ContactFormData,
  t: (key: string) => string,
): DocumentDefinition => {
  const { meetingDate, location, participants } = data;

  return [
    {
      blocks: [
        { type: "heading", content: t("contactForm.pdf.title"), level: 1 },
      ],
    },
    {
      blocks: [
        {
          type: "text",
          content: `${t("contactForm.labels.meetingDate")}: ${formatDate(meetingDate)}`,
        },
        {
          type: "text",
          content: `${t("contactForm.labels.location")}: ${location ?? ""}`,
        },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("contactForm.labels.participants"),
          level: 2,
        },
        {
          type: "table",
          headers: [
            t("contactForm.labels.name"),
            t("contactForm.labels.apartment"),
            t("contactForm.labels.phone"),
            t("contactForm.labels.email"),
          ],
          rows: participants.map((p) => [
            p.name,
            p.apartment,
            p.phone,
            p.email,
          ]),
          fieldKey: "participants",
        },
      ],
    },
  ];
};
