"use client";

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
}

const KeyFormPage = () => (
  <SplitPage<KeyFormData>
    MainContent={KeyFormContent}
    Sidebar={KeyFormSidebar}
    initialData={{ keyLoans: [] }}
  />
);

export default KeyFormPage;
