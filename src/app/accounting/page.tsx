"use client";

const Accounting = () => {
  return (
    <div className="flex flex-col gap-lg bg-pin">
      <h1>Tilityslomake</h1>

      <div className="flex flex-col gap-1 [&>div]:flex [&_input]:w-full">
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

      {/* TILILAJI GRID */}
      <div>
        <div className="grid grid-cols-[1fr_4fr_1fr] gap-[1px] bg-white">
          <div className="bg-pink-vehka text-white pl-2">TILILAJI</div>
          <div className="bg-pink-vehka text-white pl-2">
            HANKINNAT KUITTIEN MUKAAN
          </div>
          <div className="bg-pink-vehka text-white flex justify-center">€</div>
        </div>

        <div className="grid grid-cols-[1fr_4fr_1fr] gap-[1px] bg-black [&>div]:bg-white [&>div]:pl-1 border-x-1 border-b-1">
          <div>TEST</div>
          <div>TEST</div>
          <div>TEST</div>

          <div>TEST</div>
          <div>TEST</div>
          <div>TEST</div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
