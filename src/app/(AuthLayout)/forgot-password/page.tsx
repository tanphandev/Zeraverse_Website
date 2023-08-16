"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/asset/image/Logo.png";
function ForgotPassword() {
  const router = useRouter();
  const handleOnClickLogin = () => {
    router.push("/login");
  };
  return (
    <div className="inline-block bg-main-grayColor-70 rounded-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center px-[61px] pt-[17px] pb-[40px]  shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)] shadow-main-whileColor-30">
      <Image className="w-[200px] h-[108px] mb-4" src={Logo} alt="Logo" />
      <div className="text-main-whileColor font-lato">
        <h1 className="text-[28px] font-bold mb-[25px] border-b-[1px] border-main-violet-7c pb-1">
          Submit to your email
        </h1>
        <label
          htmlFor="forgot-password"
          className="text-base font-bold leading-[1.6] block"
        >
          Please enter your email
        </label>
        <input
          id="forgot-password"
          className="bg-main-violet-ed text-main-blackColor w-[400px] h-[45px] rounded-[10px] outline-none px-3 mb-[25px]"
        />
        <div className="flex justify-end">
          <button
            onClick={handleOnClickLogin}
            className="text-[#898989] text-base font-bold leading-[1.6] px-[29px] py-[5px] bg-main-whileColor rounded-[20px] mr-4"
          >
            Back
          </button>
          <button className="text-main-whileColor text-base font-bold leading-[1.6] px-[40px] py-[5px] bg-gradient-to-br from-[#F265E4] via-[#7270FF] to-[#5200FF] rounded-[20px]">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
