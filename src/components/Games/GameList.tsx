"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as gameService from "@/services/game.service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { gameListSelector } from "@/store/selectors/game.selector";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
import IGame from "@/interface/games/IGame";
import { staticPaths } from "@/utils/paths";
import AppBarMDItem from "../AppBar/AppBarMDItem";
import AppBarMD from "../Modals/AppBarMD/AppBarMD";
function GameList() {
  const dispatch = useDispatch<AppDispatch>();
  const gameList = useSelector<RootState>(gameListSelector) as IGame[];
  const gridSystemRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLImageElement[]>([]);
  const [isShowAppBarMD, setIsShowAppBarMD] = useState<boolean>(false);
  /* get game */
  useEffect(() => {
    !gameList &&
      dispatch(
        gameService.getGamelist({
          page: "1",
          limit: "200",
        })
      );
  }, [gameList]);
  useEffect(() => {
    //get item list is child of GridSystem parent
    if (gridSystemRef.current) {
      itemsRef.current = Array.from(
        gridSystemRef.current.children
      ) as HTMLImageElement[];
    }
    //resize for large items and medium items
    const itemLargeNumbers = [1, 11, 17, 30, 31];
    const itemMediumNumbers = [6, 9, 10, 15, 16, 28, 29];
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
  return (
    <div
      className="p-4 -m-4 w-[346px] sm:w-[456px] md:w-[676px] lg:w-[818px] xl:w-[1006px] min-[1348px]:w-[1116px] 2xl:w-[1226px] grid grid-cols-[repeat(auto-fill,94px)] auto-rows-[94px] grid-flow-dense gap-4 "
      ref={gridSystemRef}
    >
      <div className="relative lg:hidden">
        <AppBarMDItem
          isShowAppBarMD={isShowAppBarMD}
          setIsShowAppBarMD={setIsShowAppBarMD}
        />
        {isShowAppBarMD && <AppBarMD setIsShow={setIsShowAppBarMD} />}
      </div>
      {gameList?.map((game: IGame, index: number) => (
        <Link
          href={staticPaths.game_detail(game?.slug)}
          key={index}
          className="relative group hover:scale-105 transition-all ease-in-out duration-300"
        >
          <CustomImage
            className={`w-full h-full object-cover rounded-[20px]`}
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
  );
}

export default GameList;
