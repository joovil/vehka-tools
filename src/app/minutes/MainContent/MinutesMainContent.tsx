"use client";

import { MinutesProps } from "../page";

const MinutesContent = ({ data }: MinutesProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="font-bold">Location</div>
        <div>{data.location?.fin}</div>
        <div>{data.location?.eng}</div>
      </div>

      <div>
        <div className="font-bold">Attendants</div>
        {data.attendants.map((att) => (
          <div key={att}>{att}</div>
        ))}
      </div>

      <div>
        <div className="font-bold">Examiner</div>
        <div>{data.examiners.examiner1}</div>
        <div>{data.examiners.examiner2}</div>
      </div>

      <div>
        <div className="font-bold">Meeting items</div>
        {data.meetingItems.map((item) => (
          <div
            key={item.eng}
            className="flex gap-2"
          >
            <div>{item.fin}</div>
            <div>{item.eng}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="font-bold">Other items</div>
        {data.otherItems.map((item) => (
          <div
            key={item.eng}
            className="flex gap-2"
          >
            <div>{item.fin}</div>
            <div>{item.eng}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinutesContent;
