"use client";

import SimplePdf from "@/app/components/document/SimplePdf";
import Dropdown from "@/app/components/Dropdown";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { buildAccountingDocument } from "../buildDocument";
import { AccountingProps } from "../page";
import SignaturesInput from "./SignaturesInput";

const AccountingSidebar = ({ data, setData }: AccountingProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });
  const [newIncome, setNewIncome] = useState({ description: "", amount: "" });

  const addExpense = () => {
    if (!newExpense.description.trim()) return;
    setData((prev) => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));
    setNewExpense({ description: "", amount: "" });
  };

  const addIncome = () => {
    if (!newIncome.description.trim()) return;
    setData((prev) => ({
      ...prev,
      incomes: [...prev.incomes, newIncome],
    }));
    setNewIncome({ description: "", amount: "" });
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

      <Dropdown header={t("accounting.labels.committeeName")}>
        <SidebarInput
          fieldKey="committeeName"
          setData={setData}
          placeholder={t("accounting.placeholders.committeeName")}
        />
        <SidebarInput
          fieldKey="period"
          setData={setData}
          label={t("accounting.labels.period")}
          placeholder={t("accounting.placeholders.period")}
        />
      </Dropdown>

      <Dropdown header={t("accounting.labels.expenses")}>
        <SidebarInput
          fieldKey="description"
          setData={setNewExpense}
          placeholder={t("accounting.placeholders.description")}
          value={newExpense.description}
        />
        <SidebarInput
          fieldKey="amount"
          setData={setNewExpense}
          placeholder={t("accounting.placeholders.amount")}
          value={newExpense.amount}
        />
        <button
          className="mt-1 w-fit"
          onClick={addExpense}
        >
          {t("addItem")}
        </button>
      </Dropdown>

      <Dropdown header={t("accounting.labels.incomes")}>
        <SidebarInput
          fieldKey="description"
          setData={setNewIncome}
          placeholder={t("accounting.placeholders.description")}
          value={newIncome.description}
        />
        <SidebarInput
          fieldKey="amount"
          setData={setNewIncome}
          placeholder={t("accounting.placeholders.amount")}
          value={newIncome.amount}
        />
        <button
          className="mt-1 w-fit"
          onClick={addIncome}
        >
          {t("addItem")}
        </button>
      </Dropdown>

      <Dropdown header={t("accounting.labels.notes")}>
        <SidebarInput
          fieldKey="notes"
          setData={setData}
          placeholder={t("accounting.placeholders.notes")}
        />
      </Dropdown>

      <Dropdown header={t("accounting.labels.signatures")}>
        <SignaturesInput
          data={data}
          setData={setData}
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
