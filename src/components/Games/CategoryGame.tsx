"use client";
import { gameCategoriesSelector } from "@/store/selectors/game.selector";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as gameService from "@/services/game.service";
import CategoryItem from "./CategoryItem";
function GameCategory({ colSpan }: { colSpan?: string }) {
  const router = useRouter();
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

  const handleChooseCategory = (categoryName: string) => {
    router.push(`/game-category/${categoryName}`);
  };
  return (
    <div
      ref={CategoryGridRef}
      className={`flex-1 grid grid-cols-5 grid-rows-${rowNumber} gap-4 ${colSpan}`}
      id="CategoryGrid"
    >
      {gameCategories?.map((item, index) => (
        <CategoryItem
          onClick={() => {
            handleChooseCategory(item.label);
          }}
          key={index}
          src={item.thumbnail}
          name={item.label}
        />
      ))}
    </div>
  );
}

export default GameCategory;
