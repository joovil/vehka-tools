"use client";

import Dropdown from "@/app/components/Dropdown";
import SimplePdf from "@/app/components/document/SimplePdf";
import DatetimeInput from "@/app/components/inputs/DatetimeInput";
import LanguageSelector from "@/app/components/inputs/LanguageSelector";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { buildEventParticipantsDocument } from "../buildDocument";
import { EventParticipantsProps } from "../page";

const EventParticipantsSidebar = ({
  data,
  setData,
}: EventParticipantsProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const [newRow, setNewRow] = useState({ name: "", apartment: "" });

  const addParticipant = () => {
    if (!newRow.name.trim()) return;
    setData((prev) => ({
      ...prev,
      participants: [...prev.participants, newRow],
    }));
    setNewRow({ name: "", apartment: "" });
  };

  const handlePdfDownloadClick = async () => {
    const filename = `${t("eventParticipants.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;
    const document = buildEventParticipantsDocument(data, t);
    await handlePdfDownload({
      filename,
      pdfElement: <SimplePdf document={document} />,
      confirmModalControls,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {ConfirmModal}

      <LanguageSelector
        value={data.language ?? "bilingual"}
        onChange={(lang) => setData((prev) => ({ ...prev, language: lang }))}
      />

      <Dropdown header={t("eventParticipants.labels.info")}>
        <MultiLanguageInput
          fieldKey="eventName"
          data={data}
          setData={setData}
          header={t("eventParticipants.labels.eventName")}
          placeholder={t("eventParticipants.placeholders.eventName")}
        />
        <DatetimeInput
          label={t("eventParticipants.labels.date")}
          placeholder={t("eventParticipants.placeholders.date")}
          data={data}
          setData={setData}
          fieldKey="date"
          showButton={false}
        />
        <MultiLanguageInput
          fieldKey="location"
          data={data}
          setData={setData}
          header={t("eventParticipants.labels.location")}
          placeholder={t("eventParticipants.placeholders.location")}
        />
      </Dropdown>

      <Dropdown header={t("eventParticipants.labels.participants")}>
        <SidebarInput
          fieldKey="name"
          setData={setNewRow}
          placeholder={t("eventParticipants.placeholders.name")}
          label={t("eventParticipants.labels.name")}
          value={newRow.name}
        />
        <SidebarInput
          fieldKey="apartment"
          setData={setNewRow}
          placeholder={t("eventParticipants.placeholders.apartment")}
          label={t("eventParticipants.labels.apartment")}
          value={newRow.apartment}
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

export default EventParticipantsSidebar;
