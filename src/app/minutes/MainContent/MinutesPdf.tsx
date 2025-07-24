"use client";

import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { MinutesData } from "../page";

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
}: MinutesData) => {
  const date = new Date();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>{minuteNumber}</Text>
        </View>

        {/* Asukastoimikunnan kokous */}
        <View style={styles.section}>
          <Text>Asukastoimikunnan kokous</Text>
          <Text>PÄIVÄMÄÄRÄ JA KELLONAIKA:</Text>
          <Text>TIME HERE</Text>
        </View>

        <View style={styles.section}>
          <Text>LÄSNÄ (etu- ja sukunimi):</Text>{" "}
          {attendants.length > 0 ? (
            attendants.map((a: string, i: number) => <Text key={i}>{a}</Text>)
          ) : (
            <Text>_______</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default MinutePdf;
