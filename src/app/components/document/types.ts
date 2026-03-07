import { FinEng } from "@/types";

// ─── Block types ───────────────────────────────────────────────

export type DocumentBlock =
  | TextBlock
  | HeadingBlock
  | ListBlock
  | BilingualListBlock
  | BilingualColumnsBlock
  | InlineBlock
  | SignatureBlock
  | ImageBlock;

export interface TextBlock {
  type: "text";
  content: string;
}

export interface HeadingBlock {
  type: "heading";
  content: string;
  level: 1 | 2;
}

/** Simple string list. Set `fieldKey` to enable remove buttons in the HTML preview. */
export interface ListBlock {
  type: "list";
  items: string[];
  fieldKey?: string;
}

/** Side-by-side Finnish / English list. Set `fieldKey` to enable remove buttons. */
export interface BilingualListBlock {
  type: "bilingual-list";
  items: FinEng[];
  fieldKey?: string;
  finHeader?: string;
  engHeader?: string;
}

/** Two-column layout with optional headers (e.g. "Lisätietoa" / "More info"). */
export interface BilingualColumnsBlock {
  type: "bilingual-columns";
  columns: Array<{ header?: string; content: string }>;
}

/** Inline segments rendered as a single row (e.g. "Elected: name1 / name2"). */
export interface InlineBlock {
  type: "inline";
  segments: Array<{ text: string; underline?: boolean; bold?: boolean }>;
}

/** Signature grid with handwriting font. */
export interface SignatureBlock {
  type: "signatures";
  entries: Array<{ key: string; label: string; value: string }>;
}

export interface ImageBlock {
  type: "image";
  src: string;
  alt?: string;
}

// ─── Document structure ────────────────────────────────────────

export interface DocumentSection {
  blocks: DocumentBlock[];
  /** CSS class applied to the section wrapper in the HTML preview only. */
  htmlClassName?: string;
  /** Optional tag for PDF renderers that need to handle specific sections differently. */
  tag?: string;
}

export type DocumentDefinition = DocumentSection[];
