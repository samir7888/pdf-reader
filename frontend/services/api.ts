import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const uploadPdf = async (file: FormData) => {
  await apiClient.post("/pdf", file, {
    headers: {
      "Content-Type": "application/pdf",
    },

    timeout: 60000, // 60 seconds timeout for uploads
  });
};

export const uploadLink = async (url: string) => {
  await apiClient.post("/youtube", { url });
};

export const askPdf = async (question: string) => {
  const response = await apiClient.post("/ask/pdf", { question });
  return response.data;
};
export const askYoutube = async (question: string) => {
  const response = await apiClient.post("/ask/youtube", { question });
  return response.data;
};
