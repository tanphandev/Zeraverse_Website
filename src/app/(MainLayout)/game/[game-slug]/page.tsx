"use client";
import Link from "next/link";
import Image from "next/image";
import TippyHeadless from "@tippyjs/react/headless";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Ads1 from "@/asset/image/ads1.png";
import Ads2 from "@/asset/image/ads2.png";
import Ads3 from "@/asset/image/ads3.png";
import Thanks from "@/asset/image/thanks.png";
import Avatar from "@/asset/image/profilePicture.png";
import linkedin from "@/asset/image/linkedin.png";
import facebook from "@/asset/image/facebook.png";
import twitter from "@/asset/image/twitter.png";
import gmail from "@/asset/image/gmail.png";
import CoinIcon from "@/asset/icons/CoinIcon";
import SendIcon from "@/asset/icons/SendIcon";
import PauseIcon from "@/asset/icons/PauseIcon";
import HeartIcon from "@/asset/icons/HeartIcon";
import AddPlayListIcon from "@/asset/icons/AddPlayListIcon";
import ExpandIcon from "@/asset/icons/ExpandIcon";
import ReportIcon from "@/asset/icons/ReportIcon";
import * as gameService from "@/services/game.service";
import * as userService from "@/services/user.service";
import { IGameDetail } from "@/interface/games/IGameDetail";
import IGame from "@/interface/games/IGame";
import { staticPaths } from "@/utils/paths";
import CustomImage from "@/components/Others/CustomImage";
import { images } from "@/asset/image/images";
import CategoryGame from "@/components/Games/CategoryGame";
import { IGameCategory } from "@/interface/games/IGameCategory";
import {
  gameCategoriesSelector,
  gameInfoOfGameDetailSelector,
  hallOfFameOfGameSelector,
} from "@/store/selectors/game.selector";
import { formatDate } from "@/utils/helper";
import Breadcrumbs from "@/components/Others/Breadcumbs";
import { IHallOfFameOfGame } from "@/interface/games/IHallOfFameOfGame";
import { config } from "@/envs/env";
import { usePathname } from "next/navigation";
import { MODAL_NAME, TOAST_MESSAGE } from "@/utils/constants";
import { toast } from "react-toastify";
import { userLovedGameSelector } from "@/store/selectors/userSelector";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import "tippy.js/dist/tippy.css";
import { useModalContext } from "@/contexts/ModalContextProvider";
type Props = {
  params: {
    "game-slug": string;
  };
};
function GameScreen({ params }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();
  const { usernameAuth } = useAuthContext();
  const { openModal } = useModalContext();
  const [isLoveGame, setIsLoveGame] = useState<boolean>(false);
  const gameCategories = useSelector<RootState>(
    gameCategoriesSelector
  ) as IGameCategory[];
  const gameDetail =
    (useSelector<RootState>(gameInfoOfGameDetailSelector) as IGameDetail) ??
    null;
  const userLovedGame = useSelector<RootState>(
    userLovedGameSelector
  ) as IGame[];
  const categorySlugOfGameDetail = gameDetail?.game_category?.slug ?? null;
  const relativeGames =
    (useSelector<RootState>(
      (state: any) => state?.game?.game[`${categorySlugOfGameDetail}`]?.detail
    ) as IGame[]) ?? null;
  const hallOfFameOfGame = useSelector<RootState>(
    hallOfFameOfGameSelector
  ) as IHallOfFameOfGame[];
  console.log("gameDetail", gameDetail);
  console.log("userLovedGame", userLovedGame);
  console.log("isLoveGame", isLoveGame);
  const relativeGameSlice1 = relativeGames?.slice(0, 6);
  const relativeGameSlice2 = relativeGames?.slice(6, 17);
  const relativeGameSlice3 = relativeGames?.slice(18, 28);
  const relativeGameSlice4 = relativeGames?.slice(29, 34);

  /* get game detail */
  useEffect(() => {
    dispatch(gameService.getInfoGameOfGameDetail(params["game-slug"]));
  }, []);

  /* get loved game of user */
  useEffect(() => {
    !!usernameAuth && dispatch(userService.getUserLovedGame(usernameAuth!!));
  }, [usernameAuth]);

  useEffect(() => {
    /* get all game of category */
    !!categorySlugOfGameDetail &&
      !relativeGames &&
      dispatch(gameService.getGame(categorySlugOfGameDetail));
  }, [categorySlugOfGameDetail]);

  /* get game categories */
  useEffect(() => {
    !gameCategories && dispatch(gameService.getGameCategories({}));
  }, [gameCategories]);

  /* check this game is loved */
  useEffect(() => {
    const checkLovedGame = (userLovedGame: IGame[], currentGame: IGame) => {
      for (const item of userLovedGame) {
        if (item.id === currentGame.id) {
          return true;
        }
      }
      return false;
    };
    !!userLovedGame &&
      !!gameDetail &&
      setIsLoveGame(checkLovedGame(userLovedGame, gameDetail));
  }, [gameDetail, userLovedGame]);

  /* handle toggle love game */
  const handleToggleLoveGame = (game_detail_id: number) => {
    gameService
      .love_game(game_detail_id)
      .then(({ success, data }) => {
        console.log("data", data);
        if (success) {
          setIsLoveGame(data);
        }
      })
      .catch((e: any) => {
        throw e;
      });
  };

  const referAFriend = () => {
    navigator.clipboard.writeText(`${config["DOMAIN_URL"]}${pathName}`);
    toast.success(TOAST_MESSAGE.COPY_REFER_A_FRIEND, { position: "top-right" });
  };
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
              <iframe
                src={gameDetail?.play_url}
                className="w-full h-full"
              ></iframe>
              <div className="flex justify-between px-[14px] py-2 bg-main-grayColor-37 rounded-b-[10px]">
                <div className="flex items-center">
                  <PauseIcon width="32px" height="32px" />
                  <Image
                    src={gameDetail?.thumbnail}
                    alt="gamepic"
                    width={50}
                    height={50}
                    className="mx-[12px] rounded-[10px]"
                  />
                  <h2 className="text-base font-bold font-lato text-main-whileColor">
                    {gameDetail?.title}
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
                    <TippyHeadless
                      render={(attrs) => (
                        <div
                          className="flex items-center text-main-whileColor text-sm font-medium py-1 px-3 bg-[#424242] rounded-[10px]"
                          tabIndex={-1}
                          {...attrs}
                        >
                          Love Game
                        </div>
                      )}
                      placement="bottom"
                    >
                      <HeartIcon
                        id="heart-icon"
                        width="32px"
                        height="32px"
                        className="outline-none ml-4"
                        isLoveGame={isLoveGame}
                        onClick={() => {
                          handleToggleLoveGame(gameDetail?.id);
                        }}
                      />
                    </TippyHeadless>
                    <TippyHeadless
                      render={(attrs) => (
                        <div
                          className="flex items-center text-main-whileColor text-sm font-medium py-1 px-3 bg-[#424242] rounded-[10px]"
                          tabIndex={-1}
                          {...attrs}
                        >
                          Playlist
                        </div>
                      )}
                      placement="bottom"
                    >
                      <AddPlayListIcon
                        onClick={() => {
                          openModal(MODAL_NAME.ADD_PLAYLIST);
                        }}
                        width="32px"
                        height="32px"
                        className="ml-4 cursor-pointer outline-none"
                      />
                    </TippyHeadless>
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
              <Image
                onClick={referAFriend}
                src={Ads2}
                alt="ads"
                className="rounded-[10px] cursor-pointer"
              />
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
            {relativeGameSlice1?.map((game, index) => (
              <Link
                href={staticPaths.game_detail(game?.slug)}
                key={index}
                className="relative group hover:scale-105 transition-all ease-in-out duration-300"
              >
                <CustomImage
                  className={`max-w-full max-h-full w-full h-full min-h-[94px] rounded-[20px]`}
                  src={game.thumbnail}
                  fallback={images.default_game_image}
                  alt="gamePicture"
                  sizes="100vw"
                  width={0}
                  height={0}
                />
                <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
                  {game.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Part 2 */}
      <div className="grid grid-cols-11 gap-4 my-4">
        {relativeGameSlice2?.map((game, index) => (
          <Link
            href={staticPaths.game_detail(game?.slug)}
            key={index}
            className="relative group hover:scale-105 transition-all ease-in-out duration-300"
          >
            <CustomImage
              className={`max-w-full max-h-full w-full h-full min-h-[94px] rounded-[20px]`}
              src={game.thumbnail}
              fallback={images.default_game_image}
              alt="gamePicture"
              sizes="100vw"
              width={0}
              height={0}
            />
            <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
              {game.title}
            </p>
          </Link>
        ))}
      </div>
      {/* Part 3 */}
      <div className="grid grid-cols-11 gap-4 mb-[120px]">
        <div className="col-span-2 grid grid-cols-2 grid-rows-[repeat(auto-fill,94px)] gap-4">
          {relativeGameSlice3?.map((game, index) => (
            <Link
              href={staticPaths.game_detail(game?.slug)}
              key={index}
              className="relative group hover:scale-105 transition-all ease-in-out duration-300"
            >
              <CustomImage
                className={`max-w-full max-h-full w-full h-[94px] rounded-[20px]`}
                src={game.thumbnail}
                fallback={images.default_game_image}
                alt="gamePicture"
                sizes="100vw"
                width={0}
                height={0}
              />
              <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
                {game.title}
              </p>
            </Link>
          ))}
        </div>
        <div className="col-span-9 grid grid-cols-9 grid-rows-[repeat(auto-fill,94px)] gap-4 ">
          <div className="overflow-y-scroll no-scrollbar h-full col-span-4 row-span-5 text-main-whileColor font-lato py-[21px] px-[23px] bg-main-gray-18 border-[4px] border-[#b62fa9] rounded-[10px]">
            <Breadcrumbs
              className="!text-sm"
              items={[
                { label: "Home", path: staticPaths.home },
                {
                  label: gameDetail?.game_category?.label,
                  path: staticPaths.game_category_detail(
                    gameDetail?.game_category?.slug!!
                  ),
                },
                {
                  label: gameDetail?.title,
                  path: "",
                },
              ]}
            />
            <h2 className="text-[28px] font-semibold">{gameDetail?.title}</h2>
            <p className="text-[10px] font-semibold italic mb-[13px]">
              Posted date: {formatDate(gameDetail?.updated_at!!)}
            </p>
            <div className="mb-[11px]">
              <p className=" inline-block text-base font-medium mr-[9px]">
                Developed by
              </p>
              <span className=" text-base font-bold">
                {gameDetail?.developer}
              </span>
            </div>
            <p className="text-base font-bold mb-[1px]">
              {gameDetail?.love_count} players loved this game
            </p>
            <p className="text-base font-bold mb-[1px]">
              Decription of the game:
            </p>
            <p className="text-base font-bold mb-[13px]">
              {gameDetail?.description}
            </p>
            <div className="flex justify-center">
              {!!gameDetail?.trailer_url && (
                <iframe
                  className="px-[31px] w-full h-[183px]"
                  src={`${gameDetail?.trailer_url}?controls=0`}
                ></iframe>
              )}
            </div>
          </div>
          {/* hall of fame */}
          <div className="overflow-y-scroll no-scrollbar h-[534px] col-span-4 row-span-5 text-main-whileColor font-lato bg-main-gray-18 border-[4px] border-[#b62fa9] rounded-[10px]">
            <div className="sticky top-0 left-0 right-0 flex justify-center rounded-t-[10px] bg-main-blackColor py-[9px] mb-[8px] z-10">
              <h2 className="text-[28px] font-semibold pb-[4px]">
                Hall of Fame
              </h2>
            </div>
            <div className="px-[19px]">
              {hallOfFameOfGame?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-main-grayColor-45 rounded-[10px] py-[5px] px-[10px] mb-4"
                >
                  <CustomImage
                    src={item?.user?.avatar?.url}
                    fallback={images.default_profile_image}
                    alt="picture"
                    width={62}
                    height={62}
                    className="mr-[10px] rounded-[50%]"
                  />
                  <div className="flex-1">
                    <h2 className="text-base font-semibold">
                      {item?.user.username}
                    </h2>
                    <p
                      className="text-xs font-medium line-clamp-2"
                      style={{
                        overflowWrap: "anywhere",
                      }}
                    >
                      {item?.user?.quote}
                    </p>
                  </div>
                  <div className="flex relative items-center justify-center w-[64px] ml-[12px] before:absolute before:content-[''] before:border-l-[1px] before:h-[56px] before:left-[-6px]">
                    <p className="text-sm font-bold font-nunito mr-[4px]">
                      {item?.zera_earned}
                    </p>
                    <CoinIcon width="18px" height="18px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-1 gap-4">
            {relativeGameSlice4?.map((game, index) => (
              <Link
                href={staticPaths.game_detail(game?.slug)}
                key={index}
                className="relative group hover:scale-105 transition-all ease-in-out duration-300"
              >
                <CustomImage
                  className={`max-w-full max-h-full w-full h-full min-h-[94px] rounded-[20px]`}
                  src={game.thumbnail}
                  fallback={images.default_game_image}
                  alt="gamePicture"
                  sizes="100vw"
                  width={0}
                  height={0}
                />
                <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
                  {game.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-11">
        <CategoryGame listCategory={gameCategories} colSpan="col-span-10" />
      </div>
    </div>
  );
}

export default GameScreen;
