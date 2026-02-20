import {
  type IUserResponse,
  type IUserCheckResponse,
  type ISignUpCredentials,
  type ISignInCredentials,
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
