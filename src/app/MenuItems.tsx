"use client";

import Link from "next/link";
import { useState } from "react";

const MenuItems = () => {
  const [isOpen, setIsOpen] = useState<boolean>(!false);

  return (
    <div>
      <div onClick={() => setIsOpen((b) => !b)}>Avaa/sulje</div>

      <main
        className="flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out *:flex *:flex-col"
        style={{ maxHeight: isOpen ? "540px" : "0" }}
      >
        <div>
          <h2>Kokoukset ja tapahtumat</h2>
          <Link href={"/meeting-invite"}>Kokouskutsu</Link>
          <Link href={"/minutes"}>Kokouspöytäkirja</Link>
        </div>

        <div>
          <h2>Yhteistilat ja tavarat</h2>
          <Link href={"/inventory"}>Tavarainventaario</Link>
        </div>

        <div>
          <h2>Määrärahat ja tilitykset</h2>
          <Link href={"/accounting"}>Tilityslomake</Link>
        </div>

        <div>
          <h2>Alkuvuoden materiaalit</h2>
          <a href="https://hoas.fi/app/uploads/2024/01/ASUKASKOKOUSPOYTAKIRJA.pdf">
            Asukaskokouksen pöytäkirja
          </a>
          <a href="https://hoas.fi/app/uploads/2021/06/Asukaskokouksen-osallistuja-ja-yhteystietolomake-FI-EN.pdf">
            Asukaskokoukset osallituja- ja yhteystietolomake
          </a>
        </div>

        <div>
          <h2>Dokumentit</h2>
          <a href="https://hoas.fi/app/uploads/2024/01/Asukastoimintaopas.pdf">
            Asukastoimikuntaopas
          </a>
          <a href="https://hoas.fi/app/uploads/2021/06/Tapahtumien-osallistujalista-FI-EN.pdf">
            Tapahtumien osallistujalista
          </a>
          <a href="https://hoas.fi/app/uploads/2024/01/Asukastoimikuntien-avainlainalomake-2.pdf">
            Avainlomake
          </a>
          <a href="https://hoas.fi/app/uploads/2021/06/Asukastoimikunnan-korvausvastuuhinnasto-FI-EN.pdf">
            Asukastoimikunnan korvausvastuuhinnasto
          </a>
        </div>
      </main>
    </div>
  );
};

export default MenuItems;
