export interface AuthDto {
  email: string;
  password: string;
  confirm?: string;
}
export interface AuthBase {
  id: string;
  email: string;
  createdAt: Date;
}

export type UserDto = Pick<AuthBase, "id" | "email">;

export type UserResponse =
  | { message: string }
  | { message: string; user: UserDto };
