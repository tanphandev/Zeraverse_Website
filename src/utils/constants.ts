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

// http method
export const HTTP_METHOD = {
  METHOD_GET: "get",
  METHOD_POST: "post",
  METHOD_PUT: "put",
  METHOD_DELETE: "delete",
};

//toast message
export const TOAST_MESSAGE = {
  LOGIN_SUCCESS: "Login Successed",
  LOGIN_FAIL: "Login Failed",
  CHECK_EMAIL: "A verification email has been sent to you. Please check it!",
  RESET_PASSWORD: "Please check your email to reset password",
  CREATE_USER_NAME_SUCCESS: "Create User Name Successed",
  CLAIM_DAILY_GIFT_SUCCESS: "Congratulations! You have received bonus today",
  CLAIM_DAILY_GIFT_FAIL: "Received bonus fail",
  COPY_SUCCESS: "Copy Successfully",
  DELETE_PLAYLIST_SUCCESS: "Delete playlist success",
  DELETE_PLAYLIST_FAIL: "Delete playlist fail",
  DELETE_PLAYLIST_ITEM_SUCCESS: "Delete game success",
  DELETE_PLAYLIST_ITEM_FAIL: "Delete game fail",
  BUY_AVATAR_SUCCESS: "Buy avatar success",
  BUY_AVATAR_FAIL: "Buy avatar fail",
  BUY_COVER_SUCCESS: "Buy cover success",
  BUY_COVER_FAIL: "Buy cover fail",
  BUY_PLAYTIMES_SUCCESS: "Buy playtimes success",
  BUY_PLAYTIMES_FAIL: "Buy playtimes fail",
  COPY_REFER_A_FRIEND: "Copy successful, send referral link to friends now!",
  ADD_PLAYLIST_SUCCESS: "Create playlist successfully",
  REPORT_SUCCESS: "You reported successful!",
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

// handle_status
export enum HANDLE_STATUS {
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

//cache type
export enum cacheType {
  forceCache = "force-cache",
  noCache = "no-cache",
  noStore = "no-store",
  reload = "reload",
}

//global modal
export enum GLOBAL_MODAL_NAME {
  NONE = "NONE",
  LOADING = "LOADING",
}

//modal
export enum MODAL_NAME {
  NONE = "NONE",
  REMINDER = "REMINDER",
  REPORT = "REPORT",
  CLAIM_DAILY_BONUS = "CLAIM_DAILY_BONUS",
  SEARCH = "SEARCH",
  EDIT_PROFILE = "EDIT_PROFILE",
  EDIT_COVER = "EDIT_COVER",
  BUY_SHOP = "BUY_SHOP",
  BUY_TIME = "BUY_TIME",
  DELETE_PLAYLIST = "DELETE_PLAYLIST",
  DELETE_ITEM_OF_PLAYLIST = "DELETE_ITEM_OF_PLAYLIST",
  ADD_PLAYLIST = "ADD_PLAYLIST",
  ONLINE_GAMER = "ONLINE_GAMER",
}

// SHOP NAME
export enum SHOP_NAME {
  AVATAR = "Avatar",
  COVER = "Cover",
  PLAYTIME = "Playtimes",
}

// SHOP ITEM
export enum SHOP_ITEM {
  AVATAR = "AVATAR",
  COVER = "COVER",
  PLAYTIME = "PLAY_TIME",
}

//User inventory name
export const INVENTORY_NAME = {
  AVATAR: "AVATAR",
  COVER: "COVER",
};

//Article category name
export const ARTICLE_CATEGORY_NAME = {
  ALL_ARTICLE: "all-articles",
};

//Hall of fame type
export enum HallOfFameType {
  ZERA = "zera",
  PLAYSTREAK = "playstreak",
  GAME_PLAYED = "games_played",
}

export enum UserField {
  recentGame = "Recent games",
  lovedGame = "Loved games",
  playListGame = "Playlist games",
  purchaseHistory = "Purchase history",
}
