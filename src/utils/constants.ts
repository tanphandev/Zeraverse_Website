import { staticPaths } from "./paths";

// error Page
export const ERROR_PAGE_URL = {
  MAINTENANCE: staticPaths.maintenance,
  NOT_FOUND: staticPaths.not_found,
};

//Auth Page
export const AUTHEN_PAGE_URL = {
  LOGIN: staticPaths.login,
  REGISTER: staticPaths.register,
  FORGOT_PASSWPORD: staticPaths.forgot_password,
  RESET_PASSWPORD: staticPaths.reset_password,
};

//  private Page
export const PRIVATE_PAGE_URL = {
  PROFILE: staticPaths.user,
  SHOP: staticPaths.simple_shop,
  CREATE_USER_NAME: staticPaths.create_user_name,
  ACHIEVEMENTS: staticPaths.achievements,
};

// Http Error Code
export const HTTP_ERROR_CODE = {
  UN_AUTHORIZATION: [401],
  UNDER_MAINTENANCE: 503,
};

// verify_status
export enum VERIFY_STATUS {
  NOT_START = "NOT_START",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
  INIT = "INIT",
}

export enum MODAL_STATUS {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

// sso method
export enum SSO_METHOD {
  FACEBOOK = "FACEBOOK",
  GOOGLE = "GOOGLE",
}

//toast message
export const TOAST_MESSAGE = {
  LOGIN_SUCCESS: "Login Successed",
  LOGIN_FAIL: "Login Failed",
  CHECK_EMAIL: "A verification email has been sent to you. Please check it!",
  RESET_PASSWORD: "Please check your email to reset password",
  CREATE_USER_NAME_SUCCESS: "Create User Name Successed",
};

//modal
export enum MODAL_NAME {
  NONE = "NONE",
  SEARCH = "SEARCH",
  BUY_AVATAR = "BUY_AVATAR",
  // EDIT_PROFILE = "EDIT_PROFILE",
  // DAILY_BONUS = "DAILY_BONUS",
  // BUY = "BUY",
  // PLAYLIST = "PLAYLIST",
  // DELETE_PLAYLIST = "DELETE_PLAYLIST",
  // CONFIRM = "CONFIRM",
  // REPORT = "REPORT",
  // BUY_TIME = "BUY_TIME",
  // USERS_ONLINE_GAME = "USERS_ONLINE_GAME",
  // RESET_LOGIN = "RESET_LOGIN",
}

export enum UserField {
  recentGame = "Recent games",
  lovedGame = "Loved games",
  playListGame = "Playlist games",
  purchaseHistory = "Purchase history",
}
