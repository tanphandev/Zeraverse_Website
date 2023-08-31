"use client";
import { useEffect, useRef } from "react";
import { gameList } from "@/dataFetch/dataFetch";
import Image from "next/image";
import CategoryGame from "@/components/Games/CategoryGame";
import Link from "next/link";

function Category() {
  const gridSystemRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLImageElement[]>([]);
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
    return;
  }, []);
  return (
    <div>
      <div className="grid grid-cols-11 gap-4">
        <h2 className="col-span-4 text-[28px] text-center font-bold font-nunito text-main-whileColor py-7 rounded-[10px] bg-gradient-to-b from-[#979BFF] via-[#ef75f5] to-[#EF36C6] mb-4">
          .io Games
        </h2>
      </div>
      <div
        className="grid grid-cols-11 grid-flow-dense gap-4 mb-4"
        ref={gridSystemRef}
      >
        {gameList.map((game, index) => (
          <Link
            href={"/game-screen"}
            key={index}
            className="relative group hover:scale-105 transition-all ease-in-out duration-300"
          >
            <Image
              className={`max-w-full max-h-full rounded-[20px]`}
              src={game.src}
              alt="gamePicture"
            />
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)]">
              {game.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-11">
        <CategoryGame colSpan="col-span-10" />
      </div>
      <div className="font-lato text-main-whileColor bg-main-grayColor-80 py-4 px-7 mt-20 min-h-[311px] mb-[42px]">
        <nav className="text-[10px] font-bold">Home / .io Games </nav>
        <h1 className="text-[28px] font-bold mb-2">.io Games </h1>
        <p className="text-sm font-normal">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis. Lorem ipsum dolor sit amet consectetur adipiscing
          elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
          sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
          vitae mattis tellus. Nullam quis.{" "}
        </p>
      </div>
    </div>
  );
}

export default Category;
