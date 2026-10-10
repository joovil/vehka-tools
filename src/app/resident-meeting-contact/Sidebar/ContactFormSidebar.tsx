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
import { ContactFormProps, Participant } from "../page";

const EMPTY_ROW: Participant = {
  name: "",
  address: "",
  email: "",
  phone: "",
  task: "",
};

const PARTICIPANT_FIELDS: (keyof Participant)[] = [
  "name",
  "address",
  "email",
  "phone",
  "task",
];

const ContactFormSidebar = ({ data, setData }: ContactFormProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const [newRow, setNewRow] = useState<Participant>(EMPTY_ROW);

  const addParticipant = () => {
    if (!newRow.name.trim()) return;
    setData((prev) => ({
      ...prev,
      participants: [...prev.participants, newRow],
    }));
    setNewRow(EMPTY_ROW);
  };

  const handlePdfDownloadClick = async () => {
    const filename = `${t("contactForm.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;
    const document = buildContactFormDocument(data, t);
    await handlePdfDownload({
      filename,
      documentType: "resident-meeting-contact",
      pdfElement: (
        <SimplePdf
          document={document}
          orientation="landscape"
        />
      ),
      confirmModalControls,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {ConfirmModal}

      <Dropdown header={t("contactForm.labels.info")}>
        <SidebarInput
          fieldKey="property"
          data={data}
          setData={setData}
          label={t("contactForm.labels.property")}
          placeholder={t("contactForm.placeholders.property")}
        />
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
          data={data}
          setData={setData}
          label={t("contactForm.labels.location")}
          placeholder={t("contactForm.placeholders.location")}
        />
        <SidebarInput
          fieldKey="chairman"
          data={data}
          setData={setData}
          label={t("contactForm.labels.chairman")}
          placeholder={t("contactForm.placeholders.chairman")}
        />
      </Dropdown>

      <Dropdown header={t("contactForm.labels.participants")}>
        {PARTICIPANT_FIELDS.map((field) => (
          <SidebarInput
            key={field}
            fieldKey={field}
            setData={setNewRow}
            placeholder={t(`contactForm.placeholders.${field}`)}
            label={t(`contactForm.labels.${field}`)}
            value={newRow[field]}
          />
        ))}
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
