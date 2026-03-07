"use client";

import Dropdown from "@/app/components/Dropdown";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import SidebarListInput from "@/app/components/inputs/SidebarListInput";
import useConfirmModal from "@/app/components/useConfirmModal";
import { handlePdfDownload } from "@/app/utils/handlePdfDownload";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DatetimeInput from "../../components/inputs/DatetimeInput";
import { useFormValidation } from "../hooks/useFormValidation";
import MinutesPdf, { type MinutesPdfTranslations } from "../MinutesPdf";
import { MinutesProps } from "../page";
import DateButton from "./DateButton";
import ExaminerInput from "./ExaminerInput";
import SignaturesInput from "./SignaturesInput";

const MinutesSidebar = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const t = useTranslations();
  const { ConfirmModal, confirmModalControls } = useConfirmModal();

  const [endMeeting, setEndMeeting] = useState<boolean>(false);

  const { formDataValid, checkErrors, preMeetingValid, checkPreMeetingErrors } =
    // This validates the input data and scrolls to errors
    useFormValidation(minutesData);

  const handlePdfDownloadClick = async () => {
    if (!formDataValid) return;

    const filename = `${t("minutes.pdfFilename")}-${new Date().toLocaleDateString("fi-FI")}`;

    const pdfTranslations: MinutesPdfTranslations = {
      organization: t("minutes.pdf.organization"),
      minutesLabel: t("minutes.pdf.minutesLabel"),
      meetingTitle: t("minutes.pdf.meetingTitle"),
      dateAndTime: t("minutes.pdf.dateAndTime"),
      present: t("minutes.pdf.present"),
      section1: t("minutes.pdf.section1"),
      chairmanOpenedAt: t("minutes.pdf.chairmanOpenedAt"),
      meetingDeclaredLegal: t("minutes.pdf.meetingDeclaredLegal"),
      section2: t("minutes.pdf.section2"),
      elected: t("minutes.pdf.elected"),
      section3: t("minutes.pdf.section3"),
      agendaApproved: t("minutes.pdf.agendaApproved"),
      section4: t("minutes.pdf.section4"),
      section5: t("minutes.pdf.section5"),
      newMembers: t("minutes.pdf.newMembers"),
      section6: t("minutes.pdf.section6"),
      nextMeetingHeldAt: t("minutes.pdf.nextMeetingHeldAt"),
      section7: t("minutes.pdf.section7"),
      chairmanClosedAt: t("minutes.pdf.chairmanClosedAt"),
      certification: t("minutes.pdf.certification"),
      signatureSuffix: t("minutes.pdf.signatureSuffix"),
    };

    await handlePdfDownload({
      filename,
      pdfElement: (
        <MinutesPdf
          data={minutesData}
          translations={pdfTranslations}
        />
      ),
      confirmModalControls,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {ConfirmModal}
      {/* ###################### Pre-meeting ###################### */}
      <div id="location-anchor">
        <Dropdown header={t("minutes.labels.location")}>
          <SidebarInput
            fieldKey="minutesNumber"
            setData={setMinutesData}
            label={t("minutes.labels.minutesNumber")}
            placeholder={t("minutes.placeholders.minutesNumber")}
            type="number"
          />

          <MultiLanguageInput
            placeholder={t("minutes.placeholders.location")}
            fieldKey="location"
            setData={setMinutesData}
            errorMessage={t("minutes.errors.location")}
            hasError={checkPreMeetingErrors}
          />

          <DatetimeInput
            label={t("minutes.labels.timeOfMeeting")}
            placeholder={t("minutes.placeholders.timeOfMeeting")}
            data={minutesData}
            setData={setMinutesData}
            fieldKey="timeOfMeeting"
            showButton={false}
            errorMessage={t("minutes.errors.timeOfMeeting")}
            hasError={!minutesData.timeOfMeeting && checkPreMeetingErrors}
          />
        </Dropdown>
      </div>

      <div id="attendants-anchor">
        <Dropdown header={t("minutes.labels.attendants")}>
          <SidebarListInput
            placeholder={t("minutes.labels.attendants")}
            fieldKey="attendants"
            setData={setMinutesData}
            errorMessage={t("minutes.errors.attendants")}
            hasError={
              minutesData.attendants.length <= 0 && checkPreMeetingErrors
            }
          />
        </Dropdown>
      </div>
      {/* ###################### Meeting ###################### */}

      <Dropdown header={t("minutes.labels.startTime")}>
        <DateButton
          onClick={(setDate) => {
            if (!preMeetingValid()) return;
            setDate();
          }}
          buttonLabel={t("minutes.buttons.startTime")}
          minutesData={minutesData}
          setMinutesData={setMinutesData}
          fieldKey="startTime"
          disabled={false}
        />
        {!minutesData.startTime && (
          <p className="mt-1 text-sm text-gray-400 italic">
            {t("minutes.hints.startMeetingInfo")}
          </p>
        )}
      </Dropdown>

      <Dropdown
        handledExternally={true}
        open={minutesData.startTime !== undefined}
        maxHeight="1500px"
        transitionDuration="700"
      >
        <div id="examiners-anchor">
          <Dropdown header={t("minutes.labels.examiners")}>
            <ExaminerInput
              data={minutesData}
              setData={setMinutesData}
              errorMessage={checkErrors ? t("minutes.errors.examiners") : ""}
            />
          </Dropdown>
        </div>

        <Dropdown header={t("minutes.labels.items")}>
          <MultiLanguageListInput
            placeholder={t("minutes.placeholders.attendants")}
            fieldKey="meetingItems"
            setData={setMinutesData}
          />
        </Dropdown>

        <Dropdown header={t("minutes.labels.otherItems")}>
          <MultiLanguageListInput
            placeholder={t("minutes.placeholders.attendants")}
            fieldKey="otherItems"
            setData={setMinutesData}
          />
        </Dropdown>

        <Dropdown header={t("minutes.labels.newMembers")}>
          <SidebarListInput
            placeholder={t("minutes.placeholders.newMembers")}
            setData={setMinutesData}
            fieldKey={"newMembers"}
          />
        </Dropdown>

        <Dropdown header={t("minutes.labels.nextMeeting")}>
          <DatetimeInput
            buttonLabel={t("minutes.buttons.nextMeeting")}
            placeholder={t("minutes.placeholders.nextMeeting")}
            setData={setMinutesData}
            data={minutesData}
            fieldKey="nextMeeting"
          />
        </Dropdown>

        <Dropdown header={t("minutes.labels.signatures")}>
          <SignaturesInput
            minutesData={minutesData}
            setMinutesData={setMinutesData}
            checkErrors={checkErrors}
          />
        </Dropdown>

        <Dropdown header={t("minutes.labels.endTime")}>
          <DateButton
            onClick={(setData) => {
              if (!formDataValid()) return;
              setEndMeeting(true);
              setData();
            }}
            className="mt-2"
            buttonLabel={t("minutes.buttons.endTime")}
            minutesData={minutesData}
            setMinutesData={setMinutesData}
            fieldKey="endTime"
          />
        </Dropdown>
      </Dropdown>

      {endMeeting && (
        <button onClick={handlePdfDownloadClick}>{t("download")}</button>
      )}
    </div>
  );
};

export default MinutesSidebar;
