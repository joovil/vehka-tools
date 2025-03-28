"use client";

import { useState } from "react";
import DynamicInputList from "./DynamicInputList";

const MinuteItems = () => {
  const [items, setItems] = useState<string[]>([]);
  const [other, setOther] = useState<string[]>([]);

  return (
    <div className="flex flex-col">
      <label>Hankinnat</label>
      <DynamicInputList
        label="Hankinnat"
        buttonLabel="Lisää hankinta"
        items={items}
        setItems={setItems}
      />
      <label>Muut päätettävät asiat</label>
      <DynamicInputList
        label="Muut"
        buttonLabel="Lisää muu asia"
        items={other}
        setItems={setOther}
      />
      {/* <Reorder.Group
        values={items}
        onReorder={setItems}
      >
        <Reorder.Item value={"asd"}></Reorder.Item>
      </Reorder.Group> */}
      {/* <label>Muut päätettävät asiat</label>
      <input type="text" /> */}
    </div>
  );
};

export default MinuteItems;
