"use client";

import { FinEng } from "@/types";
import Image from "next/image";
import { DocumentBlock, DocumentDefinition } from "./types";

interface HtmlRendererProps<T> {
  document: DocumentDefinition;
  data?: T;
  setData?: React.Dispatch<React.SetStateAction<T>>;
  className?: string;
}

/**
 * Generic HTML renderer for a DocumentDefinition.
 * When `data` and `setData` are provided, blocks with a `fieldKey` get
 * interactive remove buttons in the preview.
 */
export const HtmlDocumentRenderer = <T,>({
  document,
  data,
  setData,
  className = "flex flex-col gap-4 p-10",
}: HtmlRendererProps<T>) => {
  const isEditable = data !== undefined && setData !== undefined;

  const removeItem = (item: string | FinEng, fieldKey: string) => {
    if (!isEditable) return;
    const current = (data as Record<string, unknown>)[fieldKey];
    if (Array.isArray(current)) {
      setData({ ...data, [fieldKey]: current.filter((i) => i !== item) });
    }
  };

  const RemoveButton = ({ onClick }: { onClick: () => void }) => (
    <button
      className="mr-2 flex h-6 w-6 items-center justify-center p-0"
      onClick={onClick}
    >
      X
    </button>
  );

  const renderBlock = (block: DocumentBlock, index: number) => {
    switch (block.type) {
      case "text":
        return <div key={index}>{block.content}</div>;

      case "heading":
        return block.level === 1 ? (
          <h1 key={index}>{block.content}</h1>
        ) : (
          <h2 key={index}>{block.content}</h2>
        );

      case "list":
        return (
          <div key={index}>
            {block.items.map((item, i) => (
              <div
                className="flex"
                key={i}
              >
                {isEditable && block.fieldKey && (
                  <RemoveButton
                    onClick={() => removeItem(item, block.fieldKey!)}
                  />
                )}
                <div>{item}</div>
              </div>
            ))}
          </div>
        );

      case "bilingual-list": {
        const lang = block.language;
        if (lang) {
          const header = lang === "fin" ? block.finHeader : block.engHeader;
          return (
            <div key={index}>
              {header && <h2>{header}</h2>}
              {block.items.map((item, i) => (
                <div
                  className="flex"
                  key={i}
                >
                  {isEditable && block.fieldKey && (
                    <RemoveButton
                      onClick={() => removeItem(item, block.fieldKey!)}
                    />
                  )}
                  <div>{item[lang]}</div>
                </div>
              ))}
            </div>
          );
        }
        return (
          <div
            key={index}
            className="grid grid-cols-2"
          >
            <div>
              {block.finHeader && <h2>{block.finHeader}</h2>}
              {block.items.map((item, i) => (
                <div
                  className="flex"
                  key={i}
                >
                  {isEditable && block.fieldKey && (
                    <RemoveButton
                      onClick={() => removeItem(item, block.fieldKey!)}
                    />
                  )}
                  <div>{item.fin}</div>
                </div>
              ))}
            </div>
            <div>
              {block.engHeader && <h2>{block.engHeader}</h2>}
              {block.items.map((item, i) => (
                <div key={i}>
                  <div>{item.eng}</div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "bilingual-columns": {
        const cols = block.language
          ? [block.columns[block.language === "fin" ? 0 : 1]]
          : block.columns;
        return (
          <div
            key={index}
            className={block.language ? undefined : "grid grid-cols-2"}
          >
            {cols.map((col, i) => (
              <div key={i}>
                {col.header && <h2>{col.header}</h2>}
                <div>{col.content}</div>
              </div>
            ))}
          </div>
        );
      }

      case "inline":
        return (
          <div
            key={index}
            className="flex items-baseline gap-1"
          >
            {block.segments.map((seg, i) => (
              <span
                key={i}
                className={[
                  seg.underline && "underline",
                  seg.bold && "font-bold",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {seg.text}
              </span>
            ))}
          </div>
        );

      case "signatures":
        return (
          <div
            key={index}
            className="grid grid-cols-2 grid-rows-2"
          >
            {block.entries.map((entry) => (
              <div key={entry.key}>
                <div className="font-alex h-6 w-9/10 border-b text-xl font-bold">
                  {entry.value}
                </div>
                <div>{entry.label}</div>
              </div>
            ))}
          </div>
        );

      case "image":
        return (
          <div key={index}>
            <Image
              src={block.src}
              alt={block.alt ?? ""}
              width={0}
              height={0}
              priority
              className="w-full object-cover"
            />
          </div>
        );
    }
  };

  return (
    <div className={className}>
      {document.map((section, i) => (
        <div
          key={i}
          className={section.htmlClassName}
        >
          {section.blocks.map((block, j) => renderBlock(block, j))}
        </div>
      ))}
    </div>
  );
};
