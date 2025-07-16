"use client";

import { MinutesProps } from "../page";

const MinutesSidebar = ({ data, setData }: MinutesProps) => {
  return (
    <div>
      <div>{data.test}</div>
      <>Sidebar</>
    </div>
  );
};

export default MinutesSidebar;
