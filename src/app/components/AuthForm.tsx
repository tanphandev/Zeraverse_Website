"use client";
import FacebookColorIcon from "@/asset/icons/FacebookColorIcon";
import GoogleIcon from "@/asset/icons/GoogleIcon";
import HidePasswordIcon from "@/asset/icons/HidePasswordIcon";
import ShowPasswordIcon from "@/asset/icons/ShowPasswordIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AuthForm({ type }: { type: string }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const handleOnClickForgotPass = () => {
    router.push("/forgot-password");
  };

  const handleOnClickRegister = () => {
    router.push("/register");
  };

  const handleOnClickLogin = () => {
    router.push("/login");
  };

  //toggle Password Visibility event
  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <form className="text-main-whileColor font-lato">
      <div className="mb-[10px]">
        <label htmlFor="email" className="text-base font-bold block">
          Email
        </label>
        <input
          id="email"
          className="bg-main-violet-ed text-main-blackColor w-[400px] h-[45px] rounded-[10px] outline-none px-3"
        />
      </div>
      <div className="mb-1">
        <label htmlFor="password" className="text-base font-bold block">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            className="bg-main-violet-ed text-main-blackColor w-[400px] h-[45px] rounded-[10px] outline-none px-3"
          />
          <button
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-[10px] -translate-y-1/2"
          >
            {isPasswordVisible ? (
              <HidePasswordIcon width="20px" height="20px" />
            ) : (
              <ShowPasswordIcon width="20px" height="20px" />
            )}
          </button>
        </div>
      </div>
      {type === "Login" ? (
        <div className="flex justify-end">
          <p
            onClick={handleOnClickForgotPass}
            className="inline text-sm font-semibold text-right text-main-violet-c4 mb-[15px] hover:text-[#6664ed] cursor-pointer"
          >
            Forgot the password ?
          </p>
        </div>
      ) : (
        <div className="flex text-center justify-center mb-[14px]">
          <input type="checkbox" className="mr-[5px]" />
          <p className="text-xs inline-block">
            I accept the{" "}
            <span className="text-main-violet-c4">Terms & Conditions</span> and{" "}
            <span className="text-main-violet-c4">Privacy</span>
          </p>
        </div>
      )}
      <button className="w-full h-[36px] rounded-[20px] bg-gradient-to-br from-[#F265E4] via-[#7270FF] to-[#5200FF] mb-[11px]">
        {type}
      </button>
      <p className="text-sm font-semibold mb-[7px] text-center">
        or sign in with
      </p>
      <div className="flex justify-between mb-[16px]">
        <button className="bg-main-whileColor rounded-[20px] px-[19px] py-2">
          <GoogleIcon
            className="inline-block mr-[10px]"
            width="25px"
            height="25px"
          />{" "}
          <p className="text-xs font-normal inline-block text-main-blackColor">
            Continue with Google
          </p>
        </button>
        <button className="bg-main-whileColor rounded-[20px] px-[19px] py-2">
          <FacebookColorIcon
            className="inline-block mr-[10px]"
            width="25px"
            height="25px"
          />
          <p className="text-xs font-normal inline-block text-main-blackColor">
            Continue with Facebook
          </p>
        </button>
      </div>
      {type === "Login" ? (
        <p className="text-base font-bold text-center">
          No account yet?
          <span
            onClick={handleOnClickRegister}
            className=" text-main-violet-c4 ml-4 cursor-pointer hover:text-[#6664ed]"
          >
            Register Now!
          </span>
        </p>
      ) : (
        <p className="text-base font-bold text-center">
          Already registered?
          <span
            onClick={handleOnClickLogin}
            className=" text-main-violet-c4 ml-4 hover:text-[#6664ed] cursor-pointer"
          >
            Sign in
          </span>
        </p>
      )}
    </form>
  );
}

export default AuthForm;
