"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Ads1 from "@/asset/image/ads1.png";
import Ads2 from "@/asset/image/ads2.png";
import Ads3 from "@/asset/image/ads3.png";
import Thanks from "@/asset/image/thanks.png";
import Avatar from "@/asset/image/profilePicture.png";
import GamePic from "@/asset/image/game1.png";
import linkedin from "@/asset/image/linkedin.png";
import facebook from "@/asset/image/facebook.png";
import twitter from "@/asset/image/twitter.png";
import gmail from "@/asset/image/gmail.png";
import Video from "@/asset/image/video.png";
import hallofframe1 from "@/asset/image/hallofframe1.png";
import hallofframe2 from "@/asset/image/hallofframe2.png";
import hallofframe3 from "@/asset/image/hallofframe3.png";
import CoinIcon from "@/asset/icons/CoinIcon";
import SendIcon from "@/asset/icons/SendIcon";
import PauseIcon from "@/asset/icons/PauseIcon";
import HeartIcon from "@/asset/icons/HeartIcon";
import AddPlayListIcon from "@/asset/icons/AddPlayListIcon";
import ExpandIcon from "@/asset/icons/ExpandIcon";
import ReportIcon from "@/asset/icons/ReportIcon";
import * as gameService from "@/services/game.service";
import { IGameDetail } from "@/interface/games/IGameDetail";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import IGame from "@/interface/games/IGame";
type Props = {
  params: {
    "game-slug": string;
  };
};
function GameScreen({ params }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [gameDetail, setGameDetail] = useState<IGameDetail | null>(null);
  const categorySlugOfGameDetail = gameDetail?.game_category?.slug ?? null;
  const relativeGames =
    useSelector<RootState>(
      (state: any) =>
        state?.game?.game[`${categorySlugOfGameDetail}`]?.detail as IGame[]
    ) ?? null;
  console.log("categoryOfGameDetail", categorySlugOfGameDetail);
  console.log("relativeGames boolean", !relativeGames);
  console.log("gameDetail", gameDetail);
  useEffect(() => {
    gameService
      .getGameDetail(params["game-slug"])
      .then((gameDetail: IGameDetail) => {
        setGameDetail(gameDetail);
        !relativeGames &&
          dispatch(gameService.getGame(gameDetail?.game_category?.slug));
      })
      .catch((e: any) => {
        throw e;
      });
  }, []);
  return (
    <div className="mb-10">
      {/* Part 1 */}
      <div className="grid grid-cols-11 gap-4">
        <div className="col-span-8 grid grid-cols-8 gap-4 ">
          <div className="col-span-1 bg-gradient-to-b from-[#4c265f] to-[#96328f] rounded-[10px]">
            <Image src={Ads1} alt="ads" className="w-full h-full" />
          </div>
          <div className="col-span-7 grid grid-cols-7 grid-rows-7 gap-4">
            <div className="flex flex-col col-span-7 row-span-5 bg-main-violet-ed text-main-blackColor rounded-[10px]">
              {/* <Image
                src={Screen}
                alt="screen"
                className="rounded-t-[10px] flex-1"
              /> */}
              <iframe
                src={gameDetail?.play_url}
                className="w-full h-full"
              ></iframe>
              <div className="flex justify-between px-[14px] py-2 bg-[#373737] rounded-b-[10px]">
                <div className="flex items-center">
                  <PauseIcon width="32px" height="32px" />
                  <Image
                    src={GamePic}
                    alt="gamepic"
                    width={50}
                    height={50}
                    className="mx-[12px]"
                  />
                  <h2 className="text-base font-bold font-lato text-main-whileColor">
                    Game Title
                  </h2>
                </div>
                <div className="flex items-center">
                  <div>
                    <div className="py-[2px] px-3 bg-[#5B5B5B] rounded-[12px]">
                      <p className="text-base font-semibold text-main-whileColor pb-[2px] ">
                        00 : 00 : 00
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <HeartIcon width="32px" height="32px" className="ml-4" />
                    <AddPlayListIcon
                      width="32px"
                      height="32px"
                      className="ml-4"
                    />
                    <ExpandIcon width="32px" height="32px" className="ml-4" />
                    <ReportIcon width="32px" height="32px" className="ml-4" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 flex flex-col justify-end items-center bg-main-pink-83 border-[1px] border-main-pink-f9 rounded-[10px] pb-[18px]">
              <h2 className="text-base font-bold leading-[1.6] font-lato text-main-whileColor mb-[3px]">
                Share
              </h2>
              <div className="flex justify-between">
                <Image
                  src={linkedin}
                  alt="linkedin"
                  width={37}
                  height={37}
                  className="mr-10"
                />
                <Image
                  src={facebook}
                  alt="facebook"
                  width={37}
                  height={37}
                  className="mr-10"
                />
                <Image
                  src={twitter}
                  alt="twitter"
                  width={37}
                  height={37}
                  className="mr-10"
                />
                <Image src={gmail} alt="gmail" width={37} height={37} />
              </div>
            </div>
            <div className="col-span-2 bg-main-violet-dd text-main-blackColor rounded-[10px]">
              <Image src={Ads2} alt="ads" className="rounded-[10px]" />
            </div>
            <div className="col-span-1 bg-main-violet-ed text-main-blackColor rounded-[10px]">
              <Image src={Thanks} alt="thanks" className="rounded-[10px]" />
            </div>
            <div className="col-span-7 bg-main-grayColor-40 bg-gradient-to-r from-[#96328f] to-[#512962] rounded-[10px]">
              <Image src={Ads3} alt="ads" className="" />
            </div>
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-3 grid-rows-7 gap-4">
          <div className="row-span-3 col-span-3 ">
            <div className="relative flex flex-col rounded-[10px] w-full h-full bg-[#3e3661]">
              <div className="flex justify-between items-center px-[10px] py-1 bg-[#52495D] rounded-[10px]">
                <Image
                  src={Avatar}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="rounded-[50%]"
                />
                <p className="text-xs font-normal text-main-whileColor pb-[2px] ">
                  +100 more
                </p>
              </div>
              <div className="flex-1 pb-[44px] text-main-whileColor">
                Message
              </div>
              <div className="absolute bottom-0 left-0 right-0 rounded-[10px] bg-[#52495D] ">
                <input
                  className="w-full text-sm font-medium font-lato outline-none py-[10px] pl-[20px] pr-[40px] text-main-whileColor bg-transparent placeholder:text-main-whileColor-70"
                  placeholder="Say something ... "
                />
                <SendIcon
                  className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
                  width="14px"
                  height="14px"
                />
              </div>
            </div>
          </div>
          <div className="row-span-4 col-span-3 grid grid-cols-3 gap-4">
            <div className="col-span-2 row-span-3 bg-[#D9D9D9] flex justify-center items-center rounded-[10px]">
              ADS
            </div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
          </div>
        </div>
      </div>
      {/* Part 2 */}
      <div className="grid grid-cols-11 gap-4 my-4">
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
        <div className="h-[94px] bg-main-whileColor rounded-[10px]">item</div>
      </div>
      {/* Part 3 */}
      <div className="grid grid-cols-11 gap-4">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-main-whileColor rounded-[10px]">item</div>
          <div className="bg-main-whileColor rounded-[10px]">item</div>
          <div className="bg-main-whileColor rounded-[10px]">item</div>
          <div className="bg-main-whileColor rounded-[10px]">item</div>
          <div className="bg-main-whileColor rounded-[10px]">item</div>
          <div className="bg-main-whileColor rounded-[10px]">item</div>
          <div className="bg-main-whileColor rounded-[10px]">item</div>
          <div className="bg-main-whileColor rounded-[10px]">item</div>
          <div className="bg-main-whileColor rounded-[10px]">item</div>
          <div className="bg-main-whileColor rounded-[10px]">item</div>
        </div>
        <div className="col-span-9 grid grid-cols-9 gap-4">
          <div className="col-span-4 text-main-whileColor font-lato py-[21px] px-[23px] bg-main-gray-18 border-[4px] border-[#b62fa9] rounded-[10px]">
            <h3 className="text-sm font-semibold">Game Category / .io Game</h3>
            <h2 className="text-[28px] font-semibold">Game title</h2>
            <p className="text-[10px] font-semibold italic mb-[13px]">
              Posted date: 12/2/2022
            </p>
            <div className="flex mb-[11px]">
              <p className="text-xs font-medium text-main-blackColor px-[10px] rounded-[20px] bg-main-whileColor mr-[5px]">
                Car Game
              </p>
              <p className="text-xs font-medium text-main-blackColor px-[10px] rounded-[20px] bg-main-whileColor">
                Shooting Game
              </p>
            </div>
            <div className="mb-[11px]">
              <p className=" inline-block text-base font-medium mr-[9px]">
                Developed by
              </p>
              <span className=" text-base font-bold">Someone</span>
            </div>
            <p className="text-base font-bold mb-[1px]">
              1000 players loved this game
            </p>
            <p className="text-base font-bold mb-[1px]">
              Decription of the game:
            </p>
            <p className="text-base font-bold mb-[13px]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.
            </p>
            <div className="flex justify-center">
              <Image src={Video} alt="video" width={294} height={183} />
            </div>
          </div>
          <div className="col-span-4 text-main-whileColor font-lato bg-main-gray-18 border-[4px] border-[#b62fa9] rounded-[10px]">
            <div className="flex justify-center rounded-t-[10px] bg-main-grayColor-50 py-[9px] mb-[8px]">
              <h2 className="text-[28px] font-semibold pb-[4px]">
                Hall of Fame
              </h2>
            </div>
            <div className="px-[19px]">
              <div className="flex justify-between items-center bg-main-grayColor-45 rounded-[10px] py-[5px] px-[10px] mb-4">
                <Image
                  src={hallofframe1}
                  alt="picture"
                  width={62}
                  height={62}
                  className="mr-[10px]"
                />
                <div>
                  <h2 className="text-base font-semibold">Username</h2>
                  <p className="text-xs font-medium">
                    User’s quote:Lorem ipsum dolor sit amet consectetur
                    adipiscing elit Ut et.
                  </p>
                </div>
                <div className="flex relative items-center ml-[12px] before:absolute before:content-[''] before:border-l-[1px] before:h-[56px] before:left-[-6px]">
                  <p className="text-sm font-bold font-nunito mr-[4px]">1000</p>
                  <CoinIcon width="18px" height="18px" />
                </div>
              </div>
              <div className="flex justify-between items-center bg-main-grayColor-45 rounded-[10px] py-[5px] px-[10px] mb-4">
                <Image
                  src={hallofframe2}
                  alt="picture"
                  width={62}
                  height={62}
                  className="mr-[10px]"
                />
                <div>
                  <h2 className="text-base font-semibold">Username</h2>
                  <p className="text-xs font-medium">
                    User’s quote:Lorem ipsum dolor sit amet consectetur
                    adipiscing elit Ut et.
                  </p>
                </div>
                <div>
                  <div className="flex relative items-center ml-[12px] w-[56px] before:absolute before:content-[''] before:border-l-[1px] before:h-[56px] before:left-[-6px]">
                    <p className="text-sm font-bold font-nunito mr-[4px]">
                      800
                    </p>
                    <CoinIcon width="18px" height="18px" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-main-grayColor-45 rounded-[10px] py-[5px] px-[10px] mb-4">
                <Image
                  src={hallofframe3}
                  alt="picture"
                  width={62}
                  height={62}
                  className="mr-[10px]"
                />
                <div>
                  <h2 className="text-base font-semibold">Username</h2>
                  <p className="text-xs font-medium">
                    User’s quote:Lorem ipsum dolor sit amet consectetur
                    adipiscing elit Ut et.
                  </p>
                </div>
                <div>
                  <div className="flex relative items-center ml-[12px] w-[56px] before:absolute before:content-[''] before:border-l-[1px] before:h-[56px] before:left-[-6px]">
                    <p className="text-sm font-bold font-nunito mr-[4px]">
                      600
                    </p>
                    <CoinIcon width="18px" height="18px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-1 gap-4">
            <div className="bg-main-whileColor rounded-[10px]">item</div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
            <div className="bg-main-whileColor rounded-[10px]">item</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
