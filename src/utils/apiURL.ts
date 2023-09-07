const apiURL = {
  login_with_email: "/auth/login-email",
  login_with_SSO: "/auth/sso",
  register_with_email: "/auth/register-email",
  forgot_password: "/users/forgot-password",
  update_user_name: "/users/username",
  getUserInfo: (userName: string) => `/users/profile/${userName}`,
  get_user_statistic: "/users/statistic",
  get_user_rewards: "/users/reward",
  get_most_played_game: "/game/most-played",
  get_user_recently_game: "/game/recently-played",
  get_user_loved_game: "/game/loved",
  get_user_playList_game: "/game/playlist",
  get_user_purchase_history: "/users/purchase-history",
  get_avatar_shop: "/shops/categories/1/items",
};

export default apiURL;
