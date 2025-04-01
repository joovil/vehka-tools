"use client";

import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { PreviewProps } from "../Preview";

Font.register({
  family: "Alex Brush",
  src: "https://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EtUL57DtOmCc.ttf",
  fontWeight: 400,
});

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
  signature: {
    fontFamily: "Alex Brush",
    fontSize: 20,
    textDecoration: "underline",
  },
});

const MinutePdf = ({
  minuteNumber,
  location,
  attendants,
  items,
  other,
  startTime,
  examiners,
  newMembers,
  nextMeeting,
  meetingEnd,
  signatures = {
    chairman: "chairman",
    secretary: "secretary",
    examiner1: "examiner1",
    examiner2: "examiner2",
  },
}: PreviewProps) => {
  const date = new Date();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Helsingin seudun opiskelija-asuntosäätiö</Text>
          <Text>
            Pöytäkirja {minuteNumber || "_"}/{date.getFullYear()}
          </Text>
        </View>

        {/* Asukastoimikunnan kokous */}
        <View style={styles.section}>
          <Text>Asukastoimikunnan kokous</Text>
          <Text>PÄIVÄMÄÄRÄ JA KELLONAIKA:</Text>
          {Object.values(startTime).includes("") ? (
            "_______"
          ) : (
            <>
              <Text>{startTime.date}</Text>
              <Text>kello: {startTime.time}</Text>
            </>
          )}{" "}
        </View>

        <View style={styles.section}>
          <Text>
            PAIKKA (kiinteistön osoite ja kokouspaikan tarkka sijainti):
          </Text>
          <Text>
            {Object.values(location).includes("")
              ? "_______"
              : `${location.address}, ${location.precise}`}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>LÄSNÄ (etu- ja sukunimi):</Text>{" "}
          {attendants.length > 0 ? (
            attendants.map((a: string, i: number) => <Text key={i}>{a}</Text>)
          ) : (
            <Text>_______</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text>
            1. KOKOUKSEN AVAUS, KOKOUKSEN LAILLISUUS JA PÄÄTÖSVALTAISUUS
          </Text>
          <Text>
            Puheenjohtaja avasi kokouksen kello{" "}
            {startTime.time || "_________________________"}
          </Text>
          <Text>
            Todettiin kokous laillisesti koolle kutsutuksi ja päätösvaltaiseksi.
          </Text>
        </View>

        <View style={styles.section}>
          <Text>2. KAHDEN PÖYTÄKIRJANTARKASTAJAN VALINTA</Text>
          <Text>
            Valittiin: {examiners.examiner1 || "_______"} ja{" "}
            {examiners.examiner2 || "_______"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>3. ESITYSLISTAN HYVÄKSYMINEN</Text>
          <Text>Esityslista hyväksyttiin kokouksen työjärjestykseksi.</Text>
        </View>

        <View style={styles.section}>
          <Text>4. HANKINNAT / TALKOOT / MUITA PÄÄTETTÄVIÄ ASIOITA</Text>
          {items.length > 0 ? (
            items.map((item: string, i: number) => <Text key={i}>{item}</Text>)
          ) : (
            <Text>_______</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text>5. MUUT MAHDOLLISET ASIAT</Text>
          {other.length > 0 ? (
            other.map((o: string, i: number) => <Text key={i}>{o}</Text>)
          ) : (
            <Text>_______</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text>
            UUDET JÄSENET (etu- ja sukunimi sekä mahdollinen rooli
            toimikunnassa):
          </Text>
          {newMembers.length > 0 ? (
            newMembers.map((mem, i) => (
              <Text key={i}>
                {mem.name} {mem.role}
              </Text>
            ))
          ) : (
            <Text>_______</Text>
          )}
        </View>

        <View
          style={styles.section}
          break
        >
          <Text>6. SEURAAVAN KOKOUKSEN AJANKOHTA</Text>
          <Text>Seuraava kokous pidetään</Text>
          {Object.values(nextMeeting).includes("") ? (
            "_______"
          ) : (
            <>
              <Text>{nextMeeting.date}</Text>
              <Text>kello: {nextMeeting.time}</Text>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text>7. KOKOUKSEN PÄÄTTÄMINEN</Text>
          <Text>Puheenjohtaja päätti kokouksen kello</Text>
          {Object.values(meetingEnd).includes("") ? (
            "_______"
          ) : (
            <>
              <Text>{meetingEnd.date}</Text>
              <Text>kello: {meetingEnd.time}</Text>
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text>VAKUUDEKSI</Text>
          <View>
            <Text style={styles.signature}>
              {signatures.chairman || "________"}
            </Text>
            <Text>puheenjohtajan allekirjoitus</Text>
          </View>

          <View>
            <Text style={styles.signature}>
              {signatures.examiner1 || "_______"}
            </Text>
            <Text>pöytäkirjantarkastajan allekirjoitus</Text>
          </View>

          <View>
            <Text style={styles.signature}>
              {signatures.secretary || "_______"}
            </Text>
            <Text>sihteerin allekirjoitus</Text>
          </View>

          <View>
            <Text style={styles.signature}>
              {signatures.examiner2 || "_______"}
            </Text>
            <Text>pöytäkirjantarkastajan allekirjoitus</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinutePdf;
