"use client";
import Image from "next/image";
import { gameList } from "@/app/dataFetch/dataFetch";
import { useEffect, useRef } from "react";
import CategoryGame from "@/app/components/CategoryGame";

function HomePage() {
  const gridSystemRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
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
  }, []);
  return (
    <div className="flex-1">
      <div
        className="grid grid-cols-11 grid-flow-dense gap-4"
        ref={gridSystemRef}
      >
        {gameList.map((game, index) => (
          <div key={index}>
            <Image
              className={`max-w-full max-h-full rounded-[10px] ${index}`}
              src={game.src}
              alt="gamePicture"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-11 grid-rows-1 gap-4">
        <CategoryGame className="col-span-10" />
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}

export default HomePage;
