import { apiFetch } from "@/app/utils/apiFetch";

export const savePdf = async (filename: string, blob: Blob) => {
  try {
    if (process.env.SAVE_PDF_TO_AZURE === "false") return;

    const formData = new FormData();

    formData.append("filename", filename);
    formData.append("blob", blob);

    const res = await apiFetch("/minutes", {
      method: "POST",
      body: formData,
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
