"use client";

import Dropdown from "@/app/components/Dropdown";
import SimplePdf from "@/app/components/document/SimplePdf";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { buildKeyFormDocument } from "../buildDocument";
import { KeyFormProps } from "../page";

const KeyFormSidebar = ({ data, setData }: KeyFormProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const [newRow, setNewRow] = useState({
    borrower: "",
    apartment: "",
    keyType: "",
    dateBorrowed: "",
    dateReturned: "",
  });

  const addKeyLoan = () => {
    if (!newRow.borrower.trim()) return;
    setData((prev) => ({
      ...prev,
      keyLoans: [...prev.keyLoans, newRow],
    }));
    setNewRow({
      borrower: "",
      apartment: "",
      keyType: "",
      dateBorrowed: "",
      dateReturned: "",
    });
  };

  const handlePdfDownloadClick = async () => {
    const filename = `${t("keyForm.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;
    const document = buildKeyFormDocument(data, t);
    await handlePdfDownload({
      filename,
      pdfElement: <SimplePdf document={document} />,
      confirmModalControls,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {ConfirmModal}

      <Dropdown header={t("keyForm.labels.info")}>
        <SidebarInput
          fieldKey="committeeName"
          data={data}
          setData={setData}
          label={t("keyForm.labels.committeeName")}
          placeholder={t("keyForm.placeholders.committeeName")}
        />
      </Dropdown>

      <Dropdown header={t("keyForm.labels.keyLoans")}>
        <SidebarInput
          fieldKey="borrower"
          setData={setNewRow}
          placeholder={t("keyForm.placeholders.borrower")}
          label={t("keyForm.labels.borrower")}
          value={newRow.borrower}
        />
        <SidebarInput
          fieldKey="apartment"
          setData={setNewRow}
          placeholder={t("keyForm.placeholders.apartment")}
          label={t("keyForm.labels.apartment")}
          value={newRow.apartment}
        />
        <SidebarInput
          fieldKey="keyType"
          setData={setNewRow}
          placeholder={t("keyForm.placeholders.keyType")}
          label={t("keyForm.labels.keyType")}
          value={newRow.keyType}
        />
        <SidebarInput
          fieldKey="dateBorrowed"
          setData={setNewRow}
          placeholder={t("keyForm.placeholders.dateBorrowed")}
          label={t("keyForm.labels.dateBorrowed")}
          value={newRow.dateBorrowed}
        />
        <SidebarInput
          fieldKey="dateReturned"
          setData={setNewRow}
          placeholder={t("keyForm.placeholders.dateReturned")}
          label={t("keyForm.labels.dateReturned")}
          value={newRow.dateReturned}
        />
        <button
          className="mt-1 w-fit"
          onClick={addKeyLoan}
        >
          {t("addItem")}
        </button>
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

export default KeyFormSidebar;
