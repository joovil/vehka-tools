"use client";

import { renderPdfBlock } from "@/app/components/document/PdfBlockRenderer";
import { DocumentDefinition } from "@/app/components/document/types";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import HeaderSvg from "./HeaderSvg";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  contentContainer: {
    top: 270,
    padding: "0 40px 40px 40px",
    fontFamily: "Circular",
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
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  value: {
    fontSize: 12,
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

const MeetingInvitePdf = ({ document }: { document: DocumentDefinition }) => {
  // Filter out image sections — HeaderSvg replaces them
  const contentSections = document.filter(
    (section) => !section.blocks.some((b) => b.type === "image"),
  );

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        <HeaderSvg />
        <View style={styles.contentContainer}>
          {contentSections.map((section, i) => {
            // Info section: custom centered row layout for date/location
            if (section.tag === "info") {
              return (
                <View
                  key={i}
                  style={styles.infoContainer}
                >
                  {section.blocks.map((block, j) => {
                    if (block.type === "inline") {
                      return (
                        <View
                          key={j}
                          style={styles.infoRow}
                        >
                          {block.segments.map((seg, k) => (
                            <Text
                              key={k}
                              style={seg.bold ? styles.label : styles.value}
                            >
                              {seg.text}
                            </Text>
                          ))}
                        </View>
                      );
                    }
                    return renderPdfBlock(block, j);
                  })}
                </View>
              );
            }

            // All other sections: use shared block renderer
            return (
              <View key={i}>
                {section.blocks.map((block, j) => renderPdfBlock(block, j))}
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

export default MeetingInvitePdf;
