import { DocumentDefinition } from "@/app/components/document/types";
import { AccountingData, ExpenseCategory } from "./page";

export const buildAccountingDocument = (
  data: AccountingData,
  t: (key: string) => string,
): DocumentDefinition => {
  const {
    name,
    address,
    iban,
    bic,
    committeeRole,
    minutesNumber,
    expenses,
    date,
    signatures,
  } = data;

  const total = expenses.reduce(
    (sum, e) => sum + (parseFloat(e.amount) || 0),
    0,
  );

  // Build expense rows sorted by category order
  const categoryOrder: ExpenseCategory[] = [
    "701",
    "704",
    "707",
    "709",
    "unclear",
  ];
  const sortedExpenses = [...expenses].sort(
    (a, b) =>
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category),
  );

  const expenseRows = sortedExpenses.map((e) => [
    t(`accounting.categories.${e.category}`),
    e.description,
    `${e.amount} €`,
  ]);

  const sections: DocumentDefinition = [
    // Title
    {
      blocks: [
        { type: "heading", content: t("accounting.pdf.title"), level: 1 },
      ],
    },
    // Personal info
    {
      htmlClassName: "accounting-personal-info",
      blocks: [
        {
          type: "text",
          content: `${t("accounting.labels.name")}: ${name ?? ""}`,
        },
        {
          type: "text",
          content: `${t("accounting.labels.address")}: ${address ?? ""}`,
        },
        {
          type: "inline",
          segments: [
            {
              text: `${t("accounting.labels.iban")}: ${iban ?? ""}`,
              bold: false,
            },
            {
              text: `    ${t("accounting.labels.bic")}: ${bic ?? ""}`,
              bold: false,
            },
          ],
        },
        {
          type: "text",
          content: `${t("accounting.labels.hoasCode")}:`,
        },
        {
          type: "text",
          content: `${t("accounting.labels.committeeRole")}: ${committeeRole ?? ""}`,
        },
        {
          type: "text",
          content: `${t("accounting.labels.minutesNumber")}: ${minutesNumber ?? ""}`,
        },
      ],
    },
    // Category descriptions
    {
      htmlClassName: "accounting-categories",
      blocks: [
        { type: "text", content: t("accounting.pdf.categoryDescriptions.701") },
        { type: "text", content: t("accounting.pdf.categoryDescriptions.704") },
        { type: "text", content: t("accounting.pdf.categoryDescriptions.707") },
        { type: "text", content: t("accounting.pdf.categoryDescriptions.709") },
      ],
    },
    // Expense table
    {
      htmlClassName: "accounting-table",
      blocks: [
        {
          type: "table",
          headers: [
            t("accounting.pdf.tableHeaderCategory"),
            t("accounting.pdf.tableHeaderDescription"),
            t("accounting.pdf.tableHeaderAmount"),
          ],
          rows: [
            ...expenseRows,
            ["", t("accounting.labels.totalEur"), `${total.toFixed(2)} €`],
          ],
          fieldKey: "expenses",
        },
      ],
    },
    // Footer notes
    {
      htmlClassName: "accounting-footer",
      blocks: [
        { type: "text", content: t("accounting.pdf.footerNote1") },
        { type: "text", content: t("accounting.pdf.footerNote2") },
      ],
    },
    // Signatures
    {
      htmlClassName: "accounting-signatures",
      blocks: [
        {
          type: "signatures",
          entries: [
            {
              key: "recipient",
              label: t("accounting.pdf.recipientSignature"),
              value: signatures.recipient,
            },
            {
              key: "committeeMember",
              label: t("accounting.pdf.memberSignature"),
              value: signatures.committeeMember,
            },
          ],
        },
        {
          type: "text",
          content: `${t("accounting.labels.date")}: ${date ?? ""}`,
        },
      ],
    },
  ];

  return sections;
};
