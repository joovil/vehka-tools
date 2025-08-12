import { apiFetch } from "@/app/utils/apiFetch";

export const savePdf = async (filename: string, blob: Blob) => {
  try {
    const res = await apiFetch("/minutes", {
      method: "POST",
      body: JSON.stringify({ filename, blob }),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error("Error saving pdf", errorData.error);
    }

    return res.json();
  } catch (error) {
    console.error("Error saving pdf", error);
    throw error;
  }
};
