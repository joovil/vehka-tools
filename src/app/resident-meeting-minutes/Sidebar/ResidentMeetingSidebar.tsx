"use client";

import Dropdown from "@/app/components/Dropdown";
import SimplePdf from "@/app/components/document/SimplePdf";
import DatetimeInput from "@/app/components/inputs/DatetimeInput";
import LanguageSelector from "@/app/components/inputs/LanguageSelector";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import SidebarInputComponent from "@/app/components/inputs/SidebarInputComponent";
import SidebarListInput from "@/app/components/inputs/SidebarListInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { Examiners, Signatures } from "@/types";
import { useTranslations } from "next-intl";
import { buildResidentMeetingDocument } from "../buildDocument";
import { ResidentMeetingProps } from "../page";

const SIGNATURE_KEYS: (keyof Signatures)[] = [
  "chairman",
  "secretary",
  "examiner1",
  "examiner2",
];

const EXAMINER_KEYS: (keyof Examiners)[] = ["examiner1", "examiner2"];

const ResidentMeetingSidebar = ({ data, setData }: ResidentMeetingProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const handlePdfDownloadClick = async () => {
    const filename = `${t("residentMeeting.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;
    const document = buildResidentMeetingDocument(data, t);
    await handlePdfDownload({
      filename,
      documentType: "resident-meeting-minutes",
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
          fieldKey="minutesNumber"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.minutesNumber")}
          placeholder={t("residentMeeting.placeholders.minutesNumber")}
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
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.attendants")}>
        <SidebarListInput
          placeholder={t("residentMeeting.placeholders.attendants")}
          fieldKey="attendants"
          setData={setData}
        />
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.opening")}>
        <DatetimeInput
          label={t("residentMeeting.labels.startTime")}
          buttonLabel={t("residentMeeting.buttons.now")}
          placeholder={t("residentMeeting.placeholders.startTime")}
          data={data}
          setData={setData}
          fieldKey="startTime"
          showButton
        />
        <SidebarInput
          fieldKey="meetingChairman"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.meetingChairman")}
          placeholder={t("residentMeeting.placeholders.name")}
        />
        <SidebarInput
          fieldKey="meetingSecretary"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.meetingSecretary")}
          placeholder={t("residentMeeting.placeholders.name")}
        />
        {EXAMINER_KEYS.map((key) => (
          <SidebarInputComponent
            key={key}
            value={data.examiners[key]}
            label={t(`residentMeeting.labels.${key}`)}
            placeholder={t("residentMeeting.placeholders.name")}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setData((prev) => ({
                ...prev,
                examiners: { ...prev.examiners, [key]: value },
              }));
            }}
          />
        ))}
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.committeeElection")}>
        <SidebarInput
          fieldKey="committeeYear"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.committeeYear")}
          placeholder={t("residentMeeting.placeholders.committeeYear")}
        />
        <SidebarListInput
          label={t("residentMeeting.labels.committeeMembers")}
          placeholder={t("residentMeeting.placeholders.name")}
          fieldKey="committeeMembers"
          setData={setData}
        />
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.committeeOrganization")}>
        <SidebarInput
          fieldKey="committeeChairman"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.committeeChairman")}
          placeholder={t("residentMeeting.placeholders.name")}
        />
        <label className="mt-2">
          {t("residentMeeting.labels.chairmanConsent")}
        </label>
        <select
          className="w-full border-b p-1"
          value={data.chairmanConsent ?? ""}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setData((prev) => ({
              ...prev,
              chairmanConsent:
                value === "yes" || value === "no" ? value : undefined,
            }));
          }}
        >
          <option value="">–</option>
          <option value="yes">{t("residentMeeting.pdf.yes")}</option>
          <option value="no">{t("residentMeeting.pdf.no")}</option>
        </select>
        <SidebarInput
          fieldKey="committeeSecretary"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.committeeSecretary")}
          placeholder={t("residentMeeting.placeholders.name")}
        />
        <SidebarListInput
          label={t("residentMeeting.labels.otherRoles")}
          placeholder={t("residentMeeting.placeholders.otherRoles")}
          fieldKey="otherRoles"
          setData={setData}
        />
        <SidebarInput
          fieldKey="representative"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.representative")}
          placeholder={t("residentMeeting.placeholders.name")}
        />
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.otherMatters")}>
        <SidebarInput
          fieldKey="termLength"
          data={data}
          setData={setData}
          label={t("residentMeeting.labels.termLength")}
          placeholder={t("residentMeeting.placeholders.termLength")}
        />
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.closing")}>
        <DatetimeInput
          label={t("residentMeeting.labels.endTime")}
          buttonLabel={t("residentMeeting.buttons.now")}
          placeholder={t("residentMeeting.placeholders.endTime")}
          data={data}
          setData={setData}
          fieldKey="endTime"
          showButton
        />
      </Dropdown>

      <Dropdown header={t("residentMeeting.labels.signatures")}>
        <div className="flex flex-col gap-2">
          {SIGNATURE_KEYS.map((key) => (
            <div key={key}>
              <label className="text-sm text-gray-600">
                {t(`residentMeeting.labels.${key}`)}
              </label>
              <input
                className={`w-full border-b p-1 ${data.signatures[key] ? "font-alex text-xl" : ""}`}
                placeholder={t(`residentMeeting.labels.${key}`)}
                value={data.signatures[key]}
                onChange={(e) => {
                  const value = e.currentTarget.value;
                  setData((prev) => ({
                    ...prev,
                    signatures: { ...prev.signatures, [key]: value },
                  }));
                }}
              />
            </div>
          ))}
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
