"use client";

import Dropdown from "@/app/components/Dropdown";
import SimplePdf from "@/app/components/document/SimplePdf";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { buildCompensationDocument } from "../buildDocument";
import { CompensationProps } from "../page";

const CompensationSidebar = ({ data, setData }: CompensationProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const [newRow, setNewRow] = useState({
    item: "",
    price: "",
    condition: "",
  });

  const addItem = () => {
    if (!newRow.item.trim()) return;
    setData((prev) => ({
      ...prev,
      items: [...prev.items, newRow],
    }));
    setNewRow({ item: "", price: "", condition: "" });
  };

  const handlePdfDownloadClick = async () => {
    const filename = `${t("compensationPrices.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;
    const document = buildCompensationDocument(data, t);
    await handlePdfDownload({
      filename,
      pdfElement: <SimplePdf document={document} />,
      confirmModalControls,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {ConfirmModal}

      <Dropdown header={t("compensationPrices.labels.info")}>
        <SidebarInput
          fieldKey="committeeName"
          data={data}
          setData={setData}
          label={t("compensationPrices.labels.committeeName")}
          placeholder={t("compensationPrices.placeholders.committeeName")}
        />
      </Dropdown>

      <Dropdown header={t("compensationPrices.labels.items")}>
        <SidebarInput
          fieldKey="item"
          setData={setNewRow}
          placeholder={t("compensationPrices.placeholders.item")}
          label={t("compensationPrices.labels.item")}
          value={newRow.item}
        />
        <SidebarInput
          fieldKey="price"
          setData={setNewRow}
          placeholder={t("compensationPrices.placeholders.price")}
          label={t("compensationPrices.labels.price")}
          value={newRow.price}
        />
        <SidebarInput
          fieldKey="condition"
          setData={setNewRow}
          placeholder={t("compensationPrices.placeholders.condition")}
          label={t("compensationPrices.labels.condition")}
          value={newRow.condition}
        />
        <button
          className="mt-1 w-fit"
          onClick={addItem}
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

export default CompensationSidebar;
