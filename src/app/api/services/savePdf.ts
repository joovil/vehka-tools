import { apiFetch } from "@/app/utils/apiFetch";
import { DocumentType } from "@/types";

export const savePdf = async (
  filename: string,
  blob: Blob,
  documentType: DocumentType,
) => {
  try {
    if (process.env.NEXT_PUBLIC_SAVE_PDF === "false") return;

    const formData = new FormData();

    formData.append("filename", filename);
    formData.append("blob", blob);
    formData.append("documentType", documentType);

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
