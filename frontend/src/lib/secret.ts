import type {
  ICreateSecretResponse,
  IMySecretsResponse,
  ISecret,
  ISecretMetadata,
  IViewSecretResponse,
} from "../interfaces/secret.interface";
import { axiosInstance } from "./axios";

//todo: payload interface
export const createSecret = async (payload: object) => {
  const res = await axiosInstance.post<ICreateSecretResponse>(
    "/secret/create",
    payload,
  );
  return res.data;
};

export const getMySecrets = async () => {
  const res = await axiosInstance.get<IMySecretsResponse>("/secret/my-secrets");
  return res.data;
};

export const getSecretDetails = async (id: string) => {
  const res = await axiosInstance.get<ISecret>(`/secret/details/${id}`);
  return res.data;
};

export const getSecretMetadata = async (id: string, hasHash: boolean) => {
  const res = await axiosInstance.get<ISecretMetadata>(
    `/secret/metadata/${id}`,
    { params: { hasHash } },
  );
  return res.data;
};

export const viewSecret = async (
  id: string,
  password: string | null,
  signal: AbortSignal,
) => {
  const res = await axiosInstance.post<IViewSecretResponse>(
    `/secret/view/${id}`,
    { password },
    { signal },
  );
  return res.data;
};

export const deleteSecret = async (id: string) => {
  const res = await axiosInstance.delete(`/secret/delete/${id}`);
  return res.data;
};
