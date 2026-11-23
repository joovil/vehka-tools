import { apiFetch } from "@/app/utils/apiFetch";
import { DocumentType } from "@/types";

export const getNextMinutesNumber = async (
  documentType: DocumentType,
  year: number,
): Promise<number | undefined> => {
  try {
    const res = await apiFetch(
      `/minutes/next-number?documentType=${documentType}&year=${year}`,
    );
    if (!res.ok) return;

    const data = await res.json();
    return data.number;
  } catch (error) {
    console.error("Error getting next minutes number", error);
  }
};
