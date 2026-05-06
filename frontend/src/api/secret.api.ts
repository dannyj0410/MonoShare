import type {
  ICreateSecretRequest,
  ICreateSecretResponse,
  IMySecretsResponse,
  ISecret,
  ISecretMetadata,
  IViewSecretResponse,
} from "../interfaces/secret.interface";
import { axiosInstance } from "./axios";

export const createSecret = async (payload: ICreateSecretRequest) => {
  console.log(payload);
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
  secretKey: string | null,
  signal: AbortSignal,
) => {
  const res = await axiosInstance.post<IViewSecretResponse>(
    `/secret/view/${id}`,
    { secretKey },
    { signal },
  );
  return res.data;
};

export const deleteSecret = async (id: string) => {
  const res = await axiosInstance.delete(`/secret/delete/${id}`);
  return res.data;
};
