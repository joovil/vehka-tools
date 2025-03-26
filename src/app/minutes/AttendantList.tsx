"use client";

import { Reorder } from "motion/react";

const AttendantList = ({
  attendants,
  setAttendants,
}: {
  attendants: string[];
  setAttendants: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <Reorder.Group
      values={attendants}
      onReorder={setAttendants}
    >
      <></>
    </Reorder.Group>
  );
};

export default AttendantList;
