"use client";

import { SavedDocument } from "@/types";
import { SplitPage } from "../SplitView/SplitComponent";
import KeyFormContent from "./MainContent/KeyFormMainContent";
import KeyFormSidebar from "./Sidebar/KeyFormSidebar";

export interface KeyFormProps {
  data: KeyFormData;
  setData: React.Dispatch<React.SetStateAction<KeyFormData>>;
}

export interface KeyFormData {
  committeeName?: string;
  keyLoans: Array<{
    borrower: string;
    apartment: string;
    keyType: string;
    dateBorrowed: string;
    dateReturned: string;
  }>;
  saved?: SavedDocument;
}

const KeyFormPage = () => (
  <SplitPage<KeyFormData>
    MainContent={KeyFormContent}
    Sidebar={KeyFormSidebar}
    storageKey="key-form"
    initialData={{ keyLoans: [] }}
  />
);

export default KeyFormPage;
