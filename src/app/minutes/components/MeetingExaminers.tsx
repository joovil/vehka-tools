"use client";

import { Examiners } from "../page";

const MeetingExaminers = ({
  examiners,
  setExaminers,
}: {
  examiners: Examiners;
  setExaminers: React.Dispatch<React.SetStateAction<Examiners>>;
}) => {
  return (
    <div className="flex flex-col gap-sm">
      <div className="flex flex-col">
        <label>Tarkastaja 1</label>
        <input
          type="text"
          onChange={(e) =>
            setExaminers({ ...examiners, examiner1: e.currentTarget.value })
          }
          value={examiners.examiner1}
        />
      </div>

      <div className="flex flex-col">
        <label>Tarkastaja 2</label>
        <input
          type="text"
          onChange={(e) =>
            setExaminers({ ...examiners, examiner2: e.currentTarget.value })
          }
          value={examiners.examiner2}
        />
      </div>
    </div>
  );
};

export default MeetingExaminers;
