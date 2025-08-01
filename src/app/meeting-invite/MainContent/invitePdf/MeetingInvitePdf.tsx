"use client";

import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { MeetingInviteProps } from "../../page";
import { formatDate } from "@/app/utils/formatDate";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    padding: 20,
  },
  banner: {
    width: "100%",
    marginBottom: 20,
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginBottom: 10,
  },
  label: {
    fontFamily: "Circular",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    fontFamily: "Circular",
    fontSize: 12,
  },
  agendaSection: {
    marginVertical: 20,
  },
  agendaHeader: {
    fontFamily: "Circular",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  agendaItem: {
    fontFamily: "Circular",
    fontSize: 12,
    marginBottom: 5,
  },
  moreInfoSection: {
    flexDirection: "row",
    marginVertical: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  columnHeader: {
    fontFamily: "Circular",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  columnText: {
    fontFamily: "Circular",
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
});

Font.register({
  family: "Circular",
  fonts: [
    { src: "../../../../fonts/CircularStd-Book.woff" },
    { src: "../../../../fonts/CircularStd-Medium.woff", fontWeight: 500 },
    { src: "../../../../fonts/CircularStd-Bold.woff", fontWeight: "bold" },
  ],
});

const MeetingInvitePdf = ({ data: inviteData }: MeetingInviteProps) => {
  const { date, location, agendaItems, moreInfo } = inviteData;

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        {/* TODO: Add banner image once SVG support is configured */}

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Aika:</Text>
            <Text style={styles.value}>{date ? formatDate(date) : ""}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Paikka:</Text>
            <Text style={styles.value}>
              {location ? `${location.fin} / ${location.eng}` : ""}
            </Text>
          </View>
        </View>

        <View style={styles.agendaSection}>
          <Text style={styles.agendaHeader}>Esityslista / Agenda</Text>
          {agendaItems.map((item, index) => (
            <View key={index}>
              <Text style={styles.agendaItem}>{item.fin}</Text>
              <Text style={[styles.agendaItem, { marginBottom: 15 }]}>
                {item.eng}
              </Text>
            </View>
          ))}
        </View>

        {moreInfo && (
          <View style={styles.moreInfoSection}>
            <View style={styles.column}>
              <Text style={styles.columnHeader}>Lisätietoa</Text>
              <Text style={styles.columnText}>{moreInfo.fin}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.columnHeader}>More info</Text>
              <Text style={styles.columnText}>{moreInfo.eng}</Text>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.column}>
            <Text style={styles.columnHeader}>Tervetuloa</Text>
            <Text style={styles.columnText}>-Asukastoimikuntasi</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnHeader}>Welcome</Text>
            <Text style={styles.columnText}>-Your tenant committee</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MeetingInvitePdf;
