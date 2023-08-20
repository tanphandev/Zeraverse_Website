"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { gameList } from "@/app/dataFetch/dataFetch";
import CategoryGame from "@/app/components/CategoryGame";
import TrendingNew from "@/app/components/TrendingNew";
import DailyGiftModal from "@/app/components/DailyGiftModal";
import { currentUserSelector } from "@/redux-toolkit/selectors/authenticationSelector";
function HomePage() {
  const router = useRouter();
  const gridSystemRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLImageElement[]>([]);
  const isCurrentUser = useSelector(currentUserSelector);
  const [isShowDailyGiftModal, setIsShowDailyGiftModal] =
    useState<boolean>(false);
  useEffect(() => {
    //if isCurrentUser is true, show Daily gift
    if (isCurrentUser) {
      const timeOut = setTimeout(() => {
        setIsShowDailyGiftModal(true);
      }, 1000);
    }
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
  //close modal event
  const closeModal = () => {
    setIsShowDailyGiftModal(false);
  };
  //Go to Game Screen
  const gotoGameScreen = () => {
    router.push("/game-screen");
  };
  return (
    <div>
      <div
        className="grid grid-cols-11 grid-flow-dense gap-4"
        ref={gridSystemRef}
      >
        {gameList.map((game, index) => (
          <div onClick={gotoGameScreen} key={index}>
            <Image
              className={`max-w-full max-h-full rounded-[10px]`}
              src={game.src}
              alt="gamePicture"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-11 grid-rows-1 gap-4 mt-4">
        <CategoryGame colSpan="col-span-10" />
        <div className="col-span-1"></div>
      </div>
      <TrendingNew />
      {isShowDailyGiftModal && <DailyGiftModal closeModal={closeModal} />}
    </div>
  );
}

export default HomePage;
