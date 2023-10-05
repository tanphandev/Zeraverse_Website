import { SHOP_ITEM } from "@/utils/constants";

export const shopCategoriesSelector = (state: any) => state.shop.shopCategories;
export const avatarShopSelector = (state: any) =>
  state.shop.shop[SHOP_ITEM.AVATAR];
export const coverShopSelector = (state: any) =>
  state.shop.shop[SHOP_ITEM.COVER];
export const playtimeShopSelector = (state: any) =>
  state.shop.shop[SHOP_ITEM.PLAYTIME];
