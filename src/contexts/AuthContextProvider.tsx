"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signInAnonymously } from "firebase/auth";
import auth from "@/firebase/firebase_config";
import { toast } from "react-toastify";
import { staticPaths } from "@/utils/paths";
import { ISso } from "@/interface/auth/ISso";
import useNavigationEvent from "@/hooks/useNavigationEvent";
import * as AuthService from "@/services/auth.service";
import { getUserInfo } from "@/services/user.service";
import {
  AUTHEN_PAGE_URL,
  ERROR_PAGE_URL,
  HANDLE_STATUS,
  PRIVATE_PAGE_URL,
  TOAST_MESSAGE,
  VERIFY_STATUS,
} from "@/utils/constants";
import { IUserInfo } from "@/interface/user/IUserInfo";
import { IAnonymousInfo } from "@/interface/user/IAnonymousInfo";
import { isLogged } from "@/utils/helper";
type AuthContextType = {
  userInfo: IUserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
  anonymousInfo: IAnonymousInfo | null;
  setAnonymousInfo: React.Dispatch<React.SetStateAction<IAnonymousInfo | null>>;
  anonymousStatus: HANDLE_STATUS;
  setAnonymousStatus: React.Dispatch<React.SetStateAction<HANDLE_STATUS>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  usernameAuth: string | null;
  setUsernameAuth: React.Dispatch<React.SetStateAction<string | null>>;
  verifyStatus: VERIFY_STATUS;
  setVerifyStatus: React.Dispatch<React.SetStateAction<VERIFY_STATUS>>;
  isRedirectToPrevPage: boolean;
  setIsRedirectToPrevPage: React.Dispatch<React.SetStateAction<boolean>>;
  prevRoute: string;
  loginWithEmail: (loginFormData: IAuthFormData) => Promise<any>;
  loginWithSSO: (SSOData: ISso) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext(null as any);
export const useAuthContext = () => {
  const authContext = useContext(AuthContext) as AuthContextType;
  if (!authContext) {
    throw new Error(
      "useAuthContext() can only be used inside of <AuthContextProvider />, " +
        "please declare it at a higher level."
    );
  }
  return useMemo(() => ({ ...authContext }), [authContext]);
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}${
    !!searchParams.toString() ? "?" : ""
  }${searchParams}`;
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [anonymousInfo, setAnonymousInfo] = useState<IAnonymousInfo | null>(
    null
  );
  console.log("anonymousInfo", anonymousInfo);
  const [anonymousStatus, setAnonymousStatus] = useState<HANDLE_STATUS>(
    HANDLE_STATUS.NOT_START
  );
  const [token, setToken] = useState<string | null>(null);
  const [usernameAuth, setUsernameAuth] = useState<string | null>(null);
  const [isRedirectToPrevPage, setIsRedirectToPrevPage] =
    useState<boolean>(false);
  const [verifyStatus, setVerifyStatus] = useState<VERIFY_STATUS>(
    VERIFY_STATUS.NOT_START
  );
  const prevRoute = useRef<string>("");
  const currentRoute = useRef<string>(url);
  const isAuthenPath = useMemo(
    () => Object.values(AUTHEN_PAGE_URL).includes(pathname),
    [pathname]
  );

  const isNotFoundPath = useMemo(
    () => Object.values(ERROR_PAGE_URL).includes(pathname),
    [pathname]
  );

  const isPrivatePath = useMemo(
    () => Object.values(PRIVATE_PAGE_URL).includes(pathname),
    [pathname]
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");
    setToken(accessToken || "");
    setUsernameAuth(username || "");
    // dispatch localstorage change event
    window.dispatchEvent(new Event("storage"));
    const listenStorageChange = () => {
      if (
        localStorage.getItem("username") !== usernameAuth ||
        localStorage.getItem("accessToken") !== token
      ) {
        const newUserName = localStorage.getItem("username");
        const newToken = localStorage.getItem("accessToken");
        setUsernameAuth(newUserName);
        setToken(newToken);
        setVerifyStatus(VERIFY_STATUS.NOT_START);
      }
    };
    // listen localstorage change event
    window.addEventListener("storage", listenStorageChange);
    return () => window.removeEventListener("storage", listenStorageChange);
  }, []);

  // on route change
  useNavigationEvent(() => {
    handleRouteChange(url);
  });

  // verify access token
  useEffect(() => {
    if (token && usernameAuth && !isAuthenPath && !isNotFoundPath) {
      verifyAccessToken();
    }
  }, [token, usernameAuth, pathname]);

  useEffect(() => {
    if (!pathname) return;

    if (pathname === staticPaths.login) {
      !isLogged() && clearAuthenticatorData();
    }

    if (isLogged()) {
      isAuthenPath && router.push("/");
    } else {
      isPrivatePath && router.push("/login");
      !isAuthenPath &&
        anonymousStatus !== HANDLE_STATUS.SUCCESS &&
        loginWithAnonymously();
    }
  }, [pathname]);

  // sign in with anonymously
  const loginWithAnonymously = async () => {
    setAnonymousStatus(HANDLE_STATUS.IN_PROGRESS);
    signInAnonymously(auth)
      .then(async (authData) => {
        const {
          user: { uid },
        } = authData ?? {};
        uid && setAnonymousInfo((prev: any) => ({ ...prev, uid }));
        const data = await AuthService.loginWithAnonymous(uid);
        return data;
      })
      .then((data) => {
        setAnonymousStatus(HANDLE_STATUS.SUCCESS);
        setAnonymousInfo((prev: any) => ({ ...prev, ...data }));
      })
      .catch((e: any) => {
        setAnonymousStatus(HANDLE_STATUS.FAIL);
        throw e;
      });
  };

  // handle Login With Email and Password
  const loginWithEmail = useCallback(async (loginFormData: IAuthFormData) => {
    try {
      //call api login with email
      const {
        success,
        data: { token, username },
      } = await AuthService.loginWithEmail(loginFormData);
      //show toast
      if (success) {
        toast.success(TOAST_MESSAGE.LOGIN_SUCCESS);
      }
      //set token
      setToken(token);
      localStorage.setItem("accessToken", token);
      // check username to update
      setUsernameAuth(username);
      localStorage.setItem("username", username);
      if (!username) {
        return router.push(PRIVATE_PAGE_URL.CREATE_USER_NAME);
      }

      router.push(
        isRedirectToPrevPage
          ? prevRoute.current ?? staticPaths.home
          : staticPaths.home
      );
    } catch (e: any) {
      toast.error(e?.message);
      throw e;
    }
  }, []);

  // Login with SSO
  const loginWithSSO = useCallback(async (SSOData: ISso) => {
    try {
      const {
        success,
        data: { username, token },
      } = await AuthService.loginWithSSO(SSOData);
      if (success) {
        //set token
        setToken(token);
        localStorage.setItem("accessToken", token);
        // check username to update
        setUsernameAuth(username);
        localStorage.setItem("username", username);
        if (!username) {
          return router.push(PRIVATE_PAGE_URL.CREATE_USER_NAME);
        }
        router.push(
          isRedirectToPrevPage
            ? prevRoute.current ?? staticPaths.home
            : staticPaths.home
        );
        toast.success(TOAST_MESSAGE.LOGIN_SUCCESS);
      }
    } catch (e: any) {
      toast.error(e?.message);
      throw e;
    }
  }, []);

  const logout = useCallback(() => {
    clearAuthenticatorData();
    isPrivatePath && router.push("/");
    window.location.reload();
  }, []);

  const handleRouteChange = (url: string) => {
    prevRoute.current = currentRoute.current;
    currentRoute.current = url;
  };

  // verify AccessToken
  const verifyAccessToken = async () => {
    if (verifyStatus === VERIFY_STATUS.SUCCESS) return;
    setVerifyStatus(VERIFY_STATUS.IN_PROGRESS);
    if (usernameAuth === null) return;
    getUserInfo(usernameAuth)
      .then((response) => {
        setUserInfo(response?.data);
        setVerifyStatus(VERIFY_STATUS.SUCCESS);
      })
      .catch((e) => {
        setVerifyStatus(VERIFY_STATUS.FAIL);
        // if (e.code !== 401) {
        //   notifyErrorMessage(toast, e);
        // }
        clearAuthenticatorData();
      });
  };

  const clearAuthenticatorData = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
    setUsernameAuth(null);
    localStorage.removeItem("username");

    setUserInfo(null);
    setVerifyStatus(VERIFY_STATUS.NOT_START);
    setAnonymousInfo(null);
    setAnonymousStatus(HANDLE_STATUS.NOT_START);
    // setIsRedirectToPrevPage(false);
  };

  const authContextData: AuthContextType = useMemo(
    () => ({
      userInfo,
      setUserInfo,
      anonymousInfo,
      setAnonymousInfo,
      anonymousStatus,
      setAnonymousStatus,
      token,
      setToken,
      usernameAuth,
      setUsernameAuth,
      verifyStatus,
      setVerifyStatus,
      isRedirectToPrevPage,
      setIsRedirectToPrevPage,
      prevRoute: prevRoute.current,
      loginWithEmail,
      loginWithSSO,
      logout,
    }),
    [
      userInfo,
      setUserInfo,
      anonymousInfo,
      setAnonymousInfo,
      anonymousStatus,
      setAnonymousStatus,
      token,
      setToken,
      usernameAuth,
      setUsernameAuth,
      verifyStatus,
      setVerifyStatus,
      isRedirectToPrevPage,
      setIsRedirectToPrevPage,
      prevRoute,
      loginWithEmail,
      loginWithSSO,
      logout,
    ]
  );
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
