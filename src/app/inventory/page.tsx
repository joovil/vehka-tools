"use client";

import { Fragment, useRef, useState } from "react";

interface InventoryItem {
  name: string;
  amount: number;
}

const Inventory = () => {
  const focusRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<InventoryItem[]>([
    {
      name: "",
      amount: 0,
    },
  ]);

  const addItem = () => {
    // Reset first item and shift rest by 1
    if (!items[0].name) return;

    const update = [...items];
    update.unshift({ name: "", amount: 0 });

    setItems(update);
    focusRef.current?.focus();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (!items[i].name) return;

    if (e.key === "Enter") {
      addItem();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const key = e.currentTarget.name as "name" | "amount";
    const value =
      key === "amount"
        ? parseInt(e.currentTarget.value, 10) || 0
        : e.currentTarget.value;

    const update = [...items];
    update[i] = { ...update[i], [key]: value };
    setItems(update);
  };

  return (
    <section>
      <h2>Tavarainventaario</h2>
      <div className="grid grid-cols-2">
        <h3>Nimi</h3>
        <h3>Määrä</h3>

        {items.map((item, i) => (
          <Fragment key={i}>
            <input
              ref={i === 0 ? focusRef : null}
              name="name"
              value={item.name}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleEnter(e, i)}
            />
            <input
              name="amount"
              value={item.amount}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleEnter(e, i)}
            />
          </Fragment>
        ))}
      </div>

      <button onClick={addItem}>Lisää</button>
    </section>
  );
};

export default Inventory;
