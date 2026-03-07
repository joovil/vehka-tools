import { DocumentDefinition } from "@/app/components/document/types";
import { KeyFormData } from "./page";

export const buildKeyFormDocument = (
  data: KeyFormData,
  t: (key: string) => string,
): DocumentDefinition => {
  const { committeeName, keyLoans } = data;

  return [
    {
      blocks: [
        {
          type: "heading",
          content: t("keyForm.pdf.title"),
          level: 1,
        },
      ],
    },
    {
      blocks: [
        {
          type: "text",
          content: `${t("keyForm.labels.committeeName")}: ${committeeName ?? ""}`,
        },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("keyForm.labels.keyLoans"),
          level: 2,
        },
        {
          type: "table",
          headers: [
            t("keyForm.labels.borrower"),
            t("keyForm.labels.apartment"),
            t("keyForm.labels.keyType"),
            t("keyForm.labels.dateBorrowed"),
            t("keyForm.labels.dateReturned"),
          ],
          rows: keyLoans.map((k) => [
            k.borrower,
            k.apartment,
            k.keyType,
            k.dateBorrowed,
            k.dateReturned,
          ]),
          fieldKey: "keyLoans",
        },
      ],
    },
  ];
};
