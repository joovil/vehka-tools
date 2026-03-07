"use client";

import SimplePdf from "@/app/components/document/SimplePdf";
import Dropdown from "@/app/components/Dropdown";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { buildAccountingDocument } from "../buildDocument";
import { AccountingExpense, AccountingProps, ExpenseCategory } from "../page";
import SignaturesInput from "./SignaturesInput";

const categories: ExpenseCategory[] = ["701", "704", "707", "709", "unclear"];

const AccountingSidebar = ({ data, setData }: AccountingProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const [newExpense, setNewExpense] = useState<AccountingExpense>({
    category: "701",
    description: "",
    amount: "",
  });

  const addExpense = () => {
    if (!newExpense.description.trim()) return;
    setData((prev) => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));
    setNewExpense({ category: "701", description: "", amount: "" });
  };

  const handlePdfDownloadClick = async () => {
    const filename = `${t("accounting.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;
    const document = buildAccountingDocument(data, t);
    await handlePdfDownload({
      filename,
      pdfElement: <SimplePdf document={document} />,
      confirmModalControls,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {ConfirmModal}

      <Dropdown header={t("accounting.labels.personalInfo")}>
        <SidebarInput
          fieldKey="name"
          setData={setData}
          placeholder={t("accounting.placeholders.name")}
          label={t("accounting.labels.name")}
        />
        <SidebarInput
          fieldKey="address"
          setData={setData}
          placeholder={t("accounting.placeholders.address")}
          label={t("accounting.labels.address")}
        />
        <SidebarInput
          fieldKey="iban"
          setData={setData}
          placeholder={t("accounting.placeholders.iban")}
          label={t("accounting.labels.iban")}
        />
        <SidebarInput
          fieldKey="bic"
          setData={setData}
          placeholder={t("accounting.placeholders.bic")}
          label={t("accounting.labels.bic")}
        />
        <SidebarInput
          fieldKey="committeeRole"
          setData={setData}
          placeholder={t("accounting.placeholders.committeeRole")}
          label={t("accounting.labels.committeeRole")}
        />
        <SidebarInput
          fieldKey="minutesNumber"
          setData={setData}
          placeholder={t("accounting.placeholders.minutesNumber")}
          label={t("accounting.labels.minutesNumber")}
        />
      </Dropdown>

      <Dropdown header={t("accounting.labels.expenses")}>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">
            {t("accounting.labels.category")}
          </label>
          <select
            className="w-full border-b p-1"
            value={newExpense.category}
            onChange={(e) =>
              setNewExpense((prev) => ({
                ...prev,
                category: e.target.value as ExpenseCategory,
              }))
            }
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {t(`accounting.categories.${cat}`)}
              </option>
            ))}
          </select>
        </div>
        <SidebarInput
          fieldKey="description"
          setData={setNewExpense}
          placeholder={t("accounting.placeholders.description")}
          label={t("accounting.labels.description")}
          value={newExpense.description}
        />
        <SidebarInput
          fieldKey="amount"
          setData={setNewExpense}
          placeholder={t("accounting.placeholders.amount")}
          label={t("accounting.labels.amount")}
          value={newExpense.amount}
        />
        <button
          className="mt-1 w-fit"
          onClick={addExpense}
        >
          {t("addItem")}
        </button>
      </Dropdown>

      <Dropdown header={t("accounting.labels.signatures")}>
        <SignaturesInput
          data={data}
          setData={setData}
        />
      </Dropdown>

      <Dropdown header={t("accounting.labels.date")}>
        <SidebarInput
          fieldKey="date"
          setData={setData}
          placeholder={t("accounting.placeholders.date")}
          label={t("accounting.labels.date")}
        />
      </Dropdown>

      <button
        className="mt-2"
        onClick={handlePdfDownloadClick}
      >
        {t("download")}
      </button>
    </div>
  );
};

export default AccountingSidebar;
