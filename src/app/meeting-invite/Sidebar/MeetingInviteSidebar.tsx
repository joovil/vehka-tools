"use client";

import DatetimeInput from "@/app/components/inputs/DatetimeInput";
import LanguageSelector from "@/app/components/inputs/LanguageSelector";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { scrollToElement } from "@/app/utils/scrollToElement";
import { useTranslations } from "next-intl";
import { useState } from "react";
import MeetingInvitePdf from "../MainContent/invitePdf/MeetingInvitePdf";
import { buildInviteDocument } from "../buildDocument";
import { MeetingInviteProps } from "../page";

const MeetingInviteSidebar = ({
  data: inviteData,
  setData: setInviteData,
}: MeetingInviteProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const [checkErrors, setCheckErrors] = useState<boolean>(false);

  const handlePdfDownloadClick = async () => {
    if (!dataValid()) return;

    const filename = `${t("meetingInvite.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;
    const document = buildInviteDocument(inviteData, t);

    await handlePdfDownload({
      filename,
      pdfElement: <MeetingInvitePdf document={document} />,
      confirmModalControls,
    });
  };

  const dataValid = () => {
    setCheckErrors(true);

    if (!inviteData.date) {
      scrollToElement("page-top");
      return;
    }

    if (!inviteData.location?.eng || !inviteData.location.fin) return false;
    if (inviteData.agendaItems.length <= 0) return false;

    return true;
  };

  return (
    <div className="flex flex-col gap-2">
      {ConfirmModal}

      <LanguageSelector
        value={inviteData.language ?? "bilingual"}
        onChange={(lang) =>
          setInviteData((prev) => ({ ...prev, language: lang }))
        }
      />

      {/* <ScrollAnchor id="page-top" /> */}
      <DatetimeInput
        header={t("meetingInvite.headers.date")}
        setData={setInviteData}
        data={inviteData}
        fieldKey="date"
        placeholder={t("meetingInvite.placeholders.date")}
        hasError={checkErrors && !inviteData.date}
        errorMessage={t("meetingInvite.errors.date")}
      />

      <MultiLanguageInput
        header={t("meetingInvite.headers.location")}
        setData={setInviteData}
        fieldKey="location"
        placeholder={t("meetingInvite.placeholders.location")}
        hasError={
          checkErrors &&
          (!inviteData.location?.fin || !inviteData.location?.eng)
        }
        errorMessage={t("meetingInvite.errors.location")}
      />

      <MultiLanguageListInput
        header={t("meetingInvite.labels.agenda")}
        placeholder={t("meetingInvite.placeholders.agenda")}
        fieldKey="agendaItems"
        setData={setInviteData}
        hasError={checkErrors && inviteData.agendaItems.length <= 0}
        errorMessage={t("meetingInvite.errors.agenda")}
      />

      <MultiLanguageInput
        header={t("meetingInvite.labels.furtherInformation")}
        placeholder={t("meetingInvite.placeholders.furtherInformation")}
        fieldKey="moreInfo"
        setData={setInviteData}
      />

      <button
        className="mt-2"
        onClick={handlePdfDownloadClick}
      >
        {t("download")}
      </button>
    </div>
  );
};

export default MeetingInviteSidebar;
