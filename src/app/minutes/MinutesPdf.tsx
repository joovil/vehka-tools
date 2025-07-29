"use client";

import { Document, Font, Page, Text, View } from "@react-pdf/renderer";
import { formatDate } from "../utils/formatDate";
import { MinutesData } from "./page";

type MinutesPdfProps = {
  data: MinutesData;
};

Font.register({
  family: "Alex Brush",
  src: "https://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EtUL57DtOmCc.ttf",
  fontWeight: 400,
});

const MinutesPdf = ({ data }: MinutesPdfProps) => {
  const {
    location = { fin: "_", eng: "_" },
    attendants,
    meetingItems,
    otherItems,
    signatures,
    examiners,
    newMembers,
    nextMeeting,
    minutesNumber = "_",
    startTime,
    endTime,
    timeOfMeeting,
  } = data;

  return (
    <Document>
      <Page
        size="A4"
        style={{ padding: 40, fontSize: 12, fontFamily: "Helvetica" }}
      >
        <View style={{ gap: 16 }}>
          <View>
            <Text>Helsingin seudeun opiskelija-asuntosäätiö</Text>
            <Text>
              Pöytäkirja {minutesNumber}/{new Date().getFullYear()}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Asukastoimikunnan kokous
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Päivämäärä ja kellonaika
            </Text>
            <Text>{formatDate(timeOfMeeting)}</Text>
            <Text>
              {location.fin} / {location.eng}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Läsnä</Text>
            {attendants.map((att, index) => (
              <Text key={index}>{att}</Text>
            ))}
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              1. Kokouksen avaus, laillisuus ja päätösvaltaisuus
            </Text>
            <Text>
              Puheenjohtaja avasi kokouksen kello: {formatDate(startTime)}
            </Text>
            <Text>
              Todettiin kokous laillisesti koolle kutsutuksi ja
              päätösvaltaiseksi.
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              2. Kahden Pöytäkirjantarkastajan valinta
            </Text>
            <Text>
              Valittiin:{" "}
              <Text style={{ textDecoration: "underline" }}>
                {examiners.examiner1}
              </Text>
              {" / "}
              <Text style={{ textDecoration: "underline" }}>
                {examiners.examiner2}
              </Text>
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              3. Esityslistan hyväksyminen
            </Text>
            <Text>Esityslista hyväksyttiin kokouksen työjärjestykseksi.</Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              4. Hankinnat/ talkoot/ muita päätettäviä asioita
            </Text>
            <View style={{ flexDirection: "row", gap: 20, marginTop: 8 }}>
              <View style={{ flex: 1 }}>
                {meetingItems.map((item, index) => (
                  <Text key={`fin-${index}`}>{item.fin}</Text>
                ))}
              </View>
              <View style={{ flex: 1 }}>
                {meetingItems.map((item, index) => (
                  <Text key={`eng-${index}`}>{item.eng}</Text>
                ))}
              </View>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              5. Muut mahdolliset asiat
            </Text>
            <View style={{ flexDirection: "row", gap: 20, marginTop: 8 }}>
              <View style={{ flex: 1 }}>
                {otherItems.map((item, index) => (
                  <Text key={`fin-${index}`}>{item.fin}</Text>
                ))}
              </View>
              <View style={{ flex: 1 }}>
                {otherItems.map((item, index) => (
                  <Text key={`eng-${index}`}>{item.eng}</Text>
                ))}
              </View>
            </View>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Uudet jäsenet
            </Text>
            {newMembers?.map((newMember, index) => (
              <Text key={index}>{newMember}</Text>
            ))}
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              6. Seuraavan kokouksen ajankohta
            </Text>
            <Text>Seuraava kokous pidetään: {formatDate(nextMeeting)}</Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              7. Kokouksen päättäminen
            </Text>
            <Text>
              Puheenjohtaja päätti kokouksen kello:{" "}
              {formatDate(endTime).split(" ")[1]}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Vakuudeksi</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 20,
                marginTop: 40,
              }}
            >
              {Object.entries(signatures).map(([key, value], index) => (
                <View
                  key={index}
                  style={{ width: "45%" }}
                >
                  <Text
                    style={{
                      borderBottom: 1,
                      fontFamily: "Alex Brush",
                      fontSize: 20,
                    }}
                  >
                    {value}
                  </Text>
                  <Text>{key} allekirjoitus</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinutesPdf;
