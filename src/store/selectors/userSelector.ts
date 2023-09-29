export const getOtherUserInfoSelector = (state: any) =>
  state.user.otherUserInfo;
export const userAvatarInventorySelector = (state: any) =>
  state.user.inventories.avatar;
export const userCoverInventorySelector = (state: any) =>
  state.user.inventories.cover;
export const userStatisticSelector = (state: any) => state.user.statistic;
export const userRewardsSelector = (state: any) => state.user.rewards;
export const userMostPlayedGameSelector = (state: any) =>
  state.user.mostPlayedGame;
export const userRecentlyGameSelector = (state: any) => state.user.recentlyGame;
export const userLovedGameSelector = (state: any) => state.user.lovedGame;
export const userPlayListGameSelector = (state: any) => state.user.playListGame;
export const userPurchaseHistorySelector = (state: any) =>
  state.user.purchaseHistory;
export const contactSelector = (state: any) => state.user.contact;
export const hallOfFameZeraSelector = (state: any) =>
  state.user.hallOfFame.zera;
export const hallOfFameGamesPlayedSelector = (state: any) =>
  state.user.hallOfFame.games_played;
export const hallOfFamePlaystreakSelector = (state: any) =>
  state.user.hallOfFame.playstreak;
export const achievementSelector = (state: any) => state.user.achievements;
