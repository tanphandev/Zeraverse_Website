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
  CREATE_USER_NAME_SUCCESS: "Create User Name Successed",
};

export enum UserField {
  recentGame = "Recent games",
  lovedGame = "Loved games",
  playListGame = "Playlist games",
  purchaseHistory = "Purchase history",
}
