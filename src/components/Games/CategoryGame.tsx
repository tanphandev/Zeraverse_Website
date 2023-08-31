"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import CategoryItem from "./CategoryItem";
import ApiCaller from "@/api/apiCaller";
import { nonTokenRequireAPIs } from "@/api/api";
//call api to get game categories
const GameCategoriesfetcher = async (): Promise<IGameCategories[]> => {
  const res = await ApiCaller.get(nonTokenRequireAPIs.getGameCategory);
  const gameCategories = res.data;
  return gameCategories;
};
function GameCategory({ colSpan }: { colSpan?: string }) {
  const router = useRouter();
  const CategoryGridRef = useRef<HTMLDivElement | null>(null);
  const [rowNumber, setRowNumber] = useState<number>(0);
  const { data: gameCategories } = useSWR(
    "gameCategories",
    GameCategoriesfetcher
  );
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
