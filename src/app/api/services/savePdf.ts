import { apiFetch } from "@/app/utils/apiFetch";

export const savePdf = async (filename: string, blob: Blob) => {
  try {
    const formData = new FormData();

    formData.append("filename", filename);
    formData.append("blob", blob);
    console.log(formData);

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
