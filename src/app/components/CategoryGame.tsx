"use client";
import { categoryGameList } from "@/app/dataFetch/dataFetch";
import CategoryItem from "./CategoryItem";
import { useEffect, useRef, useState } from "react";
function CategoryGame({ className }: { className: string }) {
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
      console.log("itemLargeList", itemLargeList);
      itemLargeList.forEach((itemLarge) => {
        itemLarge.classList.add("row-span-2", "flex-col");
      });
    }
  }, []);
  return (
    <div
      ref={CategoryGridRef}
      className={`grid grid-cols-5 grid-rows-${rowNumber} gap-4 mt-4 ${className}`}
      id="CategoryGrid"
    >
      {categoryGameList.map((cateItem, index) => (
        <CategoryItem key={index} src={cateItem.src} name={cateItem.name} />
      ))}
    </div>
  );
}

export default CategoryGame;
