"use client";

import Dropdown from "@/app/components/Dropdown";
import SidebarInput from "@/app/components/inputs/SidebarInput";
import { useTranslations } from "next-intl";
import { useState } from "react";
import * as XLSX from "xlsx";
import {
  InventoryData,
  InventoryItem,
  InventoryProps,
  InventorySection,
  ItemCondition,
  SECTIONS,
} from "../page";

const CONDITIONS: ItemCondition[] = [
  "excellent",
  "good",
  "satisfactory",
  "poor",
  "disposable",
];

const emptyItem: InventoryItem = {
  name: "",
  amount: 0,
  condition: "good",
  additionalInfo: "",
  location: "",
};

const InventorySidebar = ({ data, setData }: InventoryProps) => {
  const t = useTranslations();
  const [activeSection, setActiveSection] = useState<InventorySection>("clubroom");
  const [newItem, setNewItem] = useState<InventoryItem>({ ...emptyItem });

  const addItem = () => {
    if (!newItem.name.trim()) return;
    setData((prev) => ({
      ...prev,
      [activeSection]: [...prev[activeSection], newItem],
    }));
    setNewItem({ ...emptyItem });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addItem();
  };

  const buildSheet = (items: InventoryItem[]) => {
    const rows = items.map((item) => ({
      [t("inventory.columns.item")]: item.name,
      [t("inventory.columns.amount")]: item.amount,
      [t("inventory.columns.condition")]: t(`inventory.conditions.${item.condition}`),
      [t("inventory.columns.additionalInfo")]: item.additionalInfo,
      [t("inventory.columns.location")]: item.location,
    }));
    return XLSX.utils.json_to_sheet(rows);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // Instructions tab
    const instructionsData = [
      [t("inventory.title")],
      [],
      [`${t("inventory.address")}: ${data.address}`],
      [`${t("inventory.date")}: ${data.date}`],
      [],
      [t("inventory.excel.conditionGuide")],
    ];
    const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
    XLSX.utils.book_append_sheet(wb, wsInstructions, t("inventory.excel.tabs.instructions"));

    // Section tabs
    for (const section of SECTIONS) {
      const ws = buildSheet(data[section]);
      XLSX.utils.book_append_sheet(wb, ws, t(`inventory.excel.tabs.${section}`));
    }

    XLSX.writeFile(
      wb,
      `${t("inventory.excelFilename")}-${new Date().toLocaleDateString("fi-FI")}.xlsx`,
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Dropdown header={t("inventory.info")}>
        <SidebarInput<InventoryData>
          fieldKey="address"
          data={data}
          setData={setData}
          placeholder={t("inventory.placeholders.address")}
          label={t("inventory.address")}
        />
        <SidebarInput<InventoryData>
          fieldKey="date"
          data={data}
          setData={setData}
          placeholder={t("inventory.placeholders.date")}
          label={t("inventory.date")}
        />
      </Dropdown>

      <Dropdown header={t("inventory.addItem")}>
        <div className="mb-2">
          <label className="mb-1 block text-sm font-bold">{t("inventory.section")}</label>
          <select
            className="input-wrapper w-full"
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value as InventorySection)}
          >
            {SECTIONS.map((s) => (
              <option key={s} value={s}>
                {t(`inventory.sections.${s}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="input-wrapper">
          <input
            placeholder={t("inventory.placeholders.name")}
            value={newItem.name}
            onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="number"
            placeholder={t("inventory.placeholders.amount")}
            value={newItem.amount || ""}
            onChange={(e) =>
              setNewItem((prev) => ({
                ...prev,
                amount: parseInt(e.target.value, 10) || 0,
              }))
            }
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="mb-2">
          <label className="mb-1 block text-sm font-bold">{t("inventory.columns.condition")}</label>
          <select
            className="input-wrapper w-full"
            value={newItem.condition}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, condition: e.target.value as ItemCondition }))
            }
          >
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {t(`inventory.conditions.${c}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="input-wrapper">
          <input
            placeholder={t("inventory.placeholders.additionalInfo")}
            value={newItem.additionalInfo}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, additionalInfo: e.target.value }))
            }
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="input-wrapper">
          <input
            placeholder={t("inventory.placeholders.location")}
            value={newItem.location}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, location: e.target.value }))
            }
            onKeyDown={handleKeyDown}
          />
        </div>
        <button onClick={addItem}>{t("inventory.add")}</button>
      </Dropdown>

      <button
        onClick={exportToExcel}
        disabled={SECTIONS.every((s) => data[s].length === 0)}
      >
        {t("inventory.exportExcel")}
      </button>
    </div>
  );
};

export default InventorySidebar;
