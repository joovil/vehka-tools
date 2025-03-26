"use client";

import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    margin: 50,
    fontSize: 11,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  header: {
    fontSize: 11,
  },
  section: {
    display: "flex",
    gap: 5,
  },
});

const MinutePdf = () => {
  const date = new Date();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Helsingin seudun opiskelija-asuntosäätiö</Text>
          <Text>Pöytäkirja _/{date.getFullYear()}</Text>
        </View>

        {/* Asukastoimikunnan kokous */}
        <View style={styles.section}>
          <Text>Asukastoimikunnan kokous</Text>
          <Text>PÄIVÄMÄÄRÄ JA KELLONAIKA:</Text>
          <Text>
            {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            PAIKKA (kiinteistön osoite ja kokouspaikan tarkka sijainti):
          </Text>
          <Text>_____________</Text>
        </View>

        <View style={styles.section}>
          <Text>LÄSNÄ (etu- ja sukunimi):</Text>
          <Text>______________</Text>
        </View>

        <View style={styles.section}>
          <Text>
            1. KOKOUKSEN AVAUS, KOKOUKSEN LAILLISUUS JA PÄÄTÖSVALTAISUUS
          </Text>
          <Text>
            Puheenjohtaja avasi kokouksen kello _________________________
          </Text>
          <Text>
            Todettiin kokous laillisesti koolle kutsutuksi ja päätösvaltaiseksi.
          </Text>
        </View>

        <View style={styles.section}>
          <Text>2. KAHDEN PÖYTÄKIRJANTARKASTAJAN VALINTA</Text>
          <Text>Valittiin __________________</Text>
        </View>

        <View style={styles.section}>
          <Text>3. ESITYSLISTAN HYVÄKSYMINEN</Text>
          <Text>Esityslista hyväksyttiin kokouksen työjärjestykseksi.</Text>
        </View>

        <View style={styles.section}>
          <Text>4. HANKINNAT / TALKOOT / MUITA PÄÄTETTÄVIÄ ASIOITA</Text>
          <Text>_______________</Text>
        </View>

        <View style={styles.section}>
          <Text>5. MUUT MAHDOLLISET ASIAT</Text>
          <Text>_________</Text>
        </View>

        <View style={styles.section}>
          <Text>
            UUDET JÄSENET (etu- ja sukunimi sekä mahdollinen rooli
            toimikunnassa):
          </Text>
          <Text>_______________</Text>
        </View>

        <View style={styles.section}>
          <Text>6. SEURAAVAN KOKOUKSEN AJANKOHTA</Text>
          <Text>
            Seuraava kokous pidetään ______________________________________
          </Text>
        </View>

        <View style={styles.section}>
          <Text>7. KOKOUKSEN PÄÄTTÄMINEN</Text>
          <Text>
            Puheenjohtaja päätti kokouksen kello ______________________________
          </Text>
        </View>

        <View style={styles.section}>
          <Text>VAKUUDEKSI</Text>
          <View>
            <View>
              <Text>________</Text>
              <Text>puheenjohtajan allekirjoitus</Text>
            </View>

            <View>
              <Text>_______</Text>
              <Text>sihteerin allekirjoitus</Text>
            </View>
          </View>

          <View>
            <View>
              <Text>________</Text>
              <Text>puheenjohtajan allekirjoitus</Text>
            </View>

            <View>
              <Text>_______</Text>
              <Text>sihteerin allekirjoitus</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinutePdf;
