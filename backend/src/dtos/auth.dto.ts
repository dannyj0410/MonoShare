export interface AuthDto {
  email: string;
  password: string;
  confirm?: string;
}
export interface AuthBase {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
}

export type UserDto = Pick<AuthBase, "id" | "email" | "emailVerified">;

export type UserResponse =
  | { message: string }
  | { message: string; user: UserDto };
