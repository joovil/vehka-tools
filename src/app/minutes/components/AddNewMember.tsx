"use client";

import { useRef, useState } from "react";
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
  const focusRef = useRef<HTMLInputElement>(null);
  const [newItem, setNewItem] = useState<NewMember>({ name: "", role: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNewMembers([...newMembers, { name: newItem.name, role: newItem.role }]);
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      {newMembers.map((mem) => (
        <NewMemberItem
          newMember={mem}
          setNewItem={setNewItem}
          key={mem.name}
        />
      ))}

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
  newMember,
  setNewItem,
}: {
  newMember: NewMember;
  setNewItem: React.Dispatch<React.SetStateAction<NewMember>>;
}) => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div key={newMember.name}>
      {!edit ? (
        <div onClick={() => setEdit((b) => !b)}>
          {newMember.name} {newMember.role}
        </div>
      ) : (
        <>
          <input
            value={newMember.name}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, name: e.currentTarget.value }))
            }
          />
          <input
            value={newMember.role}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, role: e.currentTarget.value }))
            }
          />
        </>
      )}
    </div>
  );
};
export default AddNewMember;
