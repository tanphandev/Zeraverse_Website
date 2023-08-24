"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { categoryGameList } from "@/dataFetch/dataFetch";
import CategoryItem from "./CategoryItem";
function GameCategory({ colSpan }: { colSpan?: string }) {
  const router = useRouter();
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

      const itemLargeNumbers = [0, 1, 2, 3, 4];
      const itemLargeList = CategoryChild.filter((item, index) => {
        return itemLargeNumbers.includes(index);
      });
      itemLargeList.forEach((itemLarge) => {
        itemLarge.classList.add("row-span-2", "flex-col");
      });
    }
  }, []);

  const handleChooseCategory = (categoryName: string) => {
    router.push(`/game-category/${categoryName}`);
  };
  return (
    <div
      ref={CategoryGridRef}
      className={`flex-1 grid grid-cols-5 grid-rows-${rowNumber} gap-4 ${colSpan}`}
      id="CategoryGrid"
    >
      {categoryGameList.map((cateItem, index) => (
        <CategoryItem
          onClick={() => {
            handleChooseCategory(cateItem.name);
          }}
          key={index}
          src={cateItem.src}
          name={cateItem.name}
        />
      ))}
    </div>
  );
}

export default GameCategory;
