const tokenRequireAPIs = {
  confirmRegister: "/auth/confirm-register-email",
};

const nonTokenRequireAPIs = {
  loginWithSSO: "/auth/sso",
  registerEmail: "/auth/register-email",
  loginEmail: "/auth/login-email",
  forgotPassword: "/users/forgot-password",
  updateUserName: "/users/username",
  getUserProfile: "/users/profile",
};

// const setAuthToken = (token: string) => {
//   httpRequest.interceptors.request.use(function (config) {
//     const token = localStorage.getItem("token");
//     config.headers.Authorization = token ? `Bearer ${token}` : "";
//     return config;
//   });
// };
export { tokenRequireAPIs, nonTokenRequireAPIs };
