"use client";

import { MinutesProps } from "../page";
import Preview from "./Preview";

const MinutesContent = ({ data }: MinutesProps) => {
  return (
    <div>
      <Preview data={data} />
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
