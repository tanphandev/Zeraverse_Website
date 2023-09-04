"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Logo from "@/asset/image/Logo.png";
import AuthForm from "@/components/Auth/AuthForm";
import * as AuthService from "@/services/auth.service";
import { AUTHEN_PAGE_URL, TOAST_MESSAGE } from "@/utils/constants";

function RegisterPage() {
  const router = useRouter();
  const handleRegister = async (registerData: IAuthFormData) => {
    try {
      const { data, success } = await AuthService.registerWithEmail(
        registerData
      );
      if (success) {
        router.push(AUTHEN_PAGE_URL.LOGIN);
        toast.success(TOAST_MESSAGE.CHECK_EMAIL);
      }
      return data;
    } catch (e: any) {
      toast.error(e.message);
      throw e;
    }
  };
  return (
    <div className="inline-block bg-main-grayColor-70 rounded-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center px-[61px] pt-[17px] pb-[40px] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)] shadow-main-whileColor-30">
      <Image className="w-[200px] h-[108px] mb-4" src={Logo} alt="Logo" />
      <AuthForm handleSubmit={handleRegister} type="Register" />
    </div>
  );
}

export default RegisterPage;
