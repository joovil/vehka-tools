"use client";

import { Text, View } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { DocumentBlock, DocumentDefinition, DocumentSection } from "./types";

export interface PdfStyleOverrides {
  signatureFont?: string;
}

const defaults: PdfStyleOverrides = {
  signatureFont: "Alex Brush",
};

/** Render a single DocumentBlock as @react-pdf elements. */
export const renderPdfBlock = (
  block: DocumentBlock,
  index: number,
  options?: PdfStyleOverrides,
): ReactNode => {
  const opts = { ...defaults, ...options };

  switch (block.type) {
    case "text":
      return <Text key={index}>{block.content}</Text>;

    case "heading":
      return (
        <Text
          key={index}
          style={{
            fontSize: block.level === 1 ? 16 : 14,
            fontWeight: "bold",
          }}
        >
          {block.content}
        </Text>
      );

    case "list":
      return (
        <View key={index}>
          {block.items.map((item, i) => (
            <Text key={i}>{item}</Text>
          ))}
        </View>
      );

    case "bilingual-list": {
      const lang = block.language;
      if (lang) {
        const header = lang === "fin" ? block.finHeader : block.engHeader;
        return (
          <View
            key={index}
            style={{ marginTop: 8 }}
          >
            {header && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                {header}
              </Text>
            )}
            {block.items.map((item, i) => (
              <Text key={i}>{item[lang]}</Text>
            ))}
          </View>
        );
      }
      return (
        <View
          key={index}
          style={{ flexDirection: "row", gap: 20, marginTop: 8 }}
        >
          <View style={{ flex: 1 }}>
            {block.finHeader && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                {block.finHeader}
              </Text>
            )}
            {block.items.map((item, i) => (
              <Text key={`fin-${i}`}>{item.fin}</Text>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            {block.engHeader && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                {block.engHeader}
              </Text>
            )}
            {block.items.map((item, i) => (
              <Text key={`eng-${i}`}>{item.eng}</Text>
            ))}
          </View>
        </View>
      );
    }

    case "bilingual-columns": {
      const cols = block.language
        ? [block.columns[block.language === "fin" ? 0 : 1]]
        : block.columns;
      return (
        <View
          key={index}
          style={{
            flexDirection: cols.length > 1 ? "row" : undefined,
            marginVertical: 20,
          }}
        >
          {cols.map((col, i) => (
            <View
              key={i}
              style={{ flex: 1, paddingHorizontal: 10 }}
            >
              {col.header && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {col.header}
                </Text>
              )}
              <Text style={{ fontSize: 12 }}>{col.content}</Text>
            </View>
          ))}
        </View>
      );
    }

    case "inline":
      return (
        <Text key={index}>
          {block.segments.map((seg, i) => (
            <Text
              key={i}
              style={{
                textDecoration: seg.underline ? "underline" : undefined,
                fontWeight: seg.bold ? "bold" : undefined,
              }}
            >
              {seg.text}
            </Text>
          ))}
        </Text>
      );

    case "signatures":
      return (
        <View
          key={index}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 20,
            marginTop: 40,
          }}
        >
          {block.entries.map((entry, i) => (
            <View
              key={i}
              style={{ width: "45%" }}
            >
              <Text
                style={{
                  borderBottom: 1,
                  fontFamily: opts.signatureFont,
                  fontSize: 20,
                }}
              >
                {entry.value}
              </Text>
              <Text>{entry.label}</Text>
            </View>
          ))}
        </View>
      );

    case "image":
      // Images are handled by the specific PDF page wrapper, not the generic renderer.
      return null;

    case "table":
      return (
        <View key={index}>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              paddingBottom: 4,
              marginBottom: 4,
            }}
          >
            {block.headers.map((h, i) => (
              <Text
                key={i}
                style={{ flex: 1, fontWeight: "bold", fontSize: 10 }}
              >
                {h}
              </Text>
            ))}
          </View>
          {block.rows.map((row, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                marginBottom: 2,
                borderBottomWidth: 0.5,
                borderBottomColor: "#ccc",
                paddingBottom: 2,
              }}
            >
              {row.map((cell, j) => (
                <Text
                  key={j}
                  style={{ flex: 1, fontSize: 10 }}
                >
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>
      );
  }
};

/** Render a DocumentSection (array of blocks) inside a View. */
export const renderPdfSection = (
  section: DocumentSection,
  index: number,
  options?: PdfStyleOverrides,
): ReactNode => (
  <View key={index}>
    {section.blocks.map((block, i) => renderPdfBlock(block, i, options))}
  </View>
);

/** Render an entire DocumentDefinition as a vertically-stacked View. */
export const renderPdfDocument = (
  document: DocumentDefinition,
  options?: PdfStyleOverrides,
): ReactNode => (
  <View style={{ gap: 16 }}>
    {document.map((section, i) => renderPdfSection(section, i, options))}
  </View>
);
