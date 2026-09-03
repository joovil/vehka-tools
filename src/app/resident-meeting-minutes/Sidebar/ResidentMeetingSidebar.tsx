"use client";

import Dropdown from "@/app/components/Dropdown";
import SimplePdf from "@/app/components/document/SimplePdf";
import DatetimeInput from "@/app/components/inputs/DatetimeInput";
import LanguageSelector from "@/app/components/inputs/LanguageSelector";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { useTranslations } from "next-intl";
import { buildResidentMeetingDocument } from "../buildDocument";
import { ResidentMeetingProps } from "../page";

const ResidentMeetingSidebar = ({ data, setData }: ResidentMeetingProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const handlePdfDownloadClick = async () => {
    const filename = `${t("residentMeeting.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;
    const document = buildResidentMeetingDocument(data, t);
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

      <Dropdown header={t("residentMeeting.labels.info")}>
        <SidebarInput
          fieldKey="meetingNumber"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.meetingNumber")}
          placeholder={t("residentMeeting.placeholders.meetingNumber")}
          type="number"
        />
        <DatetimeInput
          label={t("residentMeeting.labels.date")}
          placeholder={t("residentMeeting.placeholders.date")}
          data={data}
          setData={setData}
          fieldKey="date"
          showButton={false}
        />
        <MultiLanguageInput
          placeholder={t("residentMeeting.placeholders.location")}
          fieldKey="location"
          data={data}
          setData={setData}
        />
        <SidebarInput
          fieldKey="attendantCount"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.attendantCount")}
          placeholder={t("residentMeeting.placeholders.attendantCount")}
          type="number"
        />
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.agendaItems")}>
        <MultiLanguageListInput
          placeholder={t("residentMeeting.placeholders.agenda")}
          fieldKey="agendaItems"
          setData={setData}
        />
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.decisions")}>
        <MultiLanguageListInput
          placeholder={t("residentMeeting.placeholders.decisions")}
          fieldKey="decisions"
          setData={setData}
        />
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.nextMeeting")}>
        <DatetimeInput
          placeholder={t("residentMeeting.placeholders.nextMeeting")}
          data={data}
          setData={setData}
          fieldKey="nextMeeting"
        />
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.signatures")}>
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-sm text-gray-600">
              {t("residentMeeting.labels.chairman")}
            </label>
            <input
              className={`w-full border-b p-1 ${data.signatures.chairman ? "font-alex text-xl" : ""}`}
              placeholder={t("residentMeeting.labels.chairman")}
              value={data.signatures.chairman}
              onChange={(e) =>
                setData({
                  ...data,
                  signatures: {
                    ...data.signatures,
                    chairman: e.currentTarget.value,
                  },
                })
              }
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">
              {t("residentMeeting.labels.secretary")}
            </label>
            <input
              className={`w-full border-b p-1 ${data.signatures.secretary ? "font-alex text-xl" : ""}`}
              placeholder={t("residentMeeting.labels.secretary")}
              value={data.signatures.secretary}
              onChange={(e) =>
                setData({
                  ...data,
                  signatures: {
                    ...data.signatures,
                    secretary: e.currentTarget.value,
                  },
                })
              }
            />
          </div>
        </div>
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

export default ResidentMeetingSidebar;
