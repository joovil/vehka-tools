import { DocumentDefinition } from "@/app/components/document/types";
import { AccountingData } from "./page";

export const buildAccountingDocument = (
  data: AccountingData,
  t: (key: string) => string,
): DocumentDefinition => {
  const { committeeName, period, expenses, incomes, notes, signatures } = data;

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + (parseFloat(e.amount) || 0),
    0,
  );
  const totalIncomes = incomes.reduce(
    (sum, e) => sum + (parseFloat(e.amount) || 0),
    0,
  );

  const sections: DocumentDefinition = [
    {
      blocks: [
        { type: "heading", content: t("accounting.pdf.title"), level: 1 },
      ],
    },
    {
      blocks: [
        {
          type: "text",
          content: `${t("accounting.labels.committeeName")}: ${committeeName ?? ""}`,
        },
        {
          type: "text",
          content: `${t("accounting.labels.period")}: ${period ?? ""}`,
        },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("accounting.labels.expenses"),
          level: 2,
        },
        {
          type: "table",
          headers: [
            t("accounting.labels.description"),
            t("accounting.labels.amount"),
          ],
          rows: expenses.map((e) => [e.description, `${e.amount} €`]),
          fieldKey: "expenses",
        },
        {
          type: "text",
          content: `${t("accounting.labels.total")}: ${totalExpenses.toFixed(2)} €`,
        },
      ],
    },
    {
      blocks: [
        {
          type: "heading",
          content: t("accounting.labels.incomes"),
          level: 2,
        },
        {
          type: "table",
          headers: [
            t("accounting.labels.description"),
            t("accounting.labels.amount"),
          ],
          rows: incomes.map((e) => [e.description, `${e.amount} €`]),
          fieldKey: "incomes",
        },
        {
          type: "text",
          content: `${t("accounting.labels.total")}: ${totalIncomes.toFixed(2)} €`,
        },
      ],
    },
  ];

  if (notes) {
    sections.push({
      blocks: [
        { type: "heading", content: t("accounting.labels.notes"), level: 2 },
        { type: "text", content: notes },
      ],
    });
  }

  sections.push({
    blocks: [
      {
        type: "heading",
        content: t("accounting.labels.certification"),
        level: 2,
      },
      {
        type: "signatures",
        entries: Object.entries(signatures).map(([key, value]) => ({
          key,
          label: `${t(`accounting.labels.${key}`)} ${t("accounting.labels.signature")}`,
          value,
        })),
      },
    ],
  });

  return sections;
};
