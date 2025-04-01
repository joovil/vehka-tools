"use client";

import { Signatures } from "../page";

const MeetingSignatures = ({
  signatures,
  setSignatures,
}: {
  signatures: Signatures;
  setSignatures: React.Dispatch<React.SetStateAction<Signatures>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    setSignatures({ ...signatures, [key]: value });
  };

  return (
    <div className="[&>div]:flex [&>div]:flex-col [&_input]:font-alex [&_input]:text-3xl">
      <div>
        <label>Puheenjohtajan allekirjoitus</label>
        <input
          placeholder="Puheenjohtajan allekirjoitus"
          name="chairman"
          type="text"
          onChange={(e) => handleChange(e)}
          value={signatures.chairman}
        />
      </div>

      <div>
        <label>Sihteerin allekirjoitus</label>
        <input
          placeholder="Sihteerin allekirjoitus"
          name="secretary"
          type="text"
          onChange={(e) => handleChange(e)}
          value={signatures.secretary}
        />
      </div>

      <div>
        <label>Pöytäkirjantarkastajan allekirjoitus</label>
        <input
          placeholder="Pöytäkirjantarkastajan allekirjoitus"
          name="examiner1"
          type="text"
          onChange={(e) => handleChange(e)}
          value={signatures.examiner1}
        />
      </div>

      <div>
        <label>Pöytäkirjantarkastajan allekirjoitus</label>
        <input
          placeholder="Pöytäkirjantarkastajan allekirjoitus"
          name="examiner2"
          type="text"
          onChange={(e) => handleChange(e)}
          value={signatures.examiner2}
        />
      </div>
    </div>
  );
};

export default MeetingSignatures;
