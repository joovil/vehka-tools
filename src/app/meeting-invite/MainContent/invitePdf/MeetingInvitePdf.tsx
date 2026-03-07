"use client";

import { formatDate } from "@/app/utils/formatDate";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { MeetingInviteProps } from "../../page";
import HeaderSvg from "./HeaderSvg";

export type MeetingInvitePdfTranslations = {
  date: string;
  location: string;
  agendaFin: string;
  agendaEng: string;
  furtherInformation: string;
  moreInfo: string;
  welcome: string;
  yourCommittee: string;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  banner: {
    width: "100%",
    marginBottom: 20,
  },
  contentContainer: {
    top: 270,
    padding: "0 40px 40px 40px",
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
  header: {
    fontFamily: "Circular",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  agendaItem: {
    fontFamily: "Circular",
    fontSize: 12,
    marginBottom: 2,
  },
  columnSection: {
    flexDirection: "row",
    marginVertical: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
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
    { src: "./fonts/CircularStd-Book.woff" },
    { src: "./fonts/CircularStd-Medium.woff", fontWeight: 500 },
    { src: "./fonts/CircularStd-Bold.woff", fontWeight: "bold" },
  ],
});

const MeetingInvitePdf = ({
  data: inviteData,
  translations: tr,
}: Omit<MeetingInviteProps, "setData"> & {
  translations: MeetingInvitePdfTranslations;
}) => {
  const { date, location, agendaItems, moreInfo } = inviteData;

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        <HeaderSvg />

        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>{tr.date}</Text>
              <Text style={styles.value}>{date ? formatDate(date) : ""}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>{tr.location}</Text>
              <Text style={styles.value}>
                {location ? `${location.fin} / ${location.eng}` : ""}
              </Text>
            </View>
          </View>

          <View style={styles.columnSection}>
            <View style={styles.column}>
              <Text style={styles.header}>{tr.agendaFin}</Text>
              {agendaItems.map((item, index) => (
                <View key={index}>
                  <Text style={styles.agendaItem}>{item.fin}</Text>
                </View>
              ))}
            </View>

            <View style={styles.column}>
              <Text style={styles.header}>{tr.agendaEng}</Text>
              {agendaItems.map((item, index) => (
                <View key={index}>
                  <Text style={styles.agendaItem}>{item.eng}</Text>
                </View>
              ))}
            </View>
          </View>

          {moreInfo && (
            <View style={styles.columnSection}>
              <View style={styles.column}>
                <Text style={styles.header}>{tr.furtherInformation}</Text>
                <Text style={styles.columnText}>{moreInfo.fin}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.header}>{tr.moreInfo}</Text>
                <Text style={styles.columnText}>{moreInfo.eng}</Text>
              </View>
            </View>
          )}

          <View style={styles.footer}>
            <View style={styles.column}>
              <Text style={styles.header}>{tr.welcome}</Text>
              <Text style={styles.columnText}>{tr.yourCommittee}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.header}>Welcome</Text>
              <Text style={styles.columnText}>-Your tenant committee</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MeetingInvitePdf;
