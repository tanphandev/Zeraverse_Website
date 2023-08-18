"use client";
import {
  userPlayListGame,
  userPlayListDetail,
} from "@/app/dataFetch/dataFetch";
import Image from "next/image";
import { useState } from "react";

type Props = {
  title: string;
  onBack: (title: string) => void;
};

function UserPlayListPage({ title, onBack }: Props) {
  const [isOpenPlayList, setIsOpenPlayList] = useState<boolean>(true);
  const [isOpenPlayListItem, setIsOpenPlayListItem] = useState<boolean>(false);
  const listGame20 = userPlayListGame[0].listGame.slice(0, 20);
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
    const OnBackToPlayListGame = () => {
      setIsOpenPlayListItem(false);
      setIsOpenPlayList(true);
    };
    return (
      <>
        <div className="relative">
          <h2 className=" text-[28px] text-main-whileColor text-center font-bold bg-main-pink-ec rounded-t-[20px] py-4">
            {`Playlist games/`}{" "}
            <span className="text-2xl">PlayList Item Name</span>
          </h2>
          <button
            onClick={OnBackToPlayListGame}
            className="absolute top-1/2 left-5 -translate-y-1/2 text-sm font-bold font-lato"
          >
            {"<"} Back
          </button>
        </div>
        <div className="grid grid-cols-10 gap-4 p-11">
          {userPlayListDetail.map((item, index) => (
            <Image
              key={index}
              src={item.src}
              alt="game_picture"
              className="w-full rounded-[10px]"
            />
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="h-full text-main-whileColor bg-main-grayColor-50 rounded-[20px]">
      {isOpenPlayList && <UserPlayList />}
      {isOpenPlayListItem && <PlayListItem />}
    </div>
  );
}

export default UserPlayListPage;
