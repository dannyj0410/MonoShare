import { axiosInstance } from "./axios";

export const createSecret = async (payload: object) => {
  const res = await axiosInstance.post("/secret/create", payload);
  return res.data;
};

export const getMySecrets = async () => {
  const res = await axiosInstance.get("/secret/my-secret");
  return res.data;
};

export const getSecretDetails = async (id: string) => {
  const res = await axiosInstance.get(`/secret/details/${id}`);
  return res.data;
};

export const viewSecret = async (id: string, signal: AbortSignal) => {
  const res = await axiosInstance.get(`/secret/view/${id}`, { signal });
  if (!res.data) throw new Error("Failed to fetch");
  return res.data;
};

export const deleteSecret = async (id: string) => {
  const res = await axiosInstance.delete(`/secret/delete/${id}`);
  return res.data;
};
