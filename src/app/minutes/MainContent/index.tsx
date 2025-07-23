"use client";

import { Signatures } from "@/types";
import { MinutesProps } from "../page";

const MinutesContent = ({ data, setData }: MinutesProps) => {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {String(value)}
        </div>
      ))}

      {Object.keys(data.signatures).map((sig) => (
        <div>
          {sig} {data.signatures[sig as keyof Signatures]}
        </div>
      ))}
    </div>
  );
};

export default MinutesContent;
