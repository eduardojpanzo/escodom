import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const EXPIRY_DAYS = 3;

export const setAuthToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: EXPIRY_DAYS,
    secure: true,
    sameSite: "strict",
  });
};

export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
