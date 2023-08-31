"use client";
import Image from "next/image";
import Logo from "@/asset/image/Logo.png";
import successAuth from "@/asset/image/successAuth.png";
import failedAuth from "@/asset/image/failedAuth.png";
import AuthForm from "@/components/Auth/AuthForm";
import { useState } from "react";

function LoginPage() {
  const [isShowForm, setIsShowForm] = useState<boolean>(true);
  const [loginStatus, setLoginStatus] = useState<string>("success");
  const Confirm = () => {
    return (
      <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
        {loginStatus === "success" ? (
          <>
            <Image
              width={405}
              height={416}
              className="mb-[2px]"
              src={successAuth}
              alt="success"
            />
            <h2 className="text-[40px] font-bold font-nunito text-[#04CD00] mb-[9px]">
              Verify success !
            </h2>
            <button className="text-base font-bold font-nunito leading-[1.6] text-main-whileColor px-[30px] py-[5px] bg-gradient-to-b from-[#979BFF] via-[#cb5cf7] to-[#EF36C6] rounded-[30px]">
              Let’s Play
            </button>
          </>
        ) : (
          <>
            <Image
              width={405}
              height={416}
              className="mb-[2px]"
              src={failedAuth}
              alt="failed"
            />
            <h2 className="text-[40px] font-bold font-nunito text-[#FF0303] mb-[9px]">
              Verify success !
            </h2>
            <button className="text-base font-bold font-nunito leading-[1.6] text-main-whileColor px-[30px] py-[5px] bg-gradient-to-b from-[#979BFF] via-[#cb5cf7] to-[#EF36C6] rounded-[30px]">
              Back home
            </button>
          </>
        )}
      </div>
    );
  };
  return (
    <>
      {isShowForm === true ? (
        <div className="inline-block bg-main-grayColor-70 rounded-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center px-[61px] pt-[17px] pb-[40px] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)] shadow-main-whileColor-30">
          <Image className="w-[200px] h-[108px] mb-4" src={Logo} alt="Logo" />
          <AuthForm type="Login" />
        </div>
      ) : (
        <Confirm />
      )}
    </>
  );
}

export default LoginPage;
