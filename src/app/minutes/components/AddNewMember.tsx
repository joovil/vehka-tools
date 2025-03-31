"use client";

import { useRef, useState } from "react";
import { NewMember } from "../page";

const AddNewMember = ({
  newMembers,
  setNewMembers,
}: {
  label: string;
  newMembers: NewMember[];
  setNewMembers: React.Dispatch<React.SetStateAction<NewMember[]>>;
}) => {
  const focusRef = useRef<HTMLInputElement>(null);
  const [newItem, setNewItem] = useState<NewMember>({ name: "", role: "" });

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setNewMembers((prev) => [...prev, newItem]);
      setNewItem({ name: "", role: "" });
    }
  };

  const addMember = () => {
    setNewMembers((prev) => [...prev, newItem]);
    setNewItem({ name: "", role: "" });
    focusRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-sm">
      <label>Uudet jäsenet</label>
      {newMembers.map((mem, i) => (
        <NewMemberItem
          member={mem}
          i={i}
          newMembers={newMembers}
          setNewMembers={setNewMembers}
          key={i}
        />
      ))}
      <div>
        <input
          ref={focusRef}
          value={newItem.name}
          name="name"
          placeholder="Name"
          onChange={(e) =>
            setNewItem({ ...newItem, name: e.currentTarget.value })
          }
          onKeyDown={handleEnter}
        />
        <input
          value={newItem.role}
          name="role"
          placeholder="role"
          onChange={(e) =>
            setNewItem({ ...newItem, role: e.currentTarget.value })
          }
          onKeyDown={handleEnter}
        />
      </div>
      <button onClick={addMember}>Lisää jäsen</button>
    </div>
  );
};

const NewMemberItem = ({
  i,
  member,
  newMembers,
  setNewMembers,
}: {
  i: number;
  member: NewMember;
  newMembers: NewMember[];
  setNewMembers: React.Dispatch<React.SetStateAction<NewMember[]>>;
}) => {
  const updateValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.currentTarget.name as "name" | "role";
    const value = e.currentTarget.value;

    const update = [...newMembers];
    update[i][key] = value;

    setNewMembers(update);
  };

  return (
    <div>
      <div key={i}>
        <input
          value={member.name}
          name="name"
          onChange={(e) => updateValues(e)}
        />
        <input
          value={member.role}
          name="role"
          onChange={(e) => updateValues(e)}
        />
      </div>
    </div>
  );
};
export default AddNewMember;
