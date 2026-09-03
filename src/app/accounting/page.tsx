"use client";

import { SplitPage } from "../SplitView/SplitComponent";
import AccountingContent from "./MainContent/AccountingMainContent";
import AccountingSidebar from "./Sidebar/AccountingSidebar";

export interface AccountingProps {
  data: AccountingData;
  setData: React.Dispatch<React.SetStateAction<AccountingData>>;
}

export type ExpenseCategory = "701" | "704" | "707" | "709" | "unclear";

export interface AccountingExpense {
  category: ExpenseCategory;
  description: string;
  amount: string;
}

export interface AccountingData {
  name?: string;
  address?: string;
  iban?: string;
  bic?: string;
  committeeRole?: string;
  minutesNumber?: string;
  expenses: AccountingExpense[];
  date?: string;
  signatures: { recipient: string; committeeMember: string };
}

const AccountingPage = () => (
  <SplitPage<AccountingData>
    MainContent={AccountingContent}
    Sidebar={AccountingSidebar}
    storageKey="accounting"
    initialData={{
      expenses: [],
      signatures: { recipient: "", committeeMember: "" },
    }}
  />
);

export default AccountingPage;
