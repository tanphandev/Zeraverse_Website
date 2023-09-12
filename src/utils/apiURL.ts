const apiURL = {
  login_with_email: "/auth/login-email",
  login_with_SSO: "/auth/sso",
  register_with_email: "/auth/register-email",
  forgot_password: "/users/forgot-password",
  update_user_name: "/users/username",
  claim_daily_bonus: "/users/claim-daily-bonus",
  getUserInfo: (userName: string) => `/users/profile/${userName}`,
  get_user_inventories: "/users/inventories",
  get_user_statistic: "/users/statistic",
  get_user_rewards: "/users/reward",
  get_most_played_game: "/game/most-played",
  get_user_recently_game: "/game/recently-played",
  get_user_loved_game: "/game/loved",
  get_user_playList_game: "/game/playlist",
  get_user_playlist_game_item: (playlistId: number) =>
    `/game/playlist/${playlistId}/item`,
  delete_user_playlist_game: (playListId: number) =>
    `/game/playlist/${playListId}`,
  delete_user_playlist_item_game: (gameId: number) =>
    `/game/playlist/item/${gameId}`,
  get_user_purchase_history: "/users/purchase-history",
  update_user_profile: "/users",
  get_avatar_shop: "/shops/categories/1/items",
  buy_avatar: "/shops/buy",
};

export default apiURL;
