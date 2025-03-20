"use client";

import {
  Document,
  Ellipse,
  Font,
  Page,
  Path,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { AgendaItem } from "./page";

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

const InvitePdf = ({ agenda }: { agenda: AgendaItem[] }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Svg style={{ position: "absolute" }}>
          <Rect
            y="-6"
            width="595"
            height="281"
            fill="#E83C6A"
          />

          <Ellipse
            cx="297.5"
            cy="441.5"
            rx="564.5"
            ry="198.5"
            fill="white"
          />
          <Path
            d="M379.345 140.488L376.309 132.151H361.488L358.451 140.488H350.938L364.936 104H373.17L387.065 140.488H379.345ZM368.898 111.874L363.855 125.666H373.942L368.898 111.874Z"
            fill="white"
          />
          <Path
            d="M336.618 140.488L326.017 125.357L321.488 130.349V140.488H314.386V104H321.488V120.52L336.103 104H345.418L330.957 119.902L345.521 140.488H336.618Z"
            fill="white"
          />
          <Path
            d="M306.75 140.488H299.596V125.357H283.694V140.488H276.592V104H283.694V118.667H299.596V104H306.75V140.488Z"
            fill="white"
          />
          <Path
            d="M268.885 140.488H246.035V104H268.885V110.69H253.137V119.027H267.393V125.357H253.137V133.798H268.885V140.488Z"
            fill="white"
          />
          <Path
            d="M224.292 131.121L233.813 104H241.326L227.791 140.488H220.483L207 104H214.771L224.292 131.121Z"
            fill="white"
          />
          <Path
            d="M163 64V180H433V64H163ZM421.177 168.773H174.823V75.2267H421.177V168.773Z"
            fill="white"
          />
        </Svg>
        <View style={{ top: 270 }}>
          <View style={styles.info}>
            <View style={{ textAlign: "left" }}>
              <View style={{ marginBottom: 4 }}>
                <Text style={styles.midHeader}>Asukastoimikunnan kokous</Text>
                <Text style={styles.midHeader}>Tenant committee meeting</Text>
              </View>

              <Text style={styles.infoText}>Aika / Time: 10:00</Text>
              <Text style={styles.infoText}>Paikka / Place: Kerhohuone</Text>
            </View>
          </View>
          {/* Esityslista / Agenda */}
          <View style={styles.wrapper}>
            {agenda && (
              <>
                <AgendaColumn
                  items={agenda}
                  lang="fin"
                />
                <AgendaColumn
                  items={agenda}
                  lang="eng"
                />
              </>
            )}
          </View>
          {/* Lisätietoja / Further information */}
          <View style={styles.wrapper}>
            <InfoColumn
              header="Lisätietoja"
              text="Lisätietoja kokouksesta"
            />
            <InfoColumn
              header="Further information"
              text="More information about the meeting"
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
  lang,
}: {
  items: AgendaItem[];
  lang: "fin" | "eng";
}) => {
  const endItems: AgendaItem[] = [
    { fin: "Seuraavan kokouksen ajankohta", eng: "The next meeting" },
    { fin: "Kokouksen päättäminen", eng: "Closing the meeting" },
  ];

  return (
    <View style={styles.column}>
      <Text style={styles.header}>Esityslista</Text>
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
      <Text style={{ ...styles.header, color: "#E83C6A" }}>{header}!</Text>
      <Text>{text}</Text>
    </View>
  );
};

export default InvitePdf;
