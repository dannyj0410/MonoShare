import type {
  ICreateSecretResponse,
  IMySecretsResponse,
  ISecret,
  IViewSecretResponse,
} from "../interfaces/secret.interface";
import { axiosInstance } from "./axios";

export const createSecret = async (payload: object) => {
  const res = await axiosInstance.post<ICreateSecretResponse>(
    "/secret/create",
    payload,
  );
  return res.data;
};

export const getMySecrets = async () => {
  const res = await axiosInstance.get<IMySecretsResponse>("/secret/my-secret");
  return res.data;
};

export const getSecretDetails = async (id: string) => {
  const res = await axiosInstance.get<ISecret>(`/secret/details/${id}`);
  return res.data;
};

export const viewSecret = async (id: string, signal: AbortSignal) => {
  const res = await axiosInstance.get<IViewSecretResponse>(
    `/secret/view/${id}`,
    { signal },
  );
  return res.data;
};

export const deleteSecret = async (id: string) => {
  const res = await axiosInstance.delete(`/secret/delete/${id}`);
  return res.data;
};
