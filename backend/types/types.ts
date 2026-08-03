export interface CredentialsProp {
  email: string;
  password: string;
}

export interface RegUserProp extends CredentialsProp {
  name: string;
}

export interface TokenPayload {
  id: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const users: User[] = [];