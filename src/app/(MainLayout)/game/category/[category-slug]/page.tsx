"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "@/store/store";
import CategoryGame from "@/components/Games/CategoryGame";
import { staticPaths } from "@/utils/paths";
import { useDispatch, useSelector } from "react-redux";
import * as gameService from "@/services/game.service";
import IGame from "@/interface/games/IGame";
import { IGameCategory } from "@/interface/games/IGameCategory";
import {
  toUpperCaseFirstLetterOfDoc,
  toUpperCaseFirstLetterOfWord,
} from "@/utils/helper";
import CustomImage from "@/components/Others/CustomImage";
import { images } from "@/asset/image/images";
import Breadcrumbs from "@/components/Others/Breadcumbs";
type AllGameOfCategory = {
  description: string;
  detail: IGame[];
  otherCategory: IGameCategory[];
};

function Category({ params }: { params: { "category-slug": string } }) {
  const dispatch = useDispatch<AppDispatch>();
  const allGameOfCategory =
    (useSelector<RootState>(
      (state: any) => state?.game?.game[params["category-slug"]]
    ) as AllGameOfCategory) ?? null;
  const gridSystemRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    dispatch(gameService.getGame(params["category-slug"]));
  }, []);
  return (
    <div>
      <div className="grid grid-cols-11 gap-4">
        <h2 className="col-span-4 text-[28px] text-center font-bold font-nunito text-main-whileColor py-7 rounded-[10px] bg-gradient-to-b from-[#979BFF] via-[#ef75f5] to-[#EF36C6] mb-4">
          {toUpperCaseFirstLetterOfWord(params["category-slug"])}
        </h2>
      </div>
      <div
        className="grid grid-cols-11 grid-flow-dense gap-4 mb-[80px]"
        ref={gridSystemRef}
      >
        {allGameOfCategory?.detail?.map((game, index) => (
          <Link
            href={staticPaths.game_detail(game?.slug)}
            key={index}
            className="relative group hover:scale-105 transition-all ease-in-out duration-300"
          >
            <CustomImage
              className={`max-w-full max-h-full w-full h-full min-h-[94px] rounded-[20px]`}
              src={game.thumbnail}
              fallback={images.default_game_image}
              alt="gamePicture"
              sizes="100vw"
              width={0}
              height={0}
            />
            <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
              {game.title}
            </p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-11">
        <CategoryGame
          listCategory={allGameOfCategory?.otherCategory}
          colSpan="col-span-10"
        />
      </div>
      <div className="font-lato text-main-whileColor bg-main-grayColor-80 py-4 px-7 mt-20 mb-[42px] rounded-[20px]">
        <Breadcrumbs
          items={[
            {
              label: "Home",
              path: staticPaths.home,
            },
            {
              label: toUpperCaseFirstLetterOfDoc(params["category-slug"]),
              path: "",
            },
          ]}
        />
        <h1 className="text-[28px] font-bold mb-2">
          {`.${toUpperCaseFirstLetterOfWord(params["category-slug"])}`}
        </h1>
        <p className="text-base font-normal font-nunito mb-4">
          {allGameOfCategory?.description}
        </p>
      </div>
    </div>
  );
}
export default Category;
