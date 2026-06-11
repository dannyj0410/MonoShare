export interface IUser {
  email: string;
  emailVerified?: boolean;
  createdAt?: string;
}

export interface ISignInCredentials {
  email: string;
  password: string;
  turnstileToken?: string;
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

export interface forgotPasswordPayload {
  email: string;
  turnstileToken?: string;
}
