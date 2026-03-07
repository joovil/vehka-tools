"use client";

import { SplitPage } from "../SplitView/SplitComponent";
import CompensationContent from "./MainContent/CompensationMainContent";
import CompensationSidebar from "./Sidebar/CompensationSidebar";

export interface CompensationProps {
  data: CompensationData;
  setData: React.Dispatch<React.SetStateAction<CompensationData>>;
}

export interface CompensationData {
  committeeName?: string;
  items: Array<{
    item: string;
    price: string;
    condition: string;
  }>;
}

const CompensationPricesPage = () => (
  <SplitPage<CompensationData>
    MainContent={CompensationContent}
    Sidebar={CompensationSidebar}
    initialData={{ items: [] }}
  />
);

export default CompensationPricesPage;
