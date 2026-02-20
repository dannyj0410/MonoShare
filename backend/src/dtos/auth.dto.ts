export interface AuthDto {
  email: string;
  password: string;
  confirm?: string;
}
export interface AuthBase {
  id: string;
  email: string;
  createdAt: Date;
  ownedSecrets: []; //change to secrets array
}

export type UserDto = Pick<AuthBase, "id" | "email">;
//todo: change request dtos to classes so you can remove any other fields someone might have added
export type UserResponse =
  | { message: string }
  | { message: string; user: UserDto };

// only use these to define what a request will look like or a response will look like

// export interface SessionDto {
//   tokenHash: string;
// }
