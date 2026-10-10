import { DocumentDefinition } from "@/app/components/document/types";
import { formatDate } from "@/app/utils/formatDate";
import { ContactFormData } from "./page";

export const buildContactFormDocument = (
  data: ContactFormData,
  t: (key: string) => string,
): DocumentDefinition => {
  const { property, meetingDate, location, chairman, participants } = data;

  const dateTimeAndPlace = [formatDate(meetingDate), location]
    .filter(Boolean)
    .join(", ");

  return [
    {
      blocks: [
        { type: "heading", content: t("contactForm.pdf.title"), level: 1 },
      ],
    },
    {
      blocks: [
        {
          type: "inline",
          segments: [
            { text: `${t("contactForm.pdf.property")} ` },
            { text: property ?? "", underline: true },
          ],
        },
        {
          type: "inline",
          segments: [
            { text: `${t("contactForm.pdf.dateTimeAndPlace")} ` },
            { text: dateTimeAndPlace, underline: true },
          ],
        },
        {
          type: "inline",
          segments: [
            { text: `${t("contactForm.pdf.chairman")} ` },
            { text: chairman ?? "", underline: true },
          ],
        },
        { type: "text", content: t("contactForm.pdf.consent") },
      ],
    },
    {
      blocks: [
        { type: "text", content: t("contactForm.pdf.handwriting") },
        {
          type: "table",
          headers: [
            t("contactForm.pdf.name"),
            t("contactForm.pdf.address"),
            t("contactForm.pdf.email"),
            t("contactForm.pdf.phone"),
            t("contactForm.pdf.task"),
            t("contactForm.pdf.signature"),
          ],
          // The signature is the participant's name in a handwriting font
          rows: participants.map((p) => [
            p.name,
            p.address,
            p.email,
            p.phone,
            p.task,
            p.name,
          ]),
          signatureColumn: 5,
          fieldKey: "participants",
          gappedUnderlines: true,
        },
      ],
    },
  ];
};
