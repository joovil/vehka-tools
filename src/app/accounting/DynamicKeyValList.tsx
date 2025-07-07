"use client";

import { ChangeEvent, useState } from "react";

interface NamePrice {
  name: string;
  price: number;
}

const DynamicKeyValList = () => {
  const [items, setItems] = useState<NamePrice[]>([]);
  const [newItem, setNewItem] = useState<NamePrice>({ name: "", price: 0 });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const key = e.currentTarget.name;

    if (!key || !val) return;

    setNewItem((prev) => ({ ...prev, [key]: val }));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setItems((prev) => [...prev, newItem]);
      setNewItem({ name: "", price: 0 });
      focusRef.current?.focus();
    }
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const key = e.currentTarget.name;
    const val = e.currentTarget.value;

    const updated = [...items];
    const update: NamePrice = { ...items[i], [key]: val };

    updated[i] = update;

    setItems(updated);
  };

  return (
    <div>
      <></>
    </div>
  );
};

export default DynamicKeyValList;
