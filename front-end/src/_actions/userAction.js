import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from "./types";
import { request } from "../utils/axios";


export function registerUser(dataToSubmit) {
  const data = request("post", "/register", dataToSubmit);
  return {
    type: REGISTER_USER,
    payload: data,
  };
}

export function loginUser(dataToSubmit) {
    const data = request("post",  "/login", dataToSubmit);
    return {
      type: LOGIN_USER,
      payload: data,
    };
}

export function logoutUser() {
    const data = request("post", "/logout");
    return {
      type: LOGOUT_USER,
      payload: data,
    };
}