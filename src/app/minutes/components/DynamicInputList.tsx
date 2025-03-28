import { useRef, useState } from "react";

const DynamicInputList = ({
  label,
  buttonLabel,
  items,
  setItems,
}: {
  label: string;
  buttonLabel: string;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const focusRef = useRef<HTMLInputElement>(null);
  const [newItem, setNewItem] = useState<string>("");

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setItems((prev) => [...prev, newItem]);
      setNewItem("");
    }
  };

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const value = e.currentTarget.value;
    const updated = [...items];

    if (value.trim() === "") {
      updated.splice(i, 1);
    } else {
      updated[i] = value;
    }

    setItems(updated);
    focusRef.current?.focus();
  };

  const addItem = () => {
    setItems((prev) => [...prev, newItem]);
    setNewItem("");
    focusRef.current?.focus();
  };

  return (
    <>
      <label>{label}</label>
      {items.map((item, i) => (
        <input
          key={i}
          value={items[i]}
          onChange={(e) => handleUpdate(e, i)}
        />
      ))}
      <input
        ref={focusRef}
        value={newItem}
        onChange={(e) => setNewItem(e.currentTarget.value)}
        onKeyDown={handleEnter}
        placeholder="Lisää uusi läsnäolija"
      />
      <button onClick={addItem}>{buttonLabel}</button>
    </>
  );
};

export default DynamicInputList;
