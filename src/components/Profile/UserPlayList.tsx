"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import * as userService from "@/services/user.service";
import DeleteIcon from "@/asset/icons/DeleteIcon";
import DeletePlayListIcon from "@/asset/icons/DeletePlayListIcon";
import DeleteItemIcon from "@/asset/icons/DeleteItemIcon";
import XmarkICon from "@/asset/icons/XmarkIcon";
import IPlayListGame from "@/interface/user/IPlayListGame";
import Link from "next/link";
import { staticPaths } from "@/utils/paths";
import NoData from "../Others/NoData";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { HANDLE_STATUS, MODAL_NAME } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useAuthContext } from "@/contexts/AuthContextProvider";

type Props = {
  title: string;
  dataList: IPlayListGame[];
  onBack: (title: string) => void;
  showPlayListDetailFirst?: {
    isShowFirst: boolean;
    playListId: string;
  };
};

function UserPlayListPage({
  title,
  dataList,
  onBack,
  showPlayListDetailFirst,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAuthContext();
  const [playListGame, setPlayListGame] = useState(dataList);
  const [isOpenPlayList, setIsOpenPlayList] = useState<boolean>(
    showPlayListDetailFirst?.isShowFirst ? false : true
  );
  const [playListItem, setPlayListItem] = useState<{
    isOpenPlayListItem: boolean;
    playListDetail: any;
  }>({
    isOpenPlayListItem: showPlayListDetailFirst?.isShowFirst ? true : false,
    playListDetail: {},
  });
  const userPlayListPageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (userPlayListPageRef.current) {
      userPlayListPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpenPlayList, playListItem]);

  useEffect(() => {
    setPlayListGame(dataList);
  }, [dataList]);

  useEffect(() => {
    const updatePlayListGame = async () => {
      try {
        const updatedPlayListGame = await Promise.all(
          dataList.map(async (playlistItem) => {
            const { success, data } = await userService.getUserPlayListItem(
              parseInt(playlistItem.id)
            );
            if (success) {
              return { ...playlistItem, detail: data };
            }
            return playlistItem;
          })
        );
        setPlayListGame(updatedPlayListGame);
      } catch (e: any) {
        throw e;
      }
    };
    updatePlayListGame();
  }, [dataList]);

  // get Play List Detail with show PlayListDetail Comp first
  useEffect(() => {
    if (showPlayListDetailFirst?.isShowFirst) {
      const playListDetail = playListGame.find(
        (item, index) => item?.id === showPlayListDetailFirst?.playListId
      );
      setPlayListItem((prev) => ({
        ...prev,
        playListDetail: playListDetail,
      }));
    }
  }, [playListGame]);

  const GotoPlayListItem = (playListDetail: IPlayListGame) => {
    setIsOpenPlayList(false);
    setPlayListItem({
      isOpenPlayListItem: true,
      playListDetail: playListDetail,
    });
  };

  const UserPlayList = () => {
    return (
      <>
        <div className="relative">
          <h2 className=" text-[28px] text-center font-bold bg-main-pink-ec rounded-t-[20px] py-4">
            {title}
          </h2>
          <button
            onClick={() => {
              onBack(title);
            }}
            className="absolute top-1/2 left-5 -translate-y-1/2 text-sm font-bold font-lato"
          >
            {"<"} Back
          </button>
        </div>
        <div className="p-11 mb-[40px]">
          {playListGame.length === 0 ? (
            <NoData />
          ) : (
            playListGame.map((playListDetail, index) => (
              <div key={index} className="mb-9">
                <div className="flex justify-between text-main-whileColor mb-4">
                  <h2 className="text-2xl font-bold font-nunito">
                    {playListDetail?.name}
                  </h2>
                  <button
                    onClick={() => {
                      GotoPlayListItem(playListDetail);
                    }}
                    className="text-sx font-medium font-lato hover:text-main-pink-db"
                  >
                    View all {">"}
                  </button>
                </div>
                {playListDetail?.detail?.length === 0 ? (
                  <NoData />
                ) : (
                  <div className="grid grid-cols-10 grid-rows-1 gap-4">
                    {playListDetail?.detail?.slice(0, 10).map((game, index) => (
                      <Link
                        href={staticPaths.game_screen}
                        key={index}
                        className="relative group hover:scale-105 transition-all ease-in-out duration-300"
                      >
                        <Image
                          className={`max-w-full max-h-full w-auto h-full rounded-[20px]`}
                          src={game.thumbnail}
                          alt="gamePicture"
                          sizes="100vw"
                          width={94}
                          height={94}
                        />
                        <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
                          {game.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </>
    );
  };
  const PlayListItem = ({
    playListDetail,
  }: {
    playListDetail: IPlayListGame;
  }) => {
    const { openModal, status, setStatus, payload, setPayload } =
      useModalContext();
    const [playlistItemDetail, setPlayListItemDetail] =
      useState<IPlayListGame>(playListDetail);
    const [showDeleteChooseGame, setShowDeleteChooseGame] =
      useState<boolean>(false);
    const OnBackToPlayListGame = () => {
      setPlayListItem((prev) => ({
        ...prev,
        isOpenPlayListItem: false,
      }));
      setIsOpenPlayList(true);
    };
    //choose game item to Delete
    const handleChooseGameToDelete = () => {
      setShowDeleteChooseGame(true);
    };

    useEffect(() => {
      setPlayListItemDetail(playListDetail);
    }, []);

    // check delete status to back to PlayList
    useEffect(() => {
      if (status === HANDLE_STATUS.SUCCESS) {
        if (payload?.type === MODAL_NAME.DELETE_PLAYLIST) {
          OnBackToPlayListGame();
          dispatch(userService.getUserPlayListGame(userInfo?.username!!));
          setStatus(HANDLE_STATUS.NOT_START);
          setPayload(null);
        } else if (payload?.type === MODAL_NAME.DELETE_ITEM_OF_PLAYLIST) {
          const newPlayListDetail = playlistItemDetail?.detail.filter(
            (item) => item?.id !== payload?.gameId
          );
          setPlayListItemDetail((prev) => ({
            ...prev,
            detail: newPlayListDetail,
          }));
          setStatus(HANDLE_STATUS.NOT_START);
          setPayload(null);
        }
      }
    }, [status]);
    return (
      <>
        <div className="relative">
          <button
            onClick={OnBackToPlayListGame}
            className="absolute top-1/2 left-5 -translate-y-1/2 text-sm font-bold font-lato"
          >
            {"<"} Back
          </button>
          <h2 className=" text-[28px] text-main-whileColor text-center font-bold bg-main-pink-ec rounded-t-[20px] py-4">
            {`Playlist games/`}{" "}
            <span className="text-2xl">{playlistItemDetail?.name}</span>
          </h2>
          <div className="absolute delete-icon top-1/2 right-[22px] -translate-y-1/2 z-20">
            <DeleteIcon className="cursor-pointer" width="22px" height="24px" />
            {/* delete Option */}
            <ul className="delete-option absolute hidden  bottom-[-25px] right-[-10px] translate-y-[105%] w-[180px] rounded-[15px] border-[1px] border-main-pink-db text-base font-bold font-nunito text-main-whileColor bg-main-grayColor-90 p-2 before:content-['']  before:absolute before:top-[-40px] before:right-0 before:w-full before:h-[50px]">
              <li
                onClick={() => {
                  setStatus(HANDLE_STATUS.IN_PROGRESS);
                  setPayload({
                    type: MODAL_NAME.DELETE_PLAYLIST,
                    playListId: playlistItemDetail.id,
                  });
                  openModal(MODAL_NAME.DELETE_PLAYLIST);
                }}
                className="p-[10px] rounded-[10px] hover:bg-main-pink-db"
              >
                <DeletePlayListIcon
                  className="mr-[10px] inline-block"
                  width="24px"
                  height="24px"
                />
                <p className="inline-block">Delete Playlist</p>
              </li>
              <li
                onClick={handleChooseGameToDelete}
                className="p-[10px] rounded-[10px] hover:bg-main-pink-db"
              >
                <DeleteItemIcon
                  className="mr-[10px] inline-block"
                  width="24px"
                  height="24px"
                />
                <p className="inline-block">Delete Item</p>
              </li>
            </ul>
          </div>
        </div>
        {playlistItemDetail?.detail?.length === 0 ? (
          <div className="p-11 mb-[40px]">
            <NoData />
          </div>
        ) : (
          <div className="grid grid-cols-10 gap-4 p-11 mb-[40px]">
            {playlistItemDetail?.detail?.map((item, index) => (
              <Link
                href={staticPaths.game_screen}
                key={index}
                className="relative group hover:scale-105 transition-all ease-in-out duration-300"
              >
                <Image
                  className={`max-w-full max-h-full w-auto h-full rounded-[20px] `}
                  src={item.thumbnail}
                  alt="picture"
                  sizes="100vw"
                  width={94}
                  height={94}
                />
                <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
                  {item.title}
                </p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.nativeEvent.preventDefault();
                    setStatus(HANDLE_STATUS.IN_PROGRESS);
                    setPayload({
                      type: MODAL_NAME.DELETE_ITEM_OF_PLAYLIST,
                      gameId: item?.id,
                    });
                    openModal(MODAL_NAME.DELETE_ITEM_OF_PLAYLIST);
                  }}
                  className={`${
                    showDeleteChooseGame ? "" : "hidden"
                  } absolute top-0 right-0 left-0 bottom-0 bg-main-grayColor-40 flex flex-col items-end rounded-[10px] cursor-pointer z-10`}
                >
                  <div className="p-[12px]">
                    <XmarkICon width="15px" height="15px" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </>
    );
  };
  return (
    <div
      ref={userPlayListPageRef}
      className="h-full text-main-whileColor bg-main-grayColor-50 rounded-[20px]"
    >
      {isOpenPlayList && <UserPlayList />}
      {playListItem.isOpenPlayListItem && (
        <PlayListItem playListDetail={playListItem.playListDetail} />
      )}
    </div>
  );
}

export default UserPlayListPage;
