"use client";

import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { AgendaItem, DateTime, MoreInfo, Place } from "../page";
import HeaderSvg from "./HeaderSvg";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  parent: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    flex: 1,
    fontSize: 12,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  midHeader: {
    fontWeight: "bold",
    fontSize: 16,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  infoText: {
    marginBottom: 2,
    fontSize: 12,
  },
});

Font.register({
  family: "Circular",
  fonts: [{ src: "../../fonts/CircularStd-Medium.woff" }],
});

const InvitePdf = ({
  dateTime,
  location,
  agenda,
  moreInfo,
  endItems,
}: {
  dateTime: DateTime;
  location: Place;
  agenda: AgendaItem[];
  moreInfo: MoreInfo;
  endItems: AgendaItem[];
}) => {
  return (
    <Document title="Kokouskutsu">
      <Page style={styles.page}>
        <HeaderSvg />

        <View style={{ top: 270 }}>
          <View style={styles.info}>
            <View style={{ textAlign: "left" }}>
              <View style={{ marginBottom: 4 }}>
                <Text style={styles.midHeader}>Asukastoimikunnan kokous</Text>
                <Text style={styles.midHeader}>Tenant committee meeting</Text>
              </View>

              <Text style={styles.infoText}>
                Aika / Time: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {dateTime.date} {dateTime.time}
              </Text>
              <Text style={styles.infoText}>
                Paikka / Place: &nbsp;{location.paikka} | {location.place}
              </Text>
            </View>
          </View>
          {/* Esityslista / Agenda */}
          <View style={styles.wrapper}>
            {agenda && (
              <>
                <AgendaColumn
                  items={agenda}
                  endItems={endItems}
                  lang="fin"
                />
                <AgendaColumn
                  items={agenda}
                  endItems={endItems}
                  lang="eng"
                />
              </>
            )}
          </View>
          {/* Lisätietoja / Further information */}
          <View style={styles.wrapper}>
            <InfoColumn
              header="Lisätietoja"
              text={moreInfo.tietoja || "Lisätietoja kokouksesta"}
            />
            <InfoColumn
              header="Further information"
              text={moreInfo.info || "More information about the meeting"}
            />
          </View>
          {/* Tervetuloa / Welcome */}
          <View style={styles.wrapper}>
            <WelcomeColumn
              header="Tervetuloa!"
              text="-Asukastoimikuntasi"
            />
            <WelcomeColumn
              header="Welcome!"
              text="-Your tenant committee"
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

const AgendaColumn = ({
  items,
  endItems,
  lang,
}: {
  items: AgendaItem[];
  endItems: AgendaItem[];
  lang: "fin" | "eng";
}) => {
  return (
    <View style={styles.column}>
      <Text style={styles.header}>
        {lang === "fin" ? "Esityslista" : "Agenda"}
      </Text>
      {items.map((item, i) => (
        <Text
          key={item[lang]}
          style={{ marginBottom: 3 }}
        >{`${i + 1}. ${item[lang]}`}</Text>
      ))}
      {endItems.map((item, i) => (
        <Text
          key={item[lang]}
          style={{ marginBottom: 3 }}
        >{`${i + items.length + 1}. ${item[lang]}`}</Text>
      ))}
    </View>
  );
};

const InfoColumn = ({ header, text }: { header: string; text: string }) => {
  return (
    <View style={styles.column}>
      <Text style={styles.header}>{header}</Text>
      <Text>{text}</Text>
    </View>
  );
};

const WelcomeColumn = ({ header, text }: { header: string; text: string }) => {
  return (
    <View style={styles.column}>
      <Text style={{ ...styles.header, color: "#E83C6A" }}>{header}</Text>
      <Text>{text}</Text>
    </View>
  );
};

export default InvitePdf;
