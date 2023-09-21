export const gameListSelector = (state: any) => state.game.gameList;
export const gameCategoriesSelector = (state: any) => state.game.gameCategories;
export const gamePopularSelector = (state: any) => state.game.popularGame;
export const gameInfoOfGameDetailSelector = (state: any) =>
  state.game.gameDetail.gameInfo;
export const hallOfFameOfGameSelector = (state: any) =>
  state.game.gameDetail.hallOfFame;
export const gameSelector = (state: any) => state.game.game;
