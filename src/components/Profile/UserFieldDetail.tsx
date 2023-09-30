"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import NoData from "../Others/NoData";
import IGame from "@/interface/games/IGame";
type Props = {
  title: string;
  dataList: IGame[];
  onBack: (title: string) => void;
};

function UserFieldDetail({ title, dataList, onBack }: Props) {
  const userFieldDetailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (userFieldDetailRef.current) {
      userFieldDetailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div
      ref={userFieldDetailRef}
      className="h-full text-main-whileColor bg-main-grayColor-50 rounded-[20px] mb-[40px]"
    >
      <div className="relative">
        <h2 className=" flex items-center justify-center text-[28px] text-center font-bold bg-main-pink-ec rounded-t-[20px] py-4">
          {title}
        </h2>
        <button
          onClick={() => {
            onBack(title);
          }}
          className="absolute top-1/2 left-5 -translate-y-1/2 text-sm font-bold font-lato"
        >
          {"<"} Back
        </button>
      </div>

      {dataList.length === 0 ? (
        <div className="p-11">
          <NoData />
        </div>
      ) : (
        <div className="grid grid-cols-10 gap-4 p-11">
          {dataList.map((item, index) => (
            <Image
              key={index}
              src={item.thumbnail}
              alt="game_picture"
              className="w-full rounded-[10px]"
              width={0}
              height={0}
              sizes="100vw"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserFieldDetail;
