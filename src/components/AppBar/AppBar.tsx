"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import UserOption from "./UserOptions";
import UserBar from "./UserBar";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { MODAL_NAME } from "@/utils/constants";
import { staticPaths } from "@/utils/paths";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import Logo from "@/asset/image/Logo.png";
import MenuIcon from "@/asset/icons/MenuIcon";
import NewIcon from "@/asset/icons/NewsIcon";
import SeachIcon from "@/asset/icons/SearchIcon";
import RiderIcon from "@/asset/icons/RiderIcon";
import CasualIcon from "@/asset/icons/CasualIcon";
import GameIcon from "@/asset/icons/GameIcon";
import CatelogyIcon from "@/asset/icons/CategoryIcon";
import TagIcon from "@/asset/icons/TagIcon";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
function AppBar() {
  const { userInfo } = useAuthContext();
  const { openModal } = useModalContext();
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [visibleUserOption, setVisibleUserOption] = useState(false);
  const showUserOption = () => setVisibleUserOption(true);
  const hideUserOption = () => setVisibleUserOption(false);

  //toggle menu
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  // open search Modal
  const openSeachModal = () => {
    openModal(MODAL_NAME.SEARCH);
  };
  return (
    <div>
      <div className=" flex flex-col items-center w-[204px] rounded-[20px] bg-[rgba(15,9,45,0.7)] mr-4 mb-[16px] ">
        <Link href={staticPaths.home}>
          <Image
            className="max-w-[134px] max-h-'[72px] mt-[10px] cursor-pointer"
            src={Logo}
            alt="Logo"
          />
        </Link>
        <div className="pb-4 border-b-[1px] border-main-violet-c4">
          <button onClick={handleToggleMenu}>
            <MenuIcon className="mr-4" width="42" height="42px" />
          </button>
          <Link className="inline-block" href={staticPaths.article}>
            <NewIcon className="mr-4" width="42" height="42px" />
          </Link>
          <button onClick={openSeachModal}>
            <SeachIcon
              width="42"
              height="42px"
              className="text-main-violet-c4"
            />
          </button>
        </div>
        {/* toggle menu */}
        <div
          id="menu"
          className={`relative ${
            toggleMenu ? "show-menu" : ""
          } h-0 opacity-0 overflow-hidden transition-all duration-500 border-b-[1px] border-main-violet-c4`}
        >
          <div className="border-b-[1px] border-[#8f66a2] mt-7">
            <button className="block w-full text-left mb-4">
              <RiderIcon className="inline-block" width="42px" height="42px" />
              <p className="font-lato ml-[10px] text-main-whileColor inline hover:text-main-violet-a7">
                Rider
              </p>
            </button>
            <button className="block w-full text-left mb-4">
              <CasualIcon className="inline-block" width="42px" height="42px" />
              <p className="font-lato ml-[10px] text-main-whileColor inline hover:text-main-violet-a7">
                Casual
              </p>
            </button>
          </div>
          <div className="mt-7">
            <Link
              href={staticPaths.hall_of_fame}
              className="block w-full text-left mb-4"
            >
              <GameIcon className="inline" width="32px" height="32px" />
              <p className="text-sm font-lato ml-[10px] text-main-whileColor inline hover:text-main-violet-a7">
                Hall Of Fame
              </p>
            </Link>
            <Link
              href={staticPaths.game_category_all}
              className="block w-full text-left mb-4"
            >
              <CatelogyIcon className="inline" width="32px" height="32px" />
              <p className="text-sm font-lato ml-[10px] text-main-whileColor inline hover:text-main-violet-a7">
                Game Categor
              </p>
            </Link>
            <Link
              href={staticPaths.article_category}
              className="block w-full text-left mb-4"
            >
              <CatelogyIcon className="inline" width="32px" height="32px" />
              <p className="text-sm font-lato ml-[10px] text-main-whileColor inline hover:text-main-violet-a7">
                Article Category
              </p>
            </Link>
            <button className="block w-full text-left mb-4">
              <TagIcon className="inline" width="32px" height="32px" />
              <p className="text-sm font-lato ml-[10px] text-main-whileColor inline hover:text-main-violet-a7">
                All Game Tags
              </p>
            </button>
            <button className="block w-full text-left mb-7">
              <TagIcon className="inline" width="32px" height="32px" />
              <p className="text-sm font-lato ml-[10px] text-main-whileColor inline hover:text-main-violet-a7">
                All Article Tags
              </p>
            </button>
          </div>
        </div>
        {!!userInfo ? (
          <Tippy
            interactive={true}
            placement="bottom"
            onClickOutside={hideUserOption}
            visible={visibleUserOption}
            render={(attrs) => (
              <UserOption hideUserOption={hideUserOption} {...attrs} />
            )}
          >
            <div onClick={visibleUserOption ? hideUserOption : showUserOption}>
              <div className="flex flex-col items-center mt-[9px] cursor-pointer">
                <CustomImage
                  className="rounded-[10px]"
                  src={userInfo?.avatar}
                  fallback={images.default_profile_image}
                  width={94}
                  height={94}
                  alt="ProfilePicture"
                />
                <p className="text-base font-medium leading-[1.8] font-lato text-main-whileColor">
                  {userInfo?.username}
                </p>
              </div>
            </div>
          </Tippy>
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
        <div className="relative group px-8 py-[6px] bg-main-pink-be  shadow-[inset_-2px_-2px_1px] shadow-[#d5358d] rounded-[10px] mb-[11px]">
          <p className="text-2xl text-main-whileColor font-normal font-digitalfont ">
            00:60:00
          </p>
          {/* Purchase more time */}
          <Link
            href={"/simple-shop"}
            className="hidden absolute top-0 bottom-0 left-0 right-0 group-hover:flex justify-center items-center rounded-[10px] bg-gradient-to-b from-[#3d0ca5] to-[#de22cb] cursor-pointer"
          >
            <p className="text-sm font-nunito font-semibold text-main-whileColor">
              Purchase more time
            </p>
          </Link>
        </div>
      </div>
      {!!userInfo && <UserBar zera={userInfo?.zera} />}
    </div>
  );
}

export default AppBar;
