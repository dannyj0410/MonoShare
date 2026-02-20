export interface IUser {
  email: string;
  id: string;
  createdAt?: string;
}

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ISignUpCredentials extends ISignInCredentials {
  confirm: string;
}

export interface IUserCheckResponse {
  user: IUser;
}

export interface IUserResponse {
  message: string;
  user: IUser;
}
