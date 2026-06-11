import {
  type IUserResponse,
  type IUserCheckResponse,
  type ISignUpCredentials,
  type ISignInCredentials,
  type forgotPasswordPayload,
} from "../interfaces/auth.interface";
import { axiosInstance } from "./axios";

export const register = async (payload: ISignUpCredentials) => {
  const res = await axiosInstance.post<IUserResponse>(
    "/auth/register",
    payload,
  );
  return res.data;
};

export const signin = async (payload: ISignInCredentials) => {
  const res = await axiosInstance.post<IUserResponse>("/auth/signin", payload);
  return res.data;
};

export const logout = async () => {
  await axiosInstance.post("/auth/logout");
};

export const getUser = async () => {
  const res = await axiosInstance.get<IUserCheckResponse>("/auth/user-check");
  return res.data.user;
};

export const verifyEmail = async (token: string) => {
  const res = await axiosInstance.post("/auth/verify-email", { token });
  return res.data;
};

export const resendEmailVerification = async () => {
  const res = await axiosInstance.post("/auth/resend-verification");
  return res.data;
};

export const forgotPassword = async (payload: forgotPasswordPayload) => {
  const res = await axiosInstance.post("/auth/forgot-password", payload);
  return res.data;
};

export const resetPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/reset-password", {
    token,
    password,
  });
  return res.data;
}; //switch to payload rather than token password
