"use client";

import Dropdown from "@/app/components/Dropdown";
import MultiLanguageInput from "@/app/components/inputs/MultiLanguageInput";
import MultiLanguageListInput from "@/app/components/inputs/MultiLanguageListInput";
import SidebarListInput from "@/app/components/inputs/SidebarListInput";
import { downloadPdf } from "@/app/components/pdf/downloadPdf";
import ScrollAnchor from "@/app/components/ScrollAnchor";
import { useTranslations } from "@/app/i18n/TranslationsProvider";
import { formatDate } from "@/app/utils/formatDate";
import { useState } from "react";
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

  const [checkErrors, setCheckErrors] = useState<boolean>(false);

  const handlePdfDownload = () => {
    setCheckErrors(true);
    scrollToError();

    return;
    downloadPdf({
      filename: `Kokouspöytäkirja-${formatDate(minutesData.endTime).split(" ")[0]}`,
      pdfElement: <MinutePdf data={minutesData} />,
    });
  };

  const scrollToError = () => {
    const scrollToElement = (id: string) => {
      const el = document.getElementById(id);
      el?.scrollIntoView();
      return el;
    };

    if (
      !minutesData.location?.fin ||
      !minutesData.location?.eng ||
      !minutesData.timeOfMeeting
    ) {
      scrollToElement("location-anchor");
      return;
    }

    if (minutesData.attendants.length <= 0) {
      scrollToElement("attendants-anchor");
      return;
    }

    if (!minutesData.examiners.examiner1 || !minutesData.examiners.examiner2) {
      scrollToElement("examiners-anchor");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <ScrollAnchor id={"location-anchor"} />
      <Dropdown header={dict.minutes.labels.location}>
        <MultiLanguageInput
          placeholder={dict.minutes.placeholders.location}
          fieldKey="location"
          setData={setMinutesData}
          errorMessage={"Location required"}
          checkErrors={checkErrors}
        />

        <DatetimeInput
          label={dict.minutes.labels.timeOfMeeting}
          placeholder={dict.minutes.placeholders.timeOfMeeting}
          data={minutesData}
          setData={setMinutesData}
          fieldKey="timeOfMeeting"
          showButton={false}
          errorMessage={"Time of meeting required"}
          hasError={!minutesData.timeOfMeeting && checkErrors}
        />
      </Dropdown>

      <ScrollAnchor id={"attendants-anchor"} />
      <Dropdown header={dict.minutes.labels.attendants}>
        <SidebarListInput
          placeholder={dict.minutes.labels.attendants}
          fieldKey="attendants"
          setData={setMinutesData}
          errorMessage={"Attendants required"}
          hasError={minutesData.attendants.length <= 0 && checkErrors}
        />
      </Dropdown>

      <Dropdown header={dict.minutes.labels.startTime}>
        <DateButton
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
            errorMessage={checkErrors ? "examiners" : ""}
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
          <DatetimeInput
            buttonLabel={dict.minutes.buttons.nextMeeting}
            placeholder={dict.minutes.placeholders.nextMeeting}
            setData={setMinutesData}
            data={minutesData}
            fieldKey="nextMeeting"
            errorMessage={checkErrors ? "Time for next meeting required" : ""}
            hasError={!minutesData.nextMeeting && checkErrors}
          />
        </Dropdown>

        <Dropdown header={dict.minutes.labels.endTime}>
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
            checkErrors={checkErrors}
          />
        </Dropdown>
      </Dropdown>

      <button onClick={handlePdfDownload}>Download</button>
    </div>
  );
};

export default MinutesSidebar;
