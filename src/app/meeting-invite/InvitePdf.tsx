"use client";

import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useState } from "react";
import { AgendaItem } from "./page";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
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
    margin: 10,
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

Font.register({
  family: "Circular",
  fonts: [
    { src: "../../fonts/CircularStd-Medium.woff" },
    // { src: "../../fonts/CircularStd-bold.woff" },
  ],
});

const InvitePdf = ({ agenda }: { agenda: AgendaItem[] }) => {
  // Set agenda to items to prevent rendering failure
  const [items] = useState(agenda);

  return (
    <Document>
      <Page>
        <View>
          {/* Left */}
          <View style={styles.wrapper}>
            {/* Esityslista */}
            <View style={styles.column}>
              <Text style={styles.header}>Esityslista</Text>
              {items.map((item, i) => (
                <Text
                  style={{ fontSize: 12 }}
                  key={item.fin}
                >
                  {i}. {item.fin}
                </Text>
              ))}

              {/* Lisätietoja */}
              <Text style={styles.header}>Lisätietoja</Text>
              <Text style={{ fontSize: 12 }}>Lisää tietoa kokouksesta</Text>

              {/* Tervetuloa */}
              <Text style={styles.header}>Tervetuloa</Text>
            </View>

            {/* Agenda */}
            <View style={styles.column}>
              <Text style={styles.header}>Agenda</Text>
              {items.map((item, i) => (
                <Text
                  style={{ fontSize: 12 }}
                  key={item.eng}
                >
                  {i}. {item.eng}
                </Text>
              ))}

              {/* Further information */}
              <Text style={styles.header}>Further information</Text>
              <Text style={{ fontSize: 12 }}>
                More information about the meeting
              </Text>

              {/* Welcome */}
              <Text style={styles.header}>Welcome</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvitePdf;
