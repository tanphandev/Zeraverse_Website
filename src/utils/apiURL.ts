const apiURL = {
  //authenticate
  login_with_email: "/auth/login-email",
  login_with_SSO: "/auth/sso",
  register_with_email: "/auth/register-email",
  forgot_password: "/users/forgot-password",
  //user
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
  get_contact: "/contacts",
  newsletter: "/users/newsletter",
  //shop
  get_shop_categories: "/shops/categories",
  get_item_shop: (shop_item_id: number) =>
    `/shops/categories/${shop_item_id}/items`,
  get_avatar_shop: "/shops/categories/1/items",
  buy_item: "/shops/buy",
  //game
  get_games: "/game",
  get_game_categories: "/game/categories",
  get_popular_game: "/game/popular-game",
  //article
  get_newest: "/article/newest",
  get_article_categories: "/article/category",
  get_article: (category: string) => `/article/category/${category}`,
  get_article_detail: (slug: string) => `/article/detail/${slug}`,
  get_article_random: "/article/random",
  //hall of fame
  get_hall_of_fame: "/hall-of-fames",
  //achievements
  get_achievements: (username: string) => `/achievements/${username}`,
  // search
  search_game: "/game/search",
};

export default apiURL;
