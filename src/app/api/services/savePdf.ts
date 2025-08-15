import { apiFetch } from "@/app/utils/apiFetch";
// import { getToken } from "@/app/utils/auth";

export const savePdf = async (filename: string, blob: Blob) => {
  try {
    const formData = new FormData();

    formData.append("filename", filename);
    formData.append("blob", blob);

    // const authToken = await getToken();

    const res = await apiFetch("/minutes", {
      method: "POST",
      body: formData,
      headers: {
        // Authorization: `Bearer ${authToken}`,
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
