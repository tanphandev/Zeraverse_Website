"use client";
import Link from "next/link";
import Image from "next/image";
import TippyHeadless from "@tippyjs/react/headless";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ReferFriend from "@/../public/asset/image/refer_friend.png";
import Ads1 from "@/../public/asset/image/ads1.png";
import Ads3 from "@/../public/asset/image/ads3.png";
import Thanks from "@/../public/asset/image/thanks.png";
import CoinIcon from "@/asset/icons/CoinIcon";
import PlayIcon from "@/asset/icons/PlayICon";
import PauseIcon from "@/asset/icons/PauseIcon";
import HeartIcon from "@/asset/icons/HeartIcon";
import AddPlayListIcon from "@/asset/icons/AddPlayListIcon";
import ExpandIcon from "@/asset/icons/ExpandIcon";
import ReportIcon from "@/asset/icons/ReportIcon";
import Logo2 from "@/../public/asset/image/Logo2.png";
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
import { formatDate, getTimeRemaining, isLogged } from "@/utils/helper";
import Breadcrumbs from "@/components/Others/Breadcumbs";
import { IHallOfFameOfGame } from "@/interface/games/IHallOfFameOfGame";
import { config } from "@/envs/env";
import { usePathname } from "next/navigation";
import {
  HANDLE_STATUS,
  MODAL_NAME,
  TOAST_MESSAGE,
  VERIFY_STATUS,
} from "@/utils/constants";
import { toast } from "react-toastify";
import { userLovedGameSelector } from "@/store/selectors/user.selector";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import "tippy.js/dist/tippy.css";
import { useModalContext } from "@/contexts/ModalContextProvider";
import GameScreen from "@/components/Games/GameScreen";
import {
  TIME_COUNTER_TYPE,
  useSocketContext,
} from "@/contexts/SocketContextProvider";
import ChatBox from "@/components/Games/ChatBox";
import SocialShare from "@/components/Others/SocialShare";
type Props = {
  params: {
    "game-slug": string;
  };
};
function GamePage({ params }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();
  const { usernameAuth, userInfo, anonymousInfo, verifyStatus, token } =
    useAuthContext();
  const { openModal, setPayload } = useModalContext();
  const [isLoveGame, setIsLoveGame] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

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

  const {
    socket,
    setIsConnectSocket,
    connectStatusOfSocket,
    isCountdown,
    setIsCountdown,
    playedTime,
    setPlayedTime,
    setSendMessageStatus,
  } = useSocketContext();
  const gameScreenRef = createRef<any>();
  const chatBoxRef = createRef<any>();
  const playedTimeFormat: TIME_COUNTER_TYPE = getTimeRemaining(playedTime);
  const relativeGameSlice1 = relativeGames?.slice(0, 6);
  const relativeGameSlice2 = relativeGames?.slice(6);

  /* init socket connection */
  useEffect(() => {
    setIsConnectSocket(true);
    return () => {
      setIsConnectSocket(false);
    };
  }, []);

  // join room for logged user
  useEffect(() => {
    if (
      !socket ||
      connectStatusOfSocket !== HANDLE_STATUS.SUCCESS ||
      verifyStatus !== VERIFY_STATUS.SUCCESS
    )
      return;
    socket.emit("joinRoom", { room_id: gameDetail?.id, token: token!! });
  }, [connectStatusOfSocket, verifyStatus, gameDetail]);

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

  /* handle zoom in */
  const handleZoomInScreen = () => {
    gameScreenRef.current.handleZoomInScreen();
  };

  /* hanndle zoom out */

  const handleZoomOutScreen = () => {
    gameScreenRef.current.handleZoomOut();
  };
  /* handle Play Game */
  const handlePlayGame = () => {
    if (!socket) return;
    setIsCountdown(true);
    socket.emit("playGame");
  };

  /* handle Pause Game */
  const handlePauseGame = () => {
    setIsCountdown(false);
    socket?.emit("stopPlay");
  };
  const handleSendMessage = () => {
    socket?.emit("chatMessage", { msg: chatBoxRef.current.inputValue });
    setSendMessageStatus(HANDLE_STATUS.IN_PROGRESS);
    chatBoxRef.current.resetInputValue();
  };

  /* switch game */
  useEffect(() => {
    if (!socket) return;
    setPlayedTime(0);
    setIsCountdown(false);
    socket.emit("switchGame");
  }, [pathName]);

  /* buy time when remaining time less 0 */
  useEffect(() => {
    if (
      isCountdown &&
      +(isLogged() ? userInfo!! : anonymousInfo!!)?.playtime <= 0
    ) {
      isFullScreen && handleZoomOutScreen();
      handlePauseGame();
      if (!!userInfo) {
        openModal(MODAL_NAME.BUY_TIME);
      } else {
        openModal(MODAL_NAME.REMINDER);
      }
    }
  }, [userInfo?.playtime, anonymousInfo?.playtime, isCountdown]);

  /* listen window change event */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        handlePauseGame();
      }
    };
    if (!socket || connectStatusOfSocket !== HANDLE_STATUS.SUCCESS) return;
    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket, connectStatusOfSocket]);

  return (
    <div className="w-[314px] sm:w-[424px] md:w-[644px] lg:w-[754px] xl:w-[974px] min-[1316px]:w-[1084px] 2xl:w-[1194px] mb-10">
      {/* Part 1 */}
      <div className="grid grid-cols-[repeat(auto-fill,94px)] grid-flow-dense gap-4">
        <div className="col-span-3 sm:col-span-4 md:col-span-6 lg:col-span-7 xl:col-span-6 min-[1316px]:col-span-7 2xl:col-span-8 grid 2xl:grid-cols-8 gap-4">
          <div className="hidden 2xl:block 2xl:col-span-1 bg-gradient-to-b from-[#4c265f] to-[#96328f] rounded-[10px]">
            <Image
              priority={true}
              src={Ads1}
              alt="ads"
              className="w-full h-full"
            />
          </div>
          <div className="grid-rows-[repeat(5,94px)] sm:grid-rows-[repeat(6,94px)] md:grid-rows-[repeat(5,94px)] grid-cols-[repeat(auto-fill,94px)] lg:grid-rows-[repeat(7,94px)] grid-row xl:col-span-6 xl:grid-cols-6 min-[1316px]:col-span-7 grid min-[1316px]:grid-cols-7 xl:grid-rows-[repeat(7,94px)] gap-4">
            <div className="relative flex flex-col col-span-3 row-span-3 sm:col-span-4 sm:row-span-4 md:col-span-6 md:row-span-5 lg:col-span-7 lg:row-span-6 xl:col-span-6 min-[1316px]:col-span-7 xl:row-span-5 text-main-blackColor rounded-[10px]">
              <GameScreen
                ref={gameScreenRef}
                gameDetail={gameDetail}
                isFullScreen={isFullScreen}
                setIsFullScreen={setIsFullScreen}
              />
              <div className="flex justify-between px-[14px] py-2 bg-[#00000080] rounded-b-[10px]">
                <div className="flex items-center">
                  <TippyHeadless
                    placement="bottom"
                    render={(attrs) => (
                      <div
                        className="flex items-center text-main-whileColor text-sm font-medium py-1 px-3 bg-[#424242] rounded-[10px]"
                        tabIndex={-1}
                        {...attrs}
                      >
                        Pause
                      </div>
                    )}
                  >
                    <PauseIcon
                      className="cursor-pointer outline-none"
                      onClick={handlePauseGame}
                      width="32px"
                      height="32px"
                    />
                  </TippyHeadless>
                  <CustomImage
                    src={gameDetail?.thumbnail}
                    fallback={images.default_game_image}
                    alt="gamepic"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="hidden md:block w-[50px] h-[50px] object-cover mx-[12px] rounded-[10px]"
                  />
                  <h2 className="hidden md:block text-base font-bold font-lato text-main-whileColor">
                    {gameDetail?.title}
                  </h2>
                </div>
                <div className="flex items-center">
                  <div className=" flex justify-center text-base font-medium font-nunito text-main-whileColor py-[2px] px-3 bg-main-violet-6d rounded-[12px]">
                    {playedTimeFormat.hours}:{playedTimeFormat.minutes}:
                    {playedTimeFormat.seconds}
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
                          if (!userInfo) {
                            openModal(MODAL_NAME.REMINDER);
                            return;
                          }
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
                          if (!userInfo) {
                            openModal(MODAL_NAME.REMINDER);
                            return;
                          }
                          openModal(MODAL_NAME.ADD_PLAYLIST);
                        }}
                        width="32px"
                        height="32px"
                        className="ml-4 cursor-pointer outline-none"
                      />
                    </TippyHeadless>
                    <TippyHeadless
                      render={(attrs) => (
                        <div
                          className="flex items-center text-main-whileColor text-sm font-medium py-1 px-3 bg-[#424242] rounded-[10px]"
                          tabIndex={-1}
                          {...attrs}
                        >
                          Zoom in
                        </div>
                      )}
                      placement="bottom"
                    >
                      <ExpandIcon
                        onClick={handleZoomInScreen}
                        width="32px"
                        height="32px"
                        className="hidden sm:block ml-4 cursor-pointer outline-none"
                      />
                    </TippyHeadless>
                    <TippyHeadless
                      render={(attrs) => (
                        <div
                          className="flex items-center text-main-whileColor text-sm font-medium py-1 px-3 bg-[#424242] rounded-[10px]"
                          tabIndex={-1}
                          {...attrs}
                        >
                          Report
                        </div>
                      )}
                      placement="bottom"
                    >
                      <ReportIcon
                        onClick={() => {
                          const payload = {
                            game_detail: gameDetail,
                          };
                          setPayload(payload);
                          openModal(MODAL_NAME.REPORT);
                        }}
                        width="32px"
                        height="32px"
                        className="ml-4 cursor-pointer outline-none"
                      />
                    </TippyHeadless>
                  </div>
                </div>
              </div>
              {!isCountdown && (
                <div
                  className="absolute top-0 bottom-0 left-0 right-0 bg-[#000000cc]"
                  style={{ backdropFilter: "blur(10px)" }}
                >
                  <Image
                    className="absolute top-[10%] left-1/2 -translate-x-1/2"
                    src={Logo2}
                    alt="logo"
                    width={200}
                    height={37}
                  />
                  <div className="flex flex-col items-center justify-center absolute top-0 left-0 bottom-0 right-0">
                    <h2 className="text-[24px] md:text-[32px] font-bold font-nunito text-main-whileColor mb-2">
                      {gameDetail?.title}
                    </h2>
                    <button
                      onClick={handlePlayGame}
                      className="transition-all hover:scale-105 inline-block text-[18px] md:text-[24px] font-medium font-nunito text-main-whileColor py-2 px-5 bg-gradient-to-br from-main-pink-f4 via-[#6664ed] to-[#5200ff] rounded-[30px]"
                    >
                      Play Now{" "}
                      <PlayIcon className="inline" width="24px" height="24px" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-3 sm:col-span-4 lg:col-span-5 xl:col-span-4 w-full h-full bg-main-pink-83 border-[1px] border-main-pink-f9 rounded-[10px]">
              <SocialShare />
            </div>
            <div className="col-span-3 sm:col-span-4 md:col-span-2 bg-main-violet-dd text-main-blackColor rounded-[10px]">
              <Image
                priority={true}
                onClick={referAFriend}
                src={ReferFriend}
                alt="ads"
                className="rounded-[10px] cursor-pointer w-full h-full object-cover"
              />
            </div>
            <div className="hidden min-[1316px]:block min-[1316px]:col-span-1 bg-main-violet-ed text-main-blackColor rounded-[10px]">
              <Image src={Thanks} alt="thanks" className="rounded-[10px]" />
            </div>
            <div className="hidden xl:block xl:col-span-6 min-[1316px]:col-span-7 bg-main-grayColor-40 bg-gradient-to-r from-[#96328f] to-[#512962] rounded-[10px]">
              <Image priority={true} src={Ads3} alt="ads" className="" />
            </div>
          </div>
        </div>
        <div className="col-span-3 sm:col-span-4 sm:grid-cols-4 sm:grid-rows-[repeat(6,94px)] md:col-span-6 md:grid-cols-6 lg:col-span-7 lg:grid-cols-7 md:grid-rows-3 xl:col-span-3 grid xl:grid-cols-3 xl:grid-rows-7 gap-4">
          <ChatBox
            ref={chatBoxRef}
            handleSendMessage={handleSendMessage}
            roomId={gameDetail?.id}
          />
          <div className="col-span-3 sm:col-span-4 row-span-2 grid-cols-[repeat(auto-fill,94px)] sm:grid-rows-[repeat(2,94px)] md:col-span-3 md:row-span-3 md:grid-cols-3 lg:col-span-4 lg:row-span-3 lg:grid-cols-4 xl:row-span-4 xl:col-span-3 grid xl:grid-cols-3 gap-4">
            <div className="hidden sm:flex sm:col-span-2 md:col-span-1 lg:col-span-2 md:row-span-3 bg-[#D9D9D9]  justify-center items-center rounded-[10px]">
              ADS
            </div>
            {relativeGameSlice1?.map((game, index) => (
              <Link
                href={staticPaths.game_detail(game?.slug)}
                key={index}
                className="w-[94px] h-[94px] relative group hover:scale-105 transition-all ease-in-out duration-300"
              >
                <CustomImage
                  className={`w-full h-full rounded-[20px]`}
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
      <div className="grid grid-cols-[repeat(auto-fill,94px)] grid-flow-dense gap-4 my-4">
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
        <div className=" col-start-1 col-end-4 sm:col-start-1 sm:col-end-5 md:col-start-2 md:col-end-6 lg:col-start-1 lg:col-end-5 min-[1316px]:col-start-2 min-[1316px]:col-end-6 2xl:col-start-3 2xl:col-end-7 row-start-2 row-end-7 overflow-y-scroll no-scrollbar h-full  text-main-whileColor font-lato py-[21px] px-[23px] bg-main-gray-18 border-[4px] border-[#b62fa9] rounded-[10px]">
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
        <div className=" col-start-1 col-end-4 sm:col-start-1 sm:col-end-5 md:col-start-2 md:col-end-6 row-start-7 row-end-12 lg:col-start-5 lg:col-end-8 xl:col-start-5 xl:col-end-9 min-[1316px]:col-start-6 min-[1316px]:col-end-10 2xl:col-start-7 2xl:col-end-11 lg:row-start-2 lg:row-end-7 hall-of-fame-game overflow-y-scroll no-scrollbar h-[534px] text-main-whileColor font-lato bg-main-gray-18 border-[4px] border-[#b62fa9] rounded-[10px]">
          <div className="sticky top-0 left-0 right-0 flex justify-center rounded-t-[10px] bg-main-blackColor py-[9px] mb-[8px] z-10">
            <h2 className="text-[28px] font-semibold pb-[4px]">Hall of Fame</h2>
          </div>
          <div className="px-[19px]">
            {hallOfFameOfGame?.map((item, index) => (
              <div
                onClick={() => {
                  // Open the URL in a new tab
                  window.open(
                    `${staticPaths.achievements(item.user.username)}`,
                    "_blank"
                  );
                }}
                key={index}
                className="flex justify-between bg-main-grayColor-45 rounded-[10px] py-[5px] px-[10px] mb-4 cursor-pointer group"
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
                  <h2
                    className="text-base font-semibold group-hover:text-main-violet-8b line-clamp-1"
                    style={{
                      overflowWrap: "anywhere",
                    }}
                  >
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
      </div>
      <CategoryGame listCategory={gameCategories} />
    </div>
  );
}

export default GamePage;
