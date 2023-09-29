import { httpRequestAuth } from "@/utils/httpRequestAuth";
import apiURL from "@/utils/apiURL";
import { ISso } from "@/interface/auth/ISso";

// login with anonymous

export const loginWithAnonymous = async (uid: string) => {
  try {
    const { data } = await httpRequestAuth.get(apiURL.get_anonymous_info(uid));
    return data?.data;
  } catch (e: any) {
    throw e;
  }
};

// Login with email
export const loginWithEmail = async (loginFormData: IAuthFormData) => {
  try {
    const { data } = await httpRequestAuth.post(
      apiURL.login_with_email,
      loginFormData
    );
    return data;
  } catch (e) {
    throw e;
  }
};

// Login With Facebook
export const loginWithSSO = async (SSOData: ISso) => {
  try {
    const { data } = await httpRequestAuth.post(apiURL.login_with_SSO, SSOData);
    return data;
  } catch (e: any) {
    throw e;
  }
};

// register user by email
export const registerWithEmail = async (registerData: IAuthFormData) => {
  try {
    const { data } = await httpRequestAuth.post(
      apiURL.register_with_email,
      registerData
    );
    return data;
  } catch (e) {
    throw e;
  }
};

// forgot password
export const forgotPassword = async (forgotData: { email: string }) => {
  try {
    const { data } = await httpRequestAuth.post(
      apiURL.forgot_password,
      forgotData
    );
    return data;
  } catch (e: any) {
    throw e;
  }
};
