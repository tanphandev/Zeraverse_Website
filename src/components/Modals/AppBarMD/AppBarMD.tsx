"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { MODAL_NAME } from "@/utils/constants";
import { staticPaths } from "@/utils/paths";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import Logo from "@/../public/asset/image/Logo.png";
import MenuIcon from "@/asset/icons/MenuIcon";
import NewIcon from "@/asset/icons/NewsIcon";
import SeachIcon from "@/asset/icons/SearchIcon";
import RiderIcon from "@/asset/icons/RiderIcon";
import CasualIcon from "@/asset/icons/CasualIcon";
import GameIcon from "@/asset/icons/GameIcon";
import CatelogyIcon from "@/asset/icons/CategoryIcon";
import TagIcon from "@/asset/icons/TagIcon";
import { images } from "@/asset/image/images";
import { useSocketContext } from "@/contexts/SocketContextProvider";
import CustomImage from "@/components/Others/CustomImage";
import UserOption from "@/components/AppBar/UserOptions";
import UserBar from "@/components/AppBar/UserBar";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import { sleep } from "@/utils/helper";
type Props = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};
function AppBarMD({ setIsShow }: Props) {
  const appBarMDRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useAuthContext();
  const { openModal } = useModalContext();
  const { remainingTime } = useSocketContext();
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [visibleUserOption, setVisibleUserOption] = useState(false);
  const showUserOption = () => setVisibleUserOption(true);
  const hideUserOption = () => setVisibleUserOption(false);

  useOnClickOutside(appBarMDRef, () => {
    const tempRef = document.getElementById("app-bar-md");
    tempRef?.classList.add("hide");
    sleep(500).then(() => {
      setIsShow(false);
    });
  });
  //toggle menu
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  // open search Modal
  const openSeachModal = () => {
    openModal(MODAL_NAME.SEARCH);
  };
  return (
    <div
      id="app-bar-md"
      className="transition-all duration-500 animate-fadeIn_20 fixed z-20 top-0 backdrop-blur-[10px] flex rounded-[20px] h-[340px] mt-4"
      ref={appBarMDRef}
    >
      <div className="overflow-y-scroll no-scrollbar flex flex-col items-center w-[204px] rounded-[20px] bg-[#00000080] mr-4">
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
          } h-0 opacity-0 transition-all duration-500 border-b-[1px] border-main-violet-c4`}
        >
          <div className="border-b-[1px] border-[#8f66a2] mt-7">
            <button className="block w-full text-left mb-4">
              <RiderIcon
                className="inline-block text-main-whileColor-50"
                width="42px"
                height="42px"
              />
              <p className="font-lato ml-[10px] text-main-whileColor-50 inline">
                Rider
              </p>
            </button>
            <button className="block w-full text-left mb-4">
              <CasualIcon
                className="inline-block text-main-whileColor-50"
                width="42px"
                height="42px"
              />
              <p className="font-lato ml-[10px] text-main-whileColor-50 inline">
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
              href={staticPaths.game_category}
              className="block w-full text-left mb-4"
            >
              <CatelogyIcon className="inline" width="32px" height="32px" />
              <p className="text-sm font-lato ml-[10px] text-main-whileColor inline hover:text-main-violet-a7">
                Game Category
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
              <TagIcon
                className="inline text-main-whileColor-50"
                width="32px"
                height="32px"
              />
              <p className="text-sm font-lato ml-[10px] text-main-whileColor-50 inline">
                All Game Tags
              </p>
            </button>
            <button className="block w-full text-left mb-7">
              <TagIcon
                className="inline text-main-whileColor-50"
                width="32px"
                height="32px"
              />
              <p className="text-sm font-lato ml-[10px] text-main-whileColor-50 inline">
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
                  className="w-[94px] h-[94px] object-cover rounded-[10px]"
                  src={userInfo?.avatar}
                  fallback={images.default_profile_image}
                  width={0}
                  height={0}
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
            {remainingTime.hours}:{remainingTime.minutes}:
            {remainingTime.seconds}
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

export default AppBarMD;
