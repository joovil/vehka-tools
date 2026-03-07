"use client";

import { Document, Font, Page, Text, View } from "@react-pdf/renderer";
import { formatDate } from "../utils/formatDate";
import { MinutesData } from "./page";

export type MinutesPdfTranslations = {
  organization: string;
  minutesLabel: string;
  meetingTitle: string;
  dateAndTime: string;
  present: string;
  section1: string;
  chairmanOpenedAt: string;
  meetingDeclaredLegal: string;
  section2: string;
  elected: string;
  section3: string;
  agendaApproved: string;
  section4: string;
  section5: string;
  newMembers: string;
  section6: string;
  nextMeetingHeldAt: string;
  section7: string;
  chairmanClosedAt: string;
  certification: string;
  signatureSuffix: string;
};

type MinutesPdfProps = {
  data: MinutesData;
  translations: MinutesPdfTranslations;
};

Font.register({
  family: "Alex Brush",
  src: "https://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EtUL57DtOmCc.ttf",
  fontWeight: 400,
});

const MinutesPdf = ({ data, translations: tr }: MinutesPdfProps) => {
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
            <Text>{tr.organization}</Text>
            <Text>
              {tr.minutesLabel} {minutesNumber}/{new Date().getFullYear()}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {tr.meetingTitle}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {tr.dateAndTime}
            </Text>
            <Text>{formatDate(timeOfMeeting)}</Text>
            <Text>
              {location.fin} / {location.eng}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {tr.present}
            </Text>
            {attendants.map((att, index) => (
              <Text key={index}>{att}</Text>
            ))}
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {tr.section1}
            </Text>
            <Text>
              {tr.chairmanOpenedAt} {formatDate(startTime)}
            </Text>
            <Text>{tr.meetingDeclaredLegal}</Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {tr.section2}
            </Text>
            <Text>
              {tr.elected}{" "}
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
              {tr.section3}
            </Text>
            <Text>{tr.agendaApproved}</Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {tr.section4}
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
              {tr.section5}
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
              {tr.newMembers}
            </Text>
            {newMembers?.map((newMember, index) => (
              <Text key={index}>{newMember}</Text>
            ))}
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {tr.section6}
            </Text>
            <Text>
              {tr.nextMeetingHeldAt} {formatDate(nextMeeting)}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {tr.section7}
            </Text>
            <Text>
              {tr.chairmanClosedAt} {formatDate(endTime).split(" ")[1]}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {tr.certification}
            </Text>
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
                  <Text>
                    {key} {tr.signatureSuffix}
                  </Text>
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
