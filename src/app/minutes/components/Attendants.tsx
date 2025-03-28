"use client";

import { useRef } from "react";

const Attendants = ({
  attendants,
  setAttendants,
  newAttendant,
  setNewAttendant,
}: {
  attendants: string[];
  setAttendants: React.Dispatch<React.SetStateAction<string[]>>;
  newAttendant: string;
  setNewAttendant: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const focusRef = useRef<HTMLInputElement>(null);

  const handleAttendantEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === "Enter") {
      setAttendants((prev) => [...prev, newAttendant]);
      setNewAttendant("");
    }
  };

  const updateAttendant = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const value = e.currentTarget.value;
    const updated = [...attendants];

    if (value.trim() === "") {
      updated.splice(i, 1);
    } else {
      updated[i] = value;
    }

    setAttendants(updated);
    focusRef.current?.focus();
  };

  const addAttendant = () => {
    setAttendants((prev) => [...prev, newAttendant]);
    setNewAttendant("");
    focusRef.current?.focus();
  };

  return (
    <div>
      <label>Läsnäolijat</label>
      {attendants.map((attendant, i) => (
        <input
          key={i}
          value={attendants[i]}
          onChange={(e) => updateAttendant(e, i)}
        />
      ))}
      <input
        ref={focusRef}
        value={newAttendant}
        onChange={(e) => setNewAttendant(e.currentTarget.value)}
        onKeyDown={handleAttendantEnter}
        placeholder="Lisää uusi läsnäolija"
      />
      <button onClick={addAttendant}>Lisää läsnäolija</button>
    </div>
  );
};

export default Attendants;
