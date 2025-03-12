"use client";

import { RefObject } from "react";
import { IFormData } from "./page";

const Invite = ({
  ref,
  formData,
}: {
  ref: RefObject<null>;
  formData: IFormData;
}) => {
  return (
    <div
      ref={ref}
      className="border-2"
    >
      <h1>Kutsu</h1>
      <div>Aika: {formData.time}</div>

      <div>
        <h2>Paikka</h2>
        <div>{formData.placeFin}</div>
      </div>

      <div></div>
    </div>
  );
};

export default Invite;
