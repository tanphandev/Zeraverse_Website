"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { userPlayListGame, userPlayListDetail } from "@/dataFetch/dataFetch";
import DeletePlayListPopUp from "../popup/DeletePlayListPopUp";
import DeleteIcon from "@/asset/icons/DeleteIcon";
import DeletePlayListIcon from "@/asset/icons/DeletePlayListIcon";
import DeleteItemIcon from "@/asset/icons/DeleteItemIcon";
import XmarkICon from "@/asset/icons/XmarkIcon";

type Props = {
  title: string;
  onBack: (title: string) => void;
};

function UserPlayListPage({ title, onBack }: Props) {
  const [isOpenPlayList, setIsOpenPlayList] = useState<boolean>(true);
  const [isOpenPlayListItem, setIsOpenPlayListItem] = useState<boolean>(false);
  const listGame20 = userPlayListGame[0].listGame.slice(0, 20);
  const userPlayListPageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (userPlayListPageRef.current) {
      userPlayListPageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpenPlayList, isOpenPlayListItem]);
  const GotoPlayListItem = () => {
    setIsOpenPlayList(false);
    setIsOpenPlayListItem(true);
  };

  const UserPlayList = () => (
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
      <div className="p-11">
        {userPlayListGame.map((listGame, index) => (
          <div key={index} className="mb-9">
            <div className="flex justify-between text-main-whileColor mb-4">
              <h2 className="text-2xl font-bold font-nunito">
                {listGame.name}
              </h2>
              <button
                onClick={GotoPlayListItem}
                className="text-xs font-medium font-lato"
              >
                View all {">"}
              </button>
            </div>
            <div className="grid grid-cols-10 grid-rows-2 gap-4">
              {listGame20.map((game, index) => (
                <Image
                  key={index}
                  src={game.src}
                  alt="gamePicture"
                  className="w-full rounded-[10px]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
  const PlayListItem = () => {
    const [isOpenDeletePlayList, setIsOpenDeletePlayList] =
      useState<boolean>(false);
    const [showDeleteChooseGame, setShowDeleteChooseGame] =
      useState<boolean>(false);
    const [isOpenDeleteGame, setIsOpenDeleteGame] = useState<boolean>(false);
    const OnBackToPlayListGame = () => {
      setIsOpenPlayListItem(false);
      setIsOpenPlayList(true);
    };
    //Show Delete PlayList PopUp
    const openDeletePlayListPopUp = () => {
      setIsOpenDeletePlayList(true);
    };
    //Click yes event to delete PlayList
    const hanleClickDeletePlayListYes = () => {
      setIsOpenDeletePlayList(false);
    };
    //Click no event to delete PlayList
    const hanleClickDeletePlayListNo = () => {
      setIsOpenDeletePlayList(false);
    };
    //choose game item to Delete
    const handleChooseGameToDelete = () => {
      setShowDeleteChooseGame(true);
    };
    //Show Delete Game PopUp
    const openDeleteGamePopUp = () => {
      setIsOpenDeleteGame(true);
    };
    //Click yes event to delete game
    const hanleClickDeleteGameYes = () => {
      setIsOpenDeleteGame(false);
      setShowDeleteChooseGame(false);
    };
    //Click no event to delete game
    const hanleClickDeleteGameNo = () => {
      setIsOpenDeleteGame(false);
      setShowDeleteChooseGame(false);
    };
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
            <span className="text-2xl">PlayList Item Name</span>
          </h2>
          <div className="absolute delete-icon top-1/2 right-[22px] -translate-y-1/2 z-20">
            <DeleteIcon className="cursor-pointer" width="22px" height="24px" />
            {/* delete Option */}
            <ul className="delete-option absolute hidden  bottom-[-25px] right-[-10px] translate-y-[105%] w-[180px] rounded-[15px] border-[1px] border-main-pink-db text-base font-bold font-nunito text-main-whileColor bg-main-grayColor-90 p-2 before:content-['']  before:absolute before:top-[-40px] before:right-0 before:w-full before:h-[50px]">
              <li
                onClick={openDeletePlayListPopUp}
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
        <div className="grid grid-cols-10 gap-4 p-11">
          {userPlayListDetail.map((item, index) => (
            <div
              onClick={openDeleteGamePopUp}
              key={index}
              className="relative cursor-pointer"
            >
              <Image
                src={item.src}
                alt="game_picture"
                className="w-full rounded-[10px]"
              />
              <div
                className={`${
                  showDeleteChooseGame ? "" : "hidden"
                } absolute top-0 right-0 left-0 bottom-0 bg-main-grayColor-40 flex flex-col items-end rounded-[10px]`}
              >
                <div className="p-[7px]">
                  <XmarkICon width="15px" height="15px" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* popup */}
        {isOpenDeletePlayList && (
          <DeletePlayListPopUp
            content="Delete Playlist"
            onClickYes={hanleClickDeletePlayListYes}
            onClickNo={hanleClickDeletePlayListNo}
          />
        )}
        {isOpenDeleteGame && (
          <DeletePlayListPopUp
            onClickNo={hanleClickDeleteGameNo}
            onClickYes={hanleClickDeleteGameYes}
            content="Delete Playlist"
          />
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
      {isOpenPlayListItem && <PlayListItem />}
    </div>
  );
}

export default UserPlayListPage;
