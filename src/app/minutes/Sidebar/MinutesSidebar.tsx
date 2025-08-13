"use client";

import { savePdf } from "@/app/api/services/savePdf";
import Dropdown from "@/app/components/Dropdown";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import SidebarListInput from "@/app/components/inputs/SidebarListInput";
import { downloadPdf } from "@/app/components/pdf/downloadPdf";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { useState } from "react";
import DatetimeInput from "../../components/inputs/DatetimeInput";
import { useFormValidation } from "../hooks/useFormValidation";
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
  const [endMeeting, setEndMeeting] = useState<boolean>(false);

  const { formDataValid, checkErrors, preMeetingValid, checkPreMeetingErrors } =
    // This validates the input data and scrolls to errors
    useFormValidation(minutesData);

  const handlePdfDownload = async () => {
    try {
      if (!formDataValid()) return;

      const filename = `Kokouspöytäkirja-${minutesData.endTime?.getDate()}_${minutesData.endTime!.getMonth() + 1}_${minutesData.endTime?.getFullYear()}`;

      const newMinutesBlob = await downloadPdf({
        filename,
        pdfElement: <MinutesPdf data={minutesData} />,
      });

      const res = await savePdf(filename, newMinutesBlob);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* ###################### Pre-meeting ###################### */}
      <div id="location-anchor">
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
      </div>

      <div id="attendants-anchor">
        <Dropdown header={dict.minutes.labels.attendants}>
          <SidebarListInput
            placeholder={dict.minutes.labels.attendants}
            fieldKey="attendants"
            setData={setMinutesData}
            errorMessage={dict.minutes.errors.attendants}
            hasError={
              minutesData.attendants.length <= 0 && checkPreMeetingErrors
            }
          />
        </Dropdown>
      </div>
      {/* ###################### Meeting ###################### */}

      <Dropdown header={dict.minutes.labels.startTime}>
        <DateButton
          onClick={(setDate) => {
            if (!preMeetingValid()) return;
            setDate();
          }}
          buttonLabel={dict.minutes.buttons.startTime}
          minutesData={minutesData}
          setMinutesData={setMinutesData}
          fieldKey="startTime"
          disabled={false}
        />
      </Dropdown>

      <Dropdown
        handledExternally={true}
        open={minutesData.startTime !== undefined}
        maxHeight="1500px"
        transitionDuration="700"
      >
        <div id="examiners-anchor">
          <Dropdown header={dict.minutes.labels.examiners}>
            <ExaminerInput
              data={minutesData}
              setData={setMinutesData}
              errorMessage={checkErrors ? dict.minutes.errors.examiners : ""}
            />
          </Dropdown>
        </div>

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

        <Dropdown header={dict.minutes.labels.signatures}>
          <SignaturesInput
            minutesData={minutesData}
            setMinutesData={setMinutesData}
            checkErrors={checkErrors}
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.endTime}>
          <DateButton
            onClick={(setData) => {
              if (!formDataValid()) return;
              setEndMeeting(true);
              setData();
            }}
            className="mt-2"
            buttonLabel={dict.minutes.buttons.endTime}
            minutesData={minutesData}
            setMinutesData={setMinutesData}
            fieldKey="endTime"
          />
        </Dropdown>
      </Dropdown>

      {endMeeting && (
        <button onClick={handlePdfDownload}>{dict.download}</button>
      )}
    </div>
  );
};

export default MinutesSidebar;
