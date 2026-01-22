export interface AuthDto {
  email: string;
  password: string;
  confirm?: string;
}

export interface SessionDto {
  tokenHash: string;
}

export interface UserDto {
  id: string;
  email: string;
  createdAt: Date;
}

//only use these for various http requests or responses
