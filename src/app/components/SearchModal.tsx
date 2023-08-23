"use client";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeftIcon, LogoIcon, SeachIcon } from "@/asset/icons/icons";
import gamePicture from "@/asset/image/game0.png";
import Image from "next/image";
import { isOpenSearchModalSelector } from "@/redux-toolkit/selectors/searchSelector";
import { searchSlice } from "@/redux-toolkit/slices/searchSlice";

function SearchModal() {
  const dispatch = useDispatch();
  const isOpenSeachModal = useSelector(isOpenSearchModalSelector);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const suggestSearchs = [
    "CAR GAME",
    ".IO GAME",
    "GAME FOR GIRL",
    "SHOOTING GAME",
    "2 PLAYER",
    "SPORT GAME",
    "RATCING GAME",
    "COOKING GAME",
  ];
  const popularGames = [
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
  ];

  const recentlyPlayeds = [
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
    {
      name: "name",
      image: gamePicture,
    },
  ];
  const CloseSearchModal = () => {
    searchBoxRef.current?.classList.add("hide");
    setTimeout(() => {
      dispatch(searchSlice.actions.setIsSeachModal(false));
    }, 500);
  };
  return (
    <div
      ref={searchWrapperRef}
      className="seach-wapper fixed top-0 right-0 bottom-0 left-0 bg-main-grayColor-50 backdrop-blur-sm animate-fadeIn"
    >
      <div
        ref={searchBoxRef}
        className="relative search-box transition-transform bg-main-violet-c4-50 inline-block pl-[27px] pr-[17px] h-full animate-slipLeftToRight "
      >
        <button onClick={CloseSearchModal}>
          <ArrowLeftIcon
            className="absolute top-[46px] right-0 translate-x-1/2 cursor-pointer"
            width="64px"
            height="64px"
          />
        </button>
        <div className="relative mt-[46px] mb-[17px] inline-block">
          <LogoIcon
            className="absolute top-1/2 left-3 -translate-y-1/2 "
            width="42px"
            height="37px"
          />
          <input
            className="w-[602px] h-[64px] rounded-[15px] text-main-violet-5b bg-main-whileColor text-[22px] placeholder-main-violet-c4 font-bold font-nunito pl-20 pr-[62px] outline-none"
            placeholder="What are you playing today?"
          />
          <SeachIcon
            className="absolute top-1/2 right-[7px] -translate-y-1/2 text-main-violet-8b"
            width="42px"
            height="42px"
          />
        </div>
        <ul className="w-[644px] overflow-hidden overflow-x-scroll no-scrollbar flex mb-[27px]">
          {suggestSearchs.map((suggestSearch, index) => {
            return (
              <li
                className="px-5 py-2 bg-main-whileColor rounded-[20px] inline-block mr-[11px]"
                key={index}
              >
                <p className="text-xs font-bold font-nunito text-main-blackColor whitespace-nowrap">
                  {suggestSearch}
                </p>
              </li>
            );
          })}
        </ul>
        <h2 className="text-2xl font-bold font-nunito text-main-whileColor mb-4">
          Popular this week
        </h2>
        {/* Popular game list */}
        <ul className="w-[644px] overflow-hidden overflow-x-scroll no-scrollbar flex mb-[27px]">
          {popularGames.map((popularGame, index) => {
            return (
              <li className="rounded-[10px] mr-4" key={index}>
                {
                  <Image
                    className="min-w-[94px] w-[94px]"
                    src={popularGame.image}
                    alt="gamepicture"
                  />
                }
              </li>
            );
          })}
        </ul>
        <h2 className="text-2xl font-bold font-nunito text-main-whileColor mb-4">
          Recently played
        </h2>
        {/* recently played */}
        <ul className="w-[644px] overflow-hidden overflow-x-scroll no-scrollbar flex mb-[27px]">
          {recentlyPlayeds.map((recentlyPlayed, index) => {
            return (
              <li className="rounded-[10px] mr-4" key={index}>
                {
                  <Image
                    className="min-w-[94px] w-[94px]"
                    src={recentlyPlayed.image}
                    alt="gamepicture"
                  />
                }
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SearchModal;
