"use client";
import { gameCategoriesSelector } from "@/store/selectors/game.selector";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as gameService from "@/services/game.service";
import { inRange } from "@/utils/helper";
import CategoryGameItem from "./CategoryGameItem";
function GameCategory({ colSpan }: { colSpan?: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const gameCategories = useSelector<RootState>(
    gameCategoriesSelector
  ) as any[];
  const CategoryGridRef = useRef<HTMLDivElement | null>(null);
  const [rowNumber, setRowNumber] = useState<number>(0);

  /* get game categories */
  useEffect(() => {
    !gameCategories && dispatch(gameService.getGameCategories({}));
  }, [gameCategories]);

  useEffect(() => {
    if (CategoryGridRef.current) {
      const CategoryChild: HTMLElement[] = Array.from(
        CategoryGridRef.current.children
      ) as HTMLElement[];
      //calcute rowNumber
      const row = CategoryChild.length / 5 + 1;
      setRowNumber(row);

      const itemLargeNumbers = [0, 1, 2, 3, 4, 5, 6];
      const itemLargeList = CategoryChild.filter((item, index) => {
        return itemLargeNumbers.includes(index);
      });
      itemLargeList.forEach((itemLarge) => {
        itemLarge.classList.add("row-span-2", "flex-col");
      });
    }
  }, [gameCategories]);

  return (
    <div className={`${colSpan}`}>
      <div className={`grid grid-cols-10 gap-4`}>
        {gameCategories?.map((item, index) => (
          <CategoryGameItem
            item={item}
            key={index}
            index={index}
            className={inRange(index, 0, 6) ? "row-span-2" : "row-span-1"}
          ></CategoryGameItem>
        ))}
      </div>
    </div>
  );
}

export default GameCategory;
