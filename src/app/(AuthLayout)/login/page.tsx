"use client";
import Image from "next/image";
import Logo from "@/asset/image/Logo.png";
import AuthForm from "@/components/Auth/AuthForm";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { ISso } from "@/interface/auth/ISso";
import { SSO_METHOD } from "@/utils/constants";
import { useRouter } from "next/navigation";

function LoginPage() {
  const { loginWithEmail, loginWithSSO } = useAuthContext();
  const { data: session } = useSession();
  const router = useRouter();
  const handleLoginWithEmail = (loginFormData: IAuthFormData) => {
    loginWithEmail(loginFormData);
  };
  // login with Google or Facebook
  useEffect(() => {
    if (session?.user.provider === "google") {
      const googleData: ISso = {
        method: SSO_METHOD.GOOGLE,
        token: session.user.token_id,
      };
      loginWithSSO(googleData);
    }
    if (session?.user.provider === "facebook") {
      const facebookData: ISso = {
        method: SSO_METHOD.FACEBOOK,
        token: session.user.token_id,
      };
      loginWithSSO(facebookData);
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
