"use client";

import { Examiners } from "../MainContent/page";

const MeetingExaminers = ({
  examiners,
  setExaminers,
}: {
  examiners: Examiners;
  setExaminers: React.Dispatch<React.SetStateAction<Examiners>>;
}) => {
  return (
    <div className="gap-sm flex flex-col">
      <div className="flex flex-col">
        <label>Tarkastaja 1</label>
        <input
          placeholder="Tarkastaja 1"
          type="text"
          onChange={(e) =>
            setExaminers({ ...examiners, examiner1: e.currentTarget.value })
          }
          value={examiners.examiner1}
          required
        />
      </div>

      <div className="flex flex-col">
        <label>Tarkastaja 2</label>
        <input
          placeholder="Tarkastaja 2"
          type="text"
          onChange={(e) =>
            setExaminers({ ...examiners, examiner2: e.currentTarget.value })
          }
          value={examiners.examiner2}
          required
        />
      </div>
    </div>
  );
};

export default MeetingExaminers;
