"use client";

import { useTranslations } from "next-intl";
import { InventoryItem, InventoryProps, InventorySection, SECTIONS } from "../page";

const InventoryContent = ({ data, setData }: InventoryProps) => {
  const t = useTranslations();

  const removeItem = (section: InventorySection, index: number) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_: InventoryItem, i: number) => i !== index),
    }));
  };

  const renderSection = (section: InventorySection) => {
    const items = data[section];
    return (
      <div key={section} className="flex flex-col gap-2">
        <h2>{t(`inventory.sections.${section}`)}</h2>
        {items.length === 0 ? (
          <p className="text-sm text-gray-400">{t("inventory.emptySection")}</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="inventory-header">
                <th className="w-8" />
                <th className="p-2 text-left font-bold">{t("inventory.columns.item")}</th>
                <th className="p-2 text-left font-bold">{t("inventory.columns.amount")}</th>
                <th className="p-2 text-left font-bold">{t("inventory.columns.condition")}</th>
                <th className="p-2 text-left font-bold">{t("inventory.columns.additionalInfo")}</th>
                <th className="p-2 text-left font-bold">{t("inventory.columns.location")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="w-8 p-1">
                    <button
                      className="flex h-6 w-6 items-center justify-center p-0"
                      onClick={() => removeItem(section, i)}
                    >
                      X
                    </button>
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.amount}</td>
                  <td className="p-2">{t(`inventory.conditions.${item.condition}`)}</td>
                  <td className="p-2">{item.additionalInfo}</td>
                  <td className="p-2">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-10">
      <h1>{t("inventory.title")}</h1>
      {data.address && (
        <p className="text-sm">
          <span className="font-bold">{t("inventory.address")}:</span> {data.address}
          {data.date && <span className="ml-4"><span className="font-bold">{t("inventory.date")}:</span> {data.date}</span>}
        </p>
      )}
      {SECTIONS.map(renderSection)}
    </div>
  );
};

export default InventoryContent;
