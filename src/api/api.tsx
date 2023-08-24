const tokenRequireAPIs = {
  confirmRegister: "/auth/confirm-register-email",
};

const nonTokenRequireAPIs = {
  singleSignOn: "/auth/sso",
  registerEmail: "/auth/register-email",
  LoginEmail: "/auth/login-email",
};

// const setAuthToken = (token: string) => {
//   httpRequest.interceptors.request.use(function (config) {
//     const token = localStorage.getItem("token");
//     config.headers.Authorization = token ? `Bearer ${token}` : "";
//     return config;
//   });
// };
export { tokenRequireAPIs, nonTokenRequireAPIs };
