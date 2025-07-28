"use client";

import Dropdown from "@/app/components/Dropdown";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import SidebarListInput from "@/app/components/inputs/SidebarListInput";
import { downloadPdf } from "@/app/components/pdf/downloadPdf";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { formatDate } from "@/app/utils/formatDate";
import { useRef, useState } from "react";
import DatetimeInput from "../../components/inputs/DatetimeInput";
import MinutePdf from "../MinutesPdf";
import { MinutesProps } from "../page";
import DateButton from "./DateButton";
import ExaminerInput from "./ExaminerInput";
import SignaturesInput from "./SignaturesInput";

const MinutesSidebar = ({
  data: minutesData,
  setData: setMinutesData,
}: MinutesProps) => {
  const dict = useTranslations();

  const endTimeRef = useRef<HTMLDivElement>(undefined);
  const locationRef = useRef<HTMLDivElement>(undefined);

  const [errors, setErrors] = useState<{
    location?: string;
    timeOfMeeting?: string;
    attendants?: string;
    startTime?: string;
    examiners?: string;
    nextMeeting?: string;
    signatures?: string;
  }>({});

  const handlePdfDownload = () => {
    const newErrors: typeof errors = {};
    if (!minutesData.location?.fin || !minutesData.location?.eng) {
      newErrors.location = "Location is required";
    }
    if (!minutesData.timeOfMeeting) {
      newErrors.timeOfMeeting = "Time of meeting required";
    }
    if (minutesData.attendants.length <= 0) {
      newErrors.attendants = "At least 1 attendant required";
    }
    if (!minutesData.examiners.examiner1 || !minutesData.examiners.examiner2) {
      newErrors.examiners = "Examiner required";
    }
    if (!minutesData.nextMeeting) {
      newErrors.nextMeeting = "Time for next meeting required";
    }
    if (!Object.values(minutesData.signatures).some((x) => x !== "")) {
      newErrors.signatures = "Signature required";
    }
    if (Object.keys(newErrors).length > 0) {
      locationRef.current?.scrollIntoView();
      setErrors({ ...errors, ...newErrors });
      return;
    }

    if (minutesData.endTime === undefined) {
      endTimeRef.current!.focus();
      return;
    }

    downloadPdf({
      filename: `Kokouspöytäkirja-${formatDate(minutesData.endTime).split(" ")[0]}`,
      pdfElement: <MinutePdf data={minutesData} />,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Dropdown header={dict.minutes.labels.location}>
        {/* ##################### Required ##################### */}
        <MultiLanguageInput
          placeholder={dict.minutes.placeholders.location}
          fieldKey="location"
          setData={setMinutesData}
          ref={locationRef as React.RefObject<HTMLDivElement>}
          errorMessage={errors["location"]}
        />

        <DatetimeInput
          label={dict.minutes.labels.timeOfMeeting}
          placeholder={dict.minutes.placeholders.timeOfMeeting}
          data={minutesData}
          setData={setMinutesData}
          fieldKey="timeOfMeeting"
          showButton={false}
          errorMessage={errors["timeOfMeeting"]}
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.attendants}>
        <SidebarListInput
          placeholder={dict.minutes.labels.attendants}
          fieldKey="attendants"
          setData={setMinutesData}
          errorMessage={
            minutesData.attendants.length <= 0 ? errors["attendants"] : ""
          }
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.startTime}>
        {/* ##################### Required ##################### */}
        <DateButton
          className="mt-2"
          buttonLabel={dict.minutes.buttons.startTime}
          minutesData={minutesData}
          setMinutesData={setMinutesData}
          fieldKey="startTime"
        />
      </Dropdown>

      <Dropdown
        handledExternally={!true}
        open={minutesData.startTime !== undefined}
        maxHeight="1300px"
        transitionDuration="700"
      >
        <Dropdown header={dict.minutes.labels.examiners}>
          <ExaminerInput
            data={minutesData}
            setData={setMinutesData}
            errorMessage={errors["examiners"]}
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
          {minutesData.otherItems.map((item) => (
            <div key={item.fin}>
              {item.fin}, {item.eng}
            </div>
          ))}
        </Dropdown>

        <Dropdown header={dict.minutes.labels.newMembers}>
          <SidebarListInput
            placeholder={dict.minutes.placeholders.newMembers}
            setData={setMinutesData}
            fieldKey={"newMembers"}
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.nextMeeting}>
          {/* ##################### Required ##################### */}
          <DatetimeInput
            buttonLabel={dict.minutes.buttons.nextMeeting}
            placeholder={dict.minutes.placeholders.nextMeeting}
            setData={setMinutesData}
            data={minutesData}
            fieldKey="nextMeeting"
            errorMessage={errors["nextMeeting"]}
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.endTime}>
          {/* ##################### Required ##################### */}
          <DateButton
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
            errorMessage={errors["signatures"]}
          />
        </Dropdown>
      </Dropdown>

      <button onClick={handlePdfDownload}>Download</button>
    </div>
  );
};

export default MinutesSidebar;
