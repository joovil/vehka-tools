"use client";

import { SplitPage } from "../SplitView/SplitComponent";
import InventoryContent from "./MainContent/InventoryMainContent";
import InventorySidebar from "./Sidebar/InventorySidebar";

export interface InventoryProps {
  data: InventoryData;
  setData: React.Dispatch<React.SetStateAction<InventoryData>>;
}

export type ItemCondition =
  | "excellent"
  | "good"
  | "satisfactory"
  | "poor"
  | "disposable";

export type InventorySection =
  | "clubroom"
  | "gym"
  | "homeAppliances"
  | "otherSpaces";

export const SECTIONS: InventorySection[] = [
  "clubroom",
  "gym",
  "homeAppliances",
  "otherSpaces",
];

export interface InventoryItem {
  name: string;
  amount: number;
  condition: ItemCondition;
  additionalInfo: string;
  location: string;
}

export interface InventoryData {
  address: string;
  date: string;
  clubroom: InventoryItem[];
  gym: InventoryItem[];
  homeAppliances: InventoryItem[];
  otherSpaces: InventoryItem[];
}

const InventoryPage = () => (
  <SplitPage<InventoryData>
    MainContent={InventoryContent}
    Sidebar={InventorySidebar}
    storageKey="inventory"
    initialData={{
      address: "",
      date: "",
      clubroom: [],
      gym: [],
      homeAppliances: [],
      otherSpaces: [],
    }}
  />
);

export default InventoryPage;
