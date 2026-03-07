"use client";

import Dropdown from "@/app/components/Dropdown";
import SimplePdf from "@/app/components/document/SimplePdf";
import DatetimeInput from "@/app/components/inputs/DatetimeInput";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { buildContactFormDocument } from "../buildDocument";
import { ContactFormProps } from "../page";

const ContactFormSidebar = ({ data, setData }: ContactFormProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const [newRow, setNewRow] = useState({
    name: "",
    apartment: "",
    phone: "",
    email: "",
  });

  const addParticipant = () => {
    if (!newRow.name.trim()) return;
    setData((prev) => ({
      ...prev,
      participants: [...prev.participants, newRow],
    }));
    setNewRow({ name: "", apartment: "", phone: "", email: "" });
  };

  const handlePdfDownloadClick = async () => {
    const filename = `${t("contactForm.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;
    const document = buildContactFormDocument(data, t);
    await handlePdfDownload({
      filename,
      pdfElement: <SimplePdf document={document} />,
      confirmModalControls,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {ConfirmModal}

      <Dropdown header={t("contactForm.labels.info")}>
        <DatetimeInput
          label={t("contactForm.labels.meetingDate")}
          placeholder={t("contactForm.placeholders.meetingDate")}
          data={data}
          setData={setData}
          fieldKey="meetingDate"
          showButton={false}
        />
        <SidebarInput
          fieldKey="location"
          setData={setData}
          label={t("contactForm.labels.location")}
          placeholder={t("contactForm.placeholders.location")}
        />
      </Dropdown>

      <Dropdown header={t("contactForm.labels.participants")}>
        <SidebarInput
          fieldKey="name"
          setData={setNewRow}
          placeholder={t("contactForm.placeholders.name")}
          label={t("contactForm.labels.name")}
          value={newRow.name}
        />
        <SidebarInput
          fieldKey="apartment"
          setData={setNewRow}
          placeholder={t("contactForm.placeholders.apartment")}
          label={t("contactForm.labels.apartment")}
          value={newRow.apartment}
        />
        <SidebarInput
          fieldKey="phone"
          setData={setNewRow}
          placeholder={t("contactForm.placeholders.phone")}
          label={t("contactForm.labels.phone")}
          value={newRow.phone}
        />
        <SidebarInput
          fieldKey="email"
          setData={setNewRow}
          placeholder={t("contactForm.placeholders.email")}
          label={t("contactForm.labels.email")}
          value={newRow.email}
        />
        <button
          className="mt-1 w-fit"
          onClick={addParticipant}
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

export default ContactFormSidebar;
