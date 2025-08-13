import { scrollToElement } from "@/app/utils/scrollToElement";
import { useState } from "react";
import { MinutesData } from "../page";

export const useFormValidation = (md: MinutesData) => {
  const [checkErrors, setCheckErrors] = useState<boolean>(false);
  const [checkPreMeetingErrors, setCheckPreMeetingErrors] =
    useState<boolean>(false);

  const attendantsValid = md.attendants.length !== 0;

  const locationValid =
    md.location !== undefined &&
    md.location.fin !== undefined &&
    md.location.fin.trim().length > 0 &&
    md.location.eng !== undefined &&
    md.location.eng.trim().length > 0;

  const timeOfMeetingValid = !!md.timeOfMeeting;

  const examinersValid =
    md.examiners.examiner1 !== undefined &&
    md.examiners.examiner1.trim().length > 0 &&
    md.examiners.examiner2 !== undefined &&
    md.examiners.examiner2.trim().length > 0;

  const signaturesValid =
    (md.signatures.chairman !== undefined &&
      md.signatures.chairman.trim().length > 0) ||
    (md.signatures.secretary !== undefined &&
      md.signatures.secretary.trim().length > 0) ||
    (md.signatures.examiner1 !== undefined &&
      md.signatures.examiner1.trim().length > 0) ||
    (md.signatures.examiner2 !== undefined &&
      md.signatures.examiner2.trim().length > 0);

  const preMeetingValid = (): boolean => {
    if (!locationValid || !timeOfMeetingValid || !attendantsValid) {
      setCheckPreMeetingErrors(true);
    }

    if (!locationValid || !timeOfMeetingValid) {
      scrollToElement("location-anchor");
      return false;
    }

    if (!attendantsValid) {
      scrollToElement("attendants-anchor");
      return false;
    }

    return true;
  };

  const formDataValid = (): boolean => {
    if (!preMeetingValid()) return false;

    setCheckErrors(true);

    console.log(examinersValid);
    if (!examinersValid) {
      scrollToElement("examiners-anchor");
      return false;
    }

    if (!signaturesValid) return false;

    return true;
  };

  return {
    preMeetingValid,
    formDataValid,
    checkErrors,
    checkPreMeetingErrors,
  };
};
