import Link from "next/link";
import { images } from "@/asset/image/images";
import CategoryGameItem from "@/components/Games/CategoryGameItem";
import CustomImage from "@/components/Others/CustomImage";
import IGame from "@/interface/games/IGame";
import { ISearchGame } from "@/interface/games/ISearchGame";
import { staticPaths } from "@/utils/paths";
import { useEffect, useState } from "react";
import { useModalContext } from "@/contexts/ModalContextProvider";

type Props = {
  searchResult: ISearchGame | null;
};
function SearchResult({ searchResult }: Props) {
  const [isNoData, setIsNoData] = useState<boolean>();
  const { category, game, gameByCategory } = searchResult ?? {};
  const { closeModalWithAnimation } = useModalContext();
  useEffect(() => {
    if (searchResult) {
      const resultSize = Object.values(searchResult).reduce(
        (acc, val) => acc + val.length,
        0
      );
      resultSize === 0 ? setIsNoData(true) : setIsNoData(false);
    }
  }, [searchResult]);
  return (
    <>
      {isNoData ? (
        <div className="bg-main-whileColor text-main-blackColor px-6 py-[18px] rounded-[2px] w-full max-w-[602px] mt-[40px]">
          <h2 className="text-[22px] font-bold font-nunito">
            Sorry, we don’t have anything like that.
          </h2>
          <p className="font-medium font-nunito">Can you try something else?</p>
        </div>
      ) : (
        <div className="grid grid-cols-6 grid-rows-[repeat(auto-fill,94px)] h-[70vh] gap-4 pb-6 mt-[40px] pt-1 px-2 overflow-y-scroll no-scrollbar">
          {category?.map((item, index) => (
            <CategoryGameItem
              item={item}
              key={index}
              index={index + 7}
              className="row-span-1"
              closeModalWithAnimation={closeModalWithAnimation}
            />
          ))}
          {game?.concat(gameByCategory)?.map((item: IGame, index: number) => (
            <Link
              key={index}
              href={staticPaths.game_detail(item?.slug)}
              onClick={() => {
                closeModalWithAnimation(400);
              }}
            >
              <div className="relative group hover:scale-105 transition-all ease-in-out duration-300">
                <CustomImage
                  className="min-w-[94px] w-[] h-[94px] rounded-[20px] "
                  src={item?.thumbnail}
                  fallback={images.default_game_image}
                  alt="gamepicture"
                  width={0}
                  height={0}
                />
                <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
                  {item?.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchResult;
