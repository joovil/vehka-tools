"use client";

import { MinutesProps } from "../page";

const MinutesContent = ({ data, setData }: MinutesProps) => {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {String(value)}
        </div>
      ))}
    </div>
  );
};

export default MinutesContent;
