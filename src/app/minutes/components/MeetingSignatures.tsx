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
    <div className="[&_input]:font-alex [&_input]:text-3xl [&>div]:flex [&>div]:flex-col">
      <div>
        <label>Puheenjohtajan allekirjoitus</label>
        <input
          placeholder="Puheenjohtajan allekirjoitus"
          name="chairman"
          type="text"
          onChange={(e) => handleChange(e)}
          value={signatures.chairman}
          required
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
          required
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
          required
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
          required
        />
      </div>
    </div>
  );
};

export default MeetingSignatures;
