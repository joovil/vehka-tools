const Home = async () => {
  return (
    <main className="home-page">
      <div className="">
        <h2>Asukastoimikuntaopas</h2>
        <h3>Asukastoimikuntaopas</h3>
      </div>

      {/* Kokoukset ja tapahtumat */}
      <div>
        <h2>Kokoukset ja tapahtumat</h2>
        <h3>Kokouskutsu</h3>
        <h3>Kokouspöytäkirja</h3>
        <h3>Tapahtumien osallistujalista</h3>
      </div>

      {/* Yhteistilat ja tavarat */}
      <div>
        <h2>Yhteistilat ja tavarat</h2>
        <h3>Avainlomake</h3>
        <h3>Avain- ja tilainventaario</h3>
        <h3>Tavarainventaario</h3>
      </div>

      {/* Määrärahat ja tilitykset */}
      <div>
        <h2>Määrärahat ja tilitykset</h2>
        <h3>Tilityslomake</h3>
        <h3>Asukastoimikunnan korvausvastuuhinnasto</h3>
      </div>

      {/* Alkuvuoden materiaalit */}
      <div>
        <h2>Alkuvuoden materiaalit</h2>
        <h3>Asukaskokouksen pöytäkirja</h3>
        <h3>Asukaskokoukset osallituja- ja yhteystietolomake</h3>
      </div>
    </main>
  );
};

export default Home;
