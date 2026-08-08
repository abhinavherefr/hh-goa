import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

export const api = axios.create({
  baseURL,
  timeout: 20000,
});

/**
 * Uploads the final composited image blob and gets back a public share page URL
 * whose OG tags point at the hosted image (this is what makes the X card preview work).
 */
export async function createShare(blob, { format }) {
  const formData = new FormData();
  formData.append("image", blob, "hh-goa-2026.png");
  formData.append("format", format);

  const { data } = await api.post("/api/share", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data; // { shareId, shareUrl, imageUrl }
}
