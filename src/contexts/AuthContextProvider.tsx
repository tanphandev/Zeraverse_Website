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
import { toast } from "react-toastify";
import { staticPaths } from "@/utils/paths";
import { ISso } from "@/interface/auth/ISso";
import useNavigationEvent from "@/hooks/useNavigationEvent";
import * as AuthService from "@/services/auth.service";
import { getUserInfo } from "@/services/user.service";
import {
  AUTHEN_PAGE_URL,
  ERROR_PAGE_URL,
  MODAL_NAME,
  PRIVATE_PAGE_URL,
  TOAST_MESSAGE,
  VERIFY_STATUS,
} from "@/utils/constants";
import { IUserInfo } from "@/interface/user/IUserInfo";
import { useModalContext } from "./ModalContextProvider";

type AuthContextType = {
  userInfo: IUserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
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
  // const [activitiesInfo, setActivitiesInfo] = useState();
  // const [anonymousInfo, setAnonymousInfo] = useState();
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

  //Loading
  const { openModal, closeModal } = useModalContext();

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

    !isLogged() && clearAuthenticatorData();

    if (isLogged()) {
      isAuthenPath && router.push("/");
    } else {
      isPrivatePath && router.push("/login");
    }
  }, [pathname]);

  // handle Login With Email and Password
  const loginWithEmail = useCallback(async (loginFormData: IAuthFormData) => {
    try {
      //call api login with email
      openModal(MODAL_NAME.LOADING);
      const {
        success,
        data: { token, username },
      } = await AuthService.loginWithEmail(loginFormData);
      //show toast
      if (success) {
        closeModal();
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
      closeModal();
      toast.error(e?.message);
      throw e;
    }
  }, []);

  // Login with SSO
  const loginWithSSO = useCallback(async (SSOData: ISso) => {
    try {
      openModal(MODAL_NAME.LOADING);
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
        closeModal();
        toast.success(TOAST_MESSAGE.LOGIN_SUCCESS);
      }
    } catch (e: any) {
      closeModal();
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
    // setIsRedirectToPrevPage(false);
  };

  const isLogged = () => {
    if (typeof window === "undefined") return false;

    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");

    return !!accessToken && !!username;
  };

  const authContextData: AuthContextType = useMemo(
    () => ({
      userInfo,
      setUserInfo,
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
