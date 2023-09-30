"use client";
import Image from "next/image";
import Logo from "@/../public/asset/image/Logo.png";
import { useState } from "react";
import HidePasswordIcon from "@/asset/icons/HidePasswordIcon";
import ShowPasswordIcon from "@/asset/icons/ShowPasswordIcon";

type PasswordVisible = {
  isNewPasswordVisible: boolean;
  isConfirmPasswordVisible: boolean;
};

function ResetPassword() {
  const [passwordVisible, setPasswordVisible] = useState<PasswordVisible>({
    isNewPasswordVisible: false,
    isConfirmPasswordVisible: false,
  });
  //toggle New Password Visibility event
  const toggleNewPasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPasswordVisible((prev) => ({
      ...prev,
      isNewPasswordVisible: !prev.isNewPasswordVisible,
    }));
  };

  //toggle New Password Visibility event
  const toggleConfirmPasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPasswordVisible((prev) => ({
      ...prev,
      isConfirmPasswordVisible: !prev.isConfirmPasswordVisible,
    }));
  };
  return (
    <div className="inline-block bg-main-grayColor-70 rounded-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center px-[61px] pt-[17px] pb-[40px]  shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)] shadow-main-whileColor-30">
      <Image className="w-[200px] h-[108px] mb-4" src={Logo} alt="Logo" />
      <div className="text-main-whileColor font-lato">
        <h1 className="text-[28px] font-bold mb-[25px] border-b-[1px] border-main-violet-7c pb-1">
          Reset Password
        </h1>
        <label
          htmlFor="newpass"
          className="text-base font-bold leading-[1.6] block"
        >
          New Password
        </label>
        <div className="relative mb-[10px]">
          <input
            type={passwordVisible.isNewPasswordVisible ? "text" : "password"}
            id="newpass"
            className="bg-main-violet-ed text-main-blackColor w-[400px] h-[45px] rounded-[10px] outline-none px-3"
          />
          <button
            onClick={toggleNewPasswordVisibility}
            className="absolute top-1/2 right-[10px] -translate-y-1/2"
          >
            {passwordVisible.isNewPasswordVisible ? (
              <HidePasswordIcon width="20px" height="20px" />
            ) : (
              <ShowPasswordIcon width="20px" height="20px" />
            )}
          </button>
        </div>
        <label
          htmlFor="confirmpass"
          className="text-base font-bold leading-[1.6] block"
        >
          Confirm Password
        </label>
        <div className="relative mb-[25px]">
          <input
            type={
              passwordVisible.isConfirmPasswordVisible ? "text" : "password"
            }
            id="confirmpass"
            className="bg-main-violet-ed text-main-blackColor w-[400px] h-[45px] rounded-[10px] outline-none px-3"
          />
          <button
            onClick={toggleConfirmPasswordVisibility}
            className="absolute top-1/2 right-[10px] -translate-y-1/2"
          >
            {passwordVisible.isConfirmPasswordVisible ? (
              <HidePasswordIcon width="20px" height="20px" />
            ) : (
              <ShowPasswordIcon width="20px" height="20px" />
            )}
          </button>
        </div>
        <div className="flex justify-end">
          <button className="text-main-whileColor text-base font-bold leading-[1.6] px-[40px] py-[5px] bg-gradient-to-br from-[#F265E4] via-[#7270FF] to-[#5200FF] rounded-[20px]">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
