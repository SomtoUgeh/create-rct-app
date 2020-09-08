const user = `
export interface UserInformation extends Record<string, unknown> {
  created_at: boolean;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  _id: string;
}

export type User = {
  user: UserInformation | null;
};
`;

const auth = `
export interface Login extends Record<string, unknown> {
  email: string;
  password: string;
}

export interface Register extends Record<string, unknown> {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface ForgotPassword extends Record<string, unknown> {
  email: string;
}

export interface ResetPassword extends Record<string, unknown> {
  token: string;
  email: string;
  password: string;
}

export interface AuthResponse extends Record<string, unknown>{
  token: string;
}
`;

const client = `
export interface ApiHeader {
  platform: string;
  Authorization?: string;
  "Content-type": string;
}

export type Body = Record<string, unknown>;

export interface OptionsArgs extends Record<string, unknown>{
  body?: Body;
  headers?: Record<string, unknown>;
}
`;

const query = `
export type Status = "error" | "success" | "loading" | "idle";
export type RQError = Error | null | undefined | unknown;
`;

module.exports = {
  user,
  auth,
  client,
  query
};
