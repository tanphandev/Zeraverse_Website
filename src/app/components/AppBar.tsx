"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Logo from "@/asset/image/Logo.png";
import ProfilePicture from "@/asset/image/profilePicture.png";
import { currentUserSelector } from "@/redux-toolkit/selectors/authenticationSelector";
import UserBar from "./UserBar";
import { searchSlice } from "@/redux-toolkit/slices/searchSlice";
import {
  CasualIcon,
  CatelogyIcon,
  MenuIcon,
  NewIcon,
  RiderIcon,
  SeachIcon,
  TagIcon,
} from "@/asset/icons/icons";
import Link from "next/link";
function AppBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isCurrentUser = useSelector(currentUserSelector);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  //toggle menu
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  // dispatch action to open SearchModal
  const openSeachModal = () => {
    dispatch(searchSlice.actions.setIsSeachModal(true));
  };
  //Go to Game Game Category
  const GotoGameCategoryAllPage = () => {
    router.push("/game-category-all");
  };
  //Go to Article Category
  const GotoAllArticleCategoryPage = () => {
    router.push("/article-category-all");
  };
  // Go to Home
  const GotoHome = () => {
    router.push("/home");
  };
  return (
    <div>
      <div className=" flex flex-col items-center w-[204px] rounded-[20px] bg-[rgba(15,9,45,0.7)] mr-4 mb-[16px] ">
        <Image
          onClick={GotoHome}
          className="max-w-[134px] max-h-'[72px] mt-[10px] cursor-pointer"
          src={Logo}
          alt="Logo"
        />
        <div className="pb-4 border-b-[1px] border-main-violet-c4 ">
          <button onClick={handleToggleMenu}>
            <MenuIcon className="mr-4" width="42" height="42px" />
          </button>
          <Link className="inline-block" href={"/news"}>
            <NewIcon className="mr-4" width="42" height="42px" />
          </Link>
          <button onClick={openSeachModal}>
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
              <button
                onClick={GotoGameCategoryAllPage}
                className="block w-full text-left mb-4"
              >
                <CatelogyIcon className="inline" width="32px" height="32px" />
                <p className="text-sm font-lato ml-[10px] text-main-whileColor inline">
                  Game Category
                </p>
              </button>
              <button
                onClick={GotoAllArticleCategoryPage}
                className="block w-full text-left mb-4"
              >
                <CatelogyIcon className="inline" width="32px" height="32px" />
                <p className="text-sm font-lato ml-[10px] text-main-whileColor inline">
                  Article Category
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
        {isCurrentUser ? (
          <Link href={"/user"}>
            <div className="mt-[9px] cursor-pointer">
              <Image
                className="rounded-[10px]"
                src={ProfilePicture}
                width={94}
                height={94}
                alt="ProfilePicture"
              />
              <p className="text-base font-medium leading-[1.8] font-lato text-main-whileColor">
                TanPhanDev
              </p>
            </div>
          </Link>
        ) : (
          <>
            <Link
              href={"/login"}
              className="py-[5px] px-[30px] text-main-whileColor text-base font-semibold font-nunito bg-gradient-to-br from-[#4341D1] via-[#BB37AE] to-[#AF1BA0] shadow-[inset_-2px_-2px_1px_rgba(0,0,0,0.3)] rounded-[10px] mt-[18px] mb-[3px]"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="text-sm text-main-violet-a7 font-nunito font-normal mb-[59px] leading-[1.6]"
            >
              Register
            </Link>
          </>
        )}
        <div className="px-8 py-[6px] bg-main-pink-be  shadow-[inset_-2px_-2px_1px] shadow-[#d5358d] rounded-[10px] mb-[11px]">
          <p className="text-2xl text-main-whileColor font-normal font-digitalfont ">
            00:60:00
          </p>
        </div>
      </div>
      {isCurrentUser && <UserBar />}
    </div>
  );
}

export default AppBar;
