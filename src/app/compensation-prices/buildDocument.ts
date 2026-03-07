import { DocumentDefinition } from "@/app/components/document/types";
import { CompensationData } from "./page";

export const buildCompensationDocument = (
  data: CompensationData,
  t: (key: string) => string,
): DocumentDefinition => {
  const { committeeName, items } = data;

  return [
    {
      blocks: [
        {
          type: "heading",
          content: t("compensationPrices.pdf.title"),
          level: 1,
        },
      ],
    },
    {
      blocks: [
        {
          type: "text",
          content: `${t("compensationPrices.labels.committeeName")}: ${committeeName ?? ""}`,
        },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("compensationPrices.labels.items"),
          level: 2,
        },
        {
          type: "table",
          headers: [
            t("compensationPrices.labels.item"),
            t("compensationPrices.labels.price"),
            t("compensationPrices.labels.condition"),
          ],
          rows: items.map((i) => [i.item, i.price, i.condition]),
          fieldKey: "items",
        },
      ],
    },
  ];
};
