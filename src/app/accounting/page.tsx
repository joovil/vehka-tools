"use client";

import React, { ChangeEvent, useRef, useState } from "react";

interface Acquisition {
  name: string;
  price: number;
}

const Accounting = () => {
  const [newPurchase, setNewPurchase] = useState<Acquisition>({
    name: "",
    price: 0,
  });
  const [purchases, setPurchases] = useState<Acquisition[]>([]);
  const focusRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const key = e.currentTarget.name;

    if (!key || !val) return;

    setNewPurchase((prev) => ({ ...prev, [key]: val }));
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPurchases((prev) => [...prev, newPurchase]);
      setNewPurchase({ name: "", price: 0 });
      focusRef.current?.focus();
    }
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const key = e.currentTarget.name;
    const val = e.currentTarget.value;

    const updated = [...purchases];
    const update: Acquisition = { ...purchases[i], [key]: val };

    updated[i] = update;

    setPurchases(updated);
  };

  return (
    <div className="gap-lg bg-pin flex flex-col">
      <h1>Tilityslomake</h1>

      <div className="flex flex-col gap-1 [&_input]:w-full [&>div]:flex">
        <h2>Tilityslomake</h2>

        <div className="flex">
          <label>Nimi</label>
          <input
            className="w-full"
            type="text"
          />
        </div>

        <div>
          <label>Osoite</label>
          <input type="text" />
        </div>

        <div>
          <div className="flex w-full">
            <label>IBAN</label>
            <input
              className="w-full"
              type="text"
            />
          </div>

          <div className="flex w-full">
            <label>BIC/SWIFT</label>
            <input
              className="w-full"
              type="text"
            />
          </div>
        </div>

        <div>
          <label className="text-nowrap">Tehtävä toimikunnassa</label>
          <input type="text" />
        </div>

        <div>
          <label>Pöytäkirjanumero</label>
          <input type="text" />
        </div>
      </div>

      {/* TILILAJI INFO */}
      <div className="text-sm">
        <div>
          Tililaji 701: hankinnat, sisustus, harrastusvälineet,
          toimistotarvikkeet, lehtitilaukset, pelit, puhelinkulut yms.
        </div>
        <div></div>
        Tililaji 704: virkistys, talkoo- ja kokoustarjoilut, juhlakulut,
        peli-illat, palkinnot, uima- ja teatteriliput yms.
        <div>Tililaji 707: kaikki alkoholit</div>
      </div>

      {/* TEST */}
      {/* <DynamicKeyValList<Acquisition> /> */}
      {/* TEST */}

      {/* TILILAJI GRID */}
      <div>
        <div className="grid grid-cols-[1fr_3fr_1fr] gap-[1px] bg-white">
          <div className="bg-pink-vehka pl-2 text-white">TILILAJI</div>
          <div className="bg-pink-vehka pl-2 text-white">
            HANKINNAT KUITTIEN MUKAAN
          </div>
          <div className="bg-pink-vehka flex justify-center text-white">€</div>
        </div>

        <div className="grid grid-cols-[1fr_3fr_1fr] gap-[1px] border-x-1 border-b-1 bg-black [&>div]:bg-white [&>div]:pl-1 [&>input]:w-full">
          {/* New item */}
          <div>701 hankinnat</div>
          <input
            ref={focusRef}
            type="text"
            name="name"
            value={newPurchase.name}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleEnter(e)}
          />
          <input
            type="number"
            name="price"
            value={newPurchase.price}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleEnter(e)}
          />

          {/* Edit item */}
          {purchases.map((p, i) => (
            <React.Fragment key={i}>
              <div>701 hankinnat</div>
              <input
                type="text"
                name="name"
                value={purchases[i].name}
                onChange={(e) => handleUpdate(e, i)}
              />
              <input
                type="number"
                name="price"
                value={purchases[i].price}
                onChange={(e) => handleUpdate(e, i)}
              />
            </React.Fragment>
          ))}

          {/* <div>704 virkistys</div>
          <input type="text" />
          <input type="number" />

          <div>707 alkoholi</div>
          <input type="text" />
          <input type="number" />

          <div>Epäselvät</div>
          <input type="text" />
          <input type="number" /> */}
        </div>
      </div>
    </div>
  );
};

export default Accounting;
