"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import NoData from "../Others/NoData";
import IGame from "@/interface/games/IGame";
import Link from "next/link";
import CustomImage from "../Others/CustomImage";
import { staticPaths } from "@/utils/paths";
import { images } from "@/asset/image/images";
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
        <div className="grid grid-cols-[repeat(auto-fill,94px)] auto-rows-[94px] gap-4 py-11 px-[55px] flex justify-center ">
          {dataList.map((item, index) => (
            <Link
              href={staticPaths.game_detail(item?.slug)}
              key={index}
              className="w-full h-full relative group hover:scale-105 transition-all ease-in-out duration-300 inline-block "
            >
              <CustomImage
                className={`w-full h-full object-cover rounded-[20px]`}
                src={item?.thumbnail}
                fallback={images.default_game_image}
                alt="Image"
                width={0}
                height={0}
                sizes="100vw"
              />
              <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
                {item?.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserFieldDetail;
