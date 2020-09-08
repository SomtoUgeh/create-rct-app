module.exports = `
import config from "config";
import Cookies from "js-cookie";
import { client } from "../client";
import { User } from "models/user";
import { queryCache } from "react-query";
import { get_token } from "../utils/auth-utils";
import {
  Login,
  Register,
  AuthResponse,
  ResetPassword,
  ForgotPassword,
} from "models/auth";

async function getUser(): Promise<User["user"] | null> {
  const token = get_token();
  if (!token) return Promise.resolve(null);

  try {
    return await client<User["user"]>("user");
  } catch (error) {
    logout();

    return Promise.reject(error);
  }
}

async function login(payload: Login) {
  const response = await client<AuthResponse>("login", {
    body: payload
  });

  return handleAuthResponse(response);
}

async function register(payload: Register) {
  const response = await client<AuthResponse>("user", {
    body: payload
  });

  return handleAuthResponse(response);
}

async function forgotPassword(payload: ForgotPassword) {
  return await client("user/forgot-password", { body: payload });
}

async function resetPassword(payload: ResetPassword) {
  return await client("user/reset-password", { body: payload });
}

async function handleAuthResponse(response: AuthResponse) {
  const { token } = response;

  await Cookies.set(config.TOKEN, JSON.stringify(token), {
    expires: 1,
    secure: process.env.NODE_ENV !== "development"
  });

  try {
   await queryCache.invalidateQueries("user");
    const userInformation = queryCache.getQueryData<User>("userDetails");

    let user: User["user"];
    if (userInformation) user = userInformation.user;
    else user = null;

    return user;
  } catch (error) {
    logout();

    return Promise.reject(error);
  }
}

function logout() {
  Cookies.remove(config.TOKEN);
  return Promise.resolve();
}

export { login, register, logout, getUser, forgotPassword, resetPassword };
`;
