const Home = async () => {
  return (
    <main className="home-page">
      <div>
        <h2>Asukastoimikuntaopas</h2>
        <a href="https://hoas.fi/app/uploads/2024/01/Asukastoimintaopas.pdf">
          Asukastoimikuntaopas
        </a>
      </div>

      {/* Kokoukset ja tapahtumat */}
      <div>
        <h2>Kokoukset ja tapahtumat</h2>
        <a href="https://hoas.fi/app/uploads/2021/06/Asukastoimikunnan-kokouskutsu-FI-EN.pdf">
          Kokouskutsu
        </a>
        <a href="https://hoas.fi/app/uploads/2024/01/Asukastoimikuntien-kokouspoytakirja-FIN.pdf">
          Kokouspöytäkirja
        </a>
        <a href="https://hoas.fi/app/uploads/2021/06/Tapahtumien-osallistujalista-FI-EN.pdf">
          Tapahtumien osallistujalista
        </a>
      </div>

      {/* Yhteistilat ja tavarat */}
      <div>
        <h2>Yhteistilat ja tavarat</h2>
        <a href="https://hoas.fi/app/uploads/2024/01/Asukastoimikuntien-avainlainalomake-2.pdf">
          Avainlomake
        </a>
        <a href="https://hoas.fi/app/uploads/2024/11/Tavarainventaario-FI-EN.xlsx">
          Tavarainventaario
        </a>
        <a href="https://hoas.fi/app/uploads/2021/06/Avain-ja-tilainventaario-FI-EN.pdf">
          Avain- ja tilainventaario
        </a>
      </div>

      {/* Määrärahat ja tilitykset */}
      <div>
        <h2>Määrärahat ja tilitykset</h2>
        <a href="https://hoas.fi/app/uploads/2021/06/Tilityslomake-FI.pdf">
          Tilityslomake
        </a>
        <a href="https://hoas.fi/app/uploads/2021/06/Asukastoimikunnan-korvausvastuuhinnasto-FI-EN.pdf">
          Asukastoimikunnan korvausvastuuhinnasto
        </a>
      </div>

      {/* Alkuvuoden materiaalit */}
      <div>
        <h2>Alkuvuoden materiaalit</h2>
        <a href="https://hoas.fi/app/uploads/2024/01/ASUKASKOKOUSPOYTAKIRJA.pdf">
          Asukaskokouksen pöytäkirja
        </a>
        <a href="https://hoas.fi/app/uploads/2021/06/Asukaskokouksen-osallistuja-ja-yhteystietolomake-FI-EN.pdf">
          Asukaskokoukset osallituja- ja yhteystietolomake
        </a>
      </div>
    </main>
  );
};

export default Home;
