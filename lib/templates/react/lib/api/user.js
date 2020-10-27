module.exports = `
import config from "config";
import Cookies from "js-cookie";
import { client } from "../client";
import { get_token } from "../utils/auth-utils";

async function getUser() {
  const token = get_token();
  if (!token) return Promise.resolve(null);

  try {
    return await client("user");
  } catch (error) {
    logout();

    return Promise.reject(error);
  }
}

async function login(payload) {
  const response = await client("login", {
    body: payload
  });

  return handleAuthResponse(response);
}

async function register(payload) {
  const response = await client("user", {
    body: payload
  });

  return handleAuthResponse(response);
}

async function forgotPassword(payload) {
  return await client("user/forgot-password", { body: payload });
}

async function resetPassword(payload) {
  return await client("user/reset-password", { body: payload });
}

async function handleAuthResponse(response) {
  const { token } = response;

  await Cookies.set(config.TOKEN, JSON.stringify(token), {
    expires: 1,
    secure: process.env.NODE_ENV !== "development"
  });

  return user_details;
}

function logout() {
  Cookies.remove(config.TOKEN);
  return Promise.resolve();
}

export { login, register, logout, getUser, forgotPassword, resetPassword };
`;
