"use client";
import { useEffect, useRef, useState } from "react";
import { inRange } from "@/utils/helper";
import CategoryGameItem from "./CategoryGameItem";
import { IGameCategory } from "@/interface/games/IGameCategory";
type Props = {
  listCategory: IGameCategory[];
};
function GameCategory({ listCategory }: Props) {
  const CategoryGridRef = useRef<HTMLDivElement | null>(null);
  const [rowNumber, setRowNumber] = useState<number>(0);

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
  }, [listCategory]);

  return (
    <div className="grid sm:grid-cols-[repeat(auto-fill,94px)] md:auto-rows-[94px] gap-4 mt-4 justify-center">
      {listCategory?.map((item, index) => (
        <CategoryGameItem
          item={item}
          key={index}
          index={index}
          className={inRange(index, 0, 6) ? "row-span-2" : "row-span-1"}
        ></CategoryGameItem>
      ))}
    </div>
  );
}

export default GameCategory;
