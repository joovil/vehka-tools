"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "./i18n/TranslationsProvider";

const MenuItems = () => {
  const dict = useTranslations();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen((b) => !b)}
        className="bg-teal-dark/10 text-teal-darker hover:bg-teal-dark/20 flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-bold shadow-sm transition-all"
      >
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▶
        </span>
        {isOpen ? dict.closeMenu : dict.openMenu}
      </button>

      <nav
        className="[&_a]:text-teal-darker mt-1 flex flex-col gap-3 overflow-hidden rounded-md bg-white/60 px-4 transition-all duration-300 ease-in-out [&_a]:underline-offset-2 [&_a:hover]:underline [&_div]:flex [&_div]:flex-col [&_div]:gap-0.5 [&_h2]:mt-2 [&_h2]:mb-0.5 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:tracking-wide [&_h2]:text-gray-500 [&_h2]:uppercase"
        style={{
          maxHeight: isOpen ? "800px" : "0",
          paddingTop: isOpen ? "12px" : "0",
          paddingBottom: isOpen ? "12px" : "0",
        }}
      >
        <div>
          <h2>Kokoukset ja tapahtumat</h2>
          <Link href={"/minutes"}>Kokouspöytäkirja</Link>
          <Link href={"/meeting-invite"}>Kokouskutsu</Link>
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
      </nav>
    </div>
  );
};

export default MenuItems;
