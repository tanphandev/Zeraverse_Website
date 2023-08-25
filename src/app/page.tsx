"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { gameList } from "@/dataFetch/dataFetch";
import CategoryGame from "@/components/CategoryGame";
import TrendingNew from "@/components/TrendingNew";
import DailyGiftModal from "@/components/DailyGiftModal";
import { currentUserSelector } from "@/redux-toolkit/selectors/authenticationSelector";
import Link from "next/link";
import MainLayout from "./(MainLayout)/layout";
import ApiCaller from "@/api/apiCaller";
import { nonTokenRequireAPIs } from "@/api/api";
import authenticationSlice from "@/redux-toolkit/slices/authenticationSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const gridSystemRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLImageElement[]>([]);
  const isCurrentUser = useSelector(currentUserSelector);
  const [isShowDailyGiftModal, setIsShowDailyGiftModal] =
    useState<boolean>(false);
  // GetUserProfile
  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (!!userName) {
      const fetchUserProfile = async () => {
        try {
          const res = await ApiCaller.get(
            `${nonTokenRequireAPIs.getUserProfile}/${userName}`
          );
          dispatch(authenticationSlice.actions.setCurrentUser(res.data));
        } catch (error) {
          throw error;
        }
      };
      fetchUserProfile();
    }
  }, []);
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
  }, [isCurrentUser]);
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
      <MainLayout>
        <div>
          <div
            className="grid grid-cols-11 grid-flow-dense gap-4"
            ref={gridSystemRef}
          >
            {gameList.map((game, index) => (
              <div
                onClick={gotoGameScreen}
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
              </div>
            ))}
          </div>
          <div className="grid grid-cols-11 grid-rows-1 gap-4 mt-4">
            <CategoryGame colSpan="col-span-10" />
            <div className="col-span-1"></div>
          </div>
          <div className="bg-main-grayColor-80 pt-[26px] pb-4 px-[53px] mt-[192px] mb-[70px]">
            <TrendingNew />
            <div>
              <h2 className="text-[28px] font-bold text-main-whileColor mb-[10px]">
                List Article category
              </h2>
              <div className=" text-sm font-normal font-lato text-main-pink-ec">
                <ul className="list-disc pl-[17px] mb-[14px]">
                  <li>Game</li>
                  <li>Game Play</li>
                  <li>Tattic Game</li>
                  <li>Gamer</li>
                </ul>
                <Link href={"article-category-all"}>View all {`>`}</Link>
              </div>
            </div>
          </div>
          {isShowDailyGiftModal && <DailyGiftModal closeModal={closeModal} />}
        </div>
      </MainLayout>
    </div>
  );
}
