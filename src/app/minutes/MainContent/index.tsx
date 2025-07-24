"use client";

import { MinutesProps } from "../page";

const MinutesContent = ({ data }: MinutesProps) => {
  return (
    <div>
      <div className="flex flex-col">
        <div>Location</div>
        <div>{data.location?.fin}</div>
        <div>{data.location?.eng}</div>
      </div>
      {/* <Preview data={data} /> */}
      {/* <PdfPreview>
        <MinutePdf
          attendants={data.attendants}
          meetingItems={data.meetingItems}
          otherItems={data.otherItems}
          signatures={data.signatures}
        />
      </PdfPreview> */}
    </div>
  );
};

export default MinutesContent;
