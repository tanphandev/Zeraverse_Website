"use client";
import Image from "next/image";
import Logo from "@/asset/image/Logo.png";
import AuthForm from "@/components/Auth/AuthForm";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ISso } from "@/interface/auth/ISso";
import { GLOBAL_MODAL_NAME, SSO_METHOD } from "@/utils/constants";
import { useModalContext } from "@/contexts/ModalContextProvider";

function LoginPage() {
  const { loginWithEmail, loginWithSSO } = useAuthContext();
  const { openGlobalModal, closeGlobalModal } = useModalContext();
  const { data: session } = useSession();
  const handleLoginWithEmail = async (loginFormData: IAuthFormData) => {
    openGlobalModal(GLOBAL_MODAL_NAME.LOADING);
    try {
      await loginWithEmail(loginFormData);
    } catch (e: any) {
      closeGlobalModal();
      throw e;
    }
    closeGlobalModal();
  };
  // login with Google or Facebook
  useEffect(() => {
    if (session?.user.provider === "google") {
      openGlobalModal(GLOBAL_MODAL_NAME.LOADING);
      const googleData: ISso = {
        method: SSO_METHOD.GOOGLE,
        token: session.user.token_id,
      };
      loginWithSSO(googleData)
        .then(() => {
          closeGlobalModal();
        })
        .catch((e: any) => {
          throw e;
          closeGlobalModal();
        });
    }
    if (session?.user.provider === "facebook") {
      openGlobalModal(GLOBAL_MODAL_NAME.LOADING);
      const facebookData: ISso = {
        method: SSO_METHOD.FACEBOOK,
        token: session.user.token_id,
      };
      loginWithSSO(facebookData)
        .then(() => {
          closeGlobalModal();
        })
        .catch((e: any) => {
          throw e;
          closeGlobalModal();
        });
    }
  }, [session]);
  return (
    <>
      <div className="inline-block bg-main-grayColor-70 rounded-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center px-[61px] pt-[17px] pb-[40px] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)] shadow-main-whileColor-30">
        <Image className="w-[200px] h-[108px] mb-4" src={Logo} alt="Logo" />
        <AuthForm handleSubmit={handleLoginWithEmail} type="Login" />
      </div>
    </>
  );
}

export default LoginPage;
