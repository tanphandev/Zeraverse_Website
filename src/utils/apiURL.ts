const apiURL = {
  login_with_email: "/auth/login-email",
  login_with_SSO: "/auth/sso",
  register_with_email: "/auth/register-email",
  forgot_password: "/users/forgot-password",
  update_user_name: "/users/username",
  getUserInfo: (userName: string) => `/users/profile/${userName}`,
  get_avatar_shop: "/shops/categories/1/items",
};

export default apiURL;
