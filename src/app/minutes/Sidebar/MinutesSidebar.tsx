"use client";

import Dropdown from "@/app/components/Dropdown";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import SidebarListInput from "@/app/components/inputs/SidebarListInput";
import { downloadPdf } from "@/app/components/pdf/downloadPdf";
import ScrollAnchor from "@/app/components/ScrollAnchor";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { formatDate } from "@/app/utils/formatDate";
import { scrollToElement } from "@/app/utils/scrollToElement";
import { useState } from "react";
import DatetimeInput from "../../components/inputs/DatetimeInput";
import MinutesPdf from "../MinutesPdf";
import { MinutesProps } from "../page";
import DateButton from "./DateButton";
import ExaminerInput from "./ExaminerInput";
import SignaturesInput from "./SignaturesInput";

const MinutesSidebar = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const dict = useTranslations();

  const [checkPreMeetingErrors, setCheckPreMeetingErrors] =
    useState<boolean>(false);
  const [checkErrors, setCheckErrors] = useState<boolean>(false);

  const handlePdfDownload = () => {
    setCheckErrors(true);

    if (!dataValid()) return;

    downloadPdf({
      filename: `Kokouspöytäkirja-${formatDate(minutesData.endTime).split(" ")[0]}`,
      pdfElement: <MinutesPdf data={minutesData} />,
    });
  };

  const dataValid = (): boolean => {
    if (!preMeetingItemsFilled()) return false;

    if (!minutesData.examiners.examiner1 || !minutesData.examiners.examiner2) {
      scrollToElement("examiners-anchor");
      return false;
    }

    if (
      !minutesData.signatures.chairman ||
      !minutesData.signatures.secretary ||
      !minutesData.signatures.examiner1 ||
      !minutesData.signatures.examiner2
    ) {
      return false;
    }
    return true;
  };

  const preMeetingItemsFilled = (): boolean => {
    if (
      !minutesData.location?.fin ||
      !minutesData.location?.eng ||
      !minutesData.timeOfMeeting
    ) {
      scrollToElement("location-anchor");
      return false;
    }

    if (minutesData.attendants.length <= 0) {
      scrollToElement("attendants-anchor");
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col gap-2">
      {/* ###################### Pre-meeting ###################### */}
      <ScrollAnchor id={"location-anchor"} />
      <Dropdown header={dict.minutes.labels.location}>
        <SidebarInput
          fieldKey="minutesNumber"
          setData={setMinutesData}
          label={dict.minutes.labels.minutesNumber}
          placeholder={dict.minutes.placeholders.minutesNumber}
          type="number"
        />

        <MultiLanguageInput
          placeholder={dict.minutes.placeholders.location}
          fieldKey="location"
          setData={setMinutesData}
          errorMessage={dict.minutes.errors.location}
          hasError={checkPreMeetingErrors}
        />

        <DatetimeInput
          label={dict.minutes.labels.timeOfMeeting}
          placeholder={dict.minutes.placeholders.timeOfMeeting}
          data={minutesData}
          setData={setMinutesData}
          fieldKey="timeOfMeeting"
          showButton={false}
          errorMessage={dict.minutes.errors.timeOfMeeting}
          hasError={!minutesData.timeOfMeeting && checkPreMeetingErrors}
        />
      </Dropdown>

      <ScrollAnchor id={"attendants-anchor"} />
      <Dropdown header={dict.minutes.labels.attendants}>
        <SidebarListInput
          placeholder={dict.minutes.labels.attendants}
          fieldKey="attendants"
          setData={setMinutesData}
          errorMessage={dict.minutes.errors.attendants}
          hasError={minutesData.attendants.length <= 0 && checkPreMeetingErrors}
        />
      </Dropdown>
      {/* ###################### Pre-meeting ###################### */}

      <Dropdown header={dict.minutes.labels.startTime}>
        <DateButton
          onClick={(setDate) => {
            const ready = preMeetingItemsFilled();
            if (!ready) {
              setCheckPreMeetingErrors(true);
              return;
            }
            setDate();
          }}
          className="mt-2"
          buttonLabel={dict.minutes.buttons.startTime}
          minutesData={minutesData}
          setMinutesData={setMinutesData}
          fieldKey="startTime"
        />
      </Dropdown>

      <ScrollAnchor id={"examiners-anchor"} />
      <Dropdown
        handledExternally={true}
        open={minutesData.startTime !== undefined}
        maxHeight="1300px"
        transitionDuration="700"
      >
        <Dropdown header={dict.minutes.labels.examiners}>
          <ExaminerInput
            data={minutesData}
            setData={setMinutesData}
            errorMessage={checkErrors ? dict.minutes.errors.examiners : ""}
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.items}>
          <MultiLanguageListInput
            placeholder={dict.minutes.placeholders.attendants}
            fieldKey="meetingItems"
            setData={setMinutesData}
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.otherItems}>
          <MultiLanguageListInput
            placeholder={dict.minutes.placeholders.attendants}
            fieldKey="otherItems"
            setData={setMinutesData}
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.newMembers}>
          <SidebarListInput
            placeholder={dict.minutes.placeholders.newMembers}
            setData={setMinutesData}
            fieldKey={"newMembers"}
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.nextMeeting}>
          <DatetimeInput
            buttonLabel={dict.minutes.buttons.nextMeeting}
            placeholder={dict.minutes.placeholders.nextMeeting}
            setData={setMinutesData}
            data={minutesData}
            fieldKey="nextMeeting"
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.endTime}>
          <DateButton
            className="mt-2"
            buttonLabel={dict.minutes.buttons.endTime}
            minutesData={minutesData}
            setMinutesData={setMinutesData}
            fieldKey="endTime"
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.signatures}>
          <SignaturesInput
            minutesData={minutesData}
            setMinutesData={setMinutesData}
            checkErrors={checkErrors}
          />
        </Dropdown>
      </Dropdown>

      <button
        className="mt-2"
        onClick={handlePdfDownload}
      >
        {dict.download}
      </button>
    </div>
  );
};

export default MinutesSidebar;
