"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Logo from "@/asset/image/Logo.png";
import {
  CasualIcon,
  CatelogyIcon,
  MenuIcon,
  NewIcon,
  RiderIcon,
  SeachIcon,
  TagIcon,
} from "@/asset/icons/icons";
import { currentUserSelector } from "@/redux-toolkit/selectors/authenticationSelector";
function AppBar() {
  const router = useRouter();
  const isCurrentUser = useSelector(currentUserSelector);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const hanldeLogin = () => {
    router.push("/login");
  };
  const handleRegister = () => {
    router.push("/register");
  };
  return (
    <div>
      <div className=" flex flex-col items-center w-[204px] rounded-[20px] bg-[rgba(15,9,45,0.7)] mr-4 mb-[3px] ">
        <Image
          className="max-w-[134px] max-h-'[72px] mt-[10px]"
          src={Logo}
          alt="Logo"
        />
        <div className="pb-4 border-b-[1px] border-main-violet-c4 ">
          <button onClick={handleToggleMenu}>
            <MenuIcon className="mr-4" width="42" height="42px" />
          </button>
          <button>
            <NewIcon className="mr-4" width="42" height="42px" />
          </button>
          <button>
            <SeachIcon width="42" height="42px" />
          </button>
        </div>
        {toggleMenu && (
          <div className=" py-7 border-b-[1px] border-main-violet-c4 animate-fadeOut animate-fadeIn ">
            <div className="border-b-[1px] border-[#8f66a2]">
              <button className="block w-full text-left mb-4">
                <RiderIcon
                  className="inline-block"
                  width="42px"
                  height="42px"
                />
                <p className="font-lato ml-[10px] text-main-whileColor inline">
                  Rider
                </p>
              </button>
              <button className="block w-full text-left mb-4">
                <CasualIcon
                  className="inline-block"
                  width="42px"
                  height="42px"
                />
                <p className="font-lato ml-[10px] text-main-whileColor inline">
                  Casual
                </p>
              </button>
            </div>
            <div className="mt-7">
              <button className="block w-full text-left mb-4">
                <CatelogyIcon className="inline" width="32px" height="32px" />
                <p className="text-sm font-lato ml-[10px] text-main-whileColor inline">
                  All Category
                </p>
              </button>
              <button className="block w-full text-left mb-4">
                <TagIcon className="inline" width="32px" height="32px" />
                <p className="text-sm font-lato ml-[10px] text-main-whileColor inline">
                  All Game Tags
                </p>
              </button>
              <button className="block w-full text-left">
                <TagIcon className="inline" width="32px" height="32px" />
                <p className="text-sm font-lato ml-[10px] text-main-whileColor inline">
                  All Article Tags
                </p>
              </button>
            </div>
          </div>
        )}
        <button
          onClick={hanldeLogin}
          className="py-[5px] px-[30px] text-main-whileColor text-base font-semibold font-nunito bg-gradient-to-br from-[#4341D1] to-[#AF1BA0] rounded-[10px] mt-[18px] mb-[3px]"
        >
          Login
        </button>
        <button
          onClick={handleRegister}
          className="text-sm text-main-violet-a7 font-nunito font-normal mb-[59px]"
        >
          Register
        </button>
        <div className="px-8 py-[6px] bg-main-pink-be rounded-[10px] mb-[11px]">
          <p className="text-2xl text-main-whileColor font-normal font-digitalfont">
            00:60:00
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
