"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import ApiCaller from "@/api/apiCaller";
import { nonTokenRequireAPIs } from "@/api/api";

//call api to get gamelist
const GameListfetcher = async (): Promise<any> => {
  const res = await ApiCaller.get(
    nonTokenRequireAPIs.getGame,
    {},
    {
      page: "1",
      limit: "200",
    }
  );
  const gameList = res.data.rows;
  return gameList;
};
function GameList() {
  const router = useRouter();
  const gridSystemRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLImageElement[]>([]);
  const { data: gameList } = useSWR("gamelist", GameListfetcher);
  useEffect(() => {
    //get item list is child of GridSystem parent
    if (gridSystemRef.current) {
      itemsRef.current = Array.from(
        gridSystemRef.current.children
      ) as HTMLImageElement[];
    }
    //resize for large items and medium items
    const itemLargeNumbers = [0, 10, 16, 29, 30];
    const itemMediumNumbers = [5, 8, 9, 14, 15, 27, 28];
    const itemLargeList = itemsRef.current.filter((item, index) => {
      return itemLargeNumbers.includes(index);
    });
    const itemMediumList = itemsRef.current.filter((item, index) => {
      return itemMediumNumbers.includes(index);
    });
    itemLargeList.forEach((item) => {
      item.classList.add("col-span-3", "row-span-3");
    });
    itemMediumList.forEach((item) => {
      item.classList.add("col-span-2", "row-span-2");
    });
  }, [gameList]);
  //Go to Game Screen
  const gotoGameScreen = () => {
    router.push("/game-screen");
  };
  return (
    <div
      className="grid grid-cols-11 grid-flow-dense gap-4"
      ref={gridSystemRef}
    >
      {gameList?.map((game: IGame, index: number) => (
        <div
          onClick={gotoGameScreen}
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
        </div>
      ))}
    </div>
  );
}

export default GameList;
