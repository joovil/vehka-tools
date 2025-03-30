"use client";

import { useState } from "react";
import { NewMember } from "../page";

const AddNewMember = ({
  label,
  buttonLabel,
  newMembers,
  setNewMembers,
}: {
  label: string;
  buttonLabel: string;
  newMembers: NewMember[];
  setNewMembers: React.Dispatch<React.SetStateAction<NewMember[]>>;
}) => {
  const [newItem, setNewItem] = useState<NewMember>({ name: "", role: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNewMembers([...newMembers, { name: newItem.name, role: newItem.role }]);
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      {newMembers.map((mem, i) =>
        !!mem.name && !!mem.role ? (
          <NewMemberItem
            member={mem}
            i={i}
            newMembers={newMembers}
            setNewMembers={setNewMembers}
            key={i}
          />
        ) : null
      )}

      <form
        className="flex flex-col gap-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label>asd</label>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={(e) =>
              setNewItem({ ...newItem, name: e.currentTarget.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label>asd</label>
          <input
            type="text"
            name="role"
            value={newItem.role}
            onChange={(e) =>
              setNewItem({ ...newItem, role: e.currentTarget.value })
            }
          />
        </div>

        <button
          disabled={!newItem}
          className="mt-2"
        >
          {buttonLabel}
        </button>
      </form>
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
  const updateValues = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const key = e.currentTarget.name as "name" | "role";
    const update = [...newMembers];
    update[i][key] = e.currentTarget.value;
    setNewMembers(update);
  };

  return (
    <div>
      <input
        value={member.name}
        name="name"
        onChange={(e) => updateValues(e, i)}
      />
      <input
        value={member.role}
        name="role"
        onChange={(e) => updateValues(e, i)}
      />
    </div>
  );
};
export default AddNewMember;
