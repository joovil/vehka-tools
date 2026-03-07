"use client";

import { SplitPage } from "../SplitView/SplitComponent";
import AccountingContent from "./MainContent/AccountingMainContent";
import AccountingSidebar from "./Sidebar/AccountingSidebar";

export interface AccountingProps {
  data: AccountingData;
  setData: React.Dispatch<React.SetStateAction<AccountingData>>;
}

export interface AccountingData {
  committeeName?: string;
  period?: string;
  expenses: Array<{ description: string; amount: string }>;
  incomes: Array<{ description: string; amount: string }>;
  notes?: string;
  signatures: { chairman: string; treasurer: string };
}

const AccountingPage = () => (
  <SplitPage<AccountingData>
    MainContent={AccountingContent}
    Sidebar={AccountingSidebar}
    initialData={{
      expenses: [],
      incomes: [],
      signatures: { chairman: "", treasurer: "" },
    }}
  />
);

export default AccountingPage;
