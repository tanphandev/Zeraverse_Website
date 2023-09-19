"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryGame from "@/components/Games/CategoryGame";
import { IGameCategory } from "@/interface/games/IGameCategory";
import { gameCategoriesSelector } from "@/store/selectors/game.selector";
import * as gameService from "@/services/game.service";
import { AppDispatch, RootState } from "@/store/store";

function GameCategories() {
  const dispatch = useDispatch<AppDispatch>();
  const gameCategories = useSelector<RootState>(
    gameCategoriesSelector
  ) as IGameCategory[];
  /* get game categories */
  useEffect(() => {
    !gameCategories && dispatch(gameService.getGameCategories({}));
  }, [gameCategories]);
  return (
    <>
      <div className="grid grid-cols-10">
        <h2 className="col-span-4 text-[28px] text-center font-bold font-nunito text-main-whileColor py-7 rounded-[10px] bg-gradient-to-b from-[#979BFF] via-[#ef75f5] to-[#EF36C6] mb-4">
          All Category
        </h2>
      </div>
      <div className="grid grid-cols-10">
        <CategoryGame listCategory={gameCategories} colSpan="col-span-10" />
      </div>
      <div className="mb-[100px]"></div>
    </>
  );
}

export default GameCategories;
