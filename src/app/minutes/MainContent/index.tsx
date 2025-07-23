"use client";

import { MinutesProps } from "../page";

const MinutesContent = ({ data }: MinutesProps) => {
  return (
    <div>
      <div>
        {data.attendants.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
      <div></div>
      <div>
        {data.meetingItems.map((item) => (
          <div key={item.fin}>{item.fin}</div>
        ))}
      </div>
      <div>
        {data.meetingItems.map((item) => (
          <div key={item.eng}>{item.eng}</div>
        ))}
      </div>
    </div>
  );
};

export default MinutesContent;
