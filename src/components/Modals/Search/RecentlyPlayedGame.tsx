import Link from "next/link";
import { images } from "@/asset/image/images";
import CustomImage from "@/components/Others/CustomImage";
import IGame from "@/interface/games/IGame";
import { staticPaths } from "@/utils/paths";

type Props = {
  recentlyPlayedGameList: IGame[];
  closeModal: (duration: number) => void;
};
function RecentlyPlayedGame({ recentlyPlayedGameList, closeModal }: Props) {
  return (
    <>
      <h2 className="text-2xl font-bold font-nunito text-main-whileColor mb-4">
        Recently played
      </h2>
      <ul className="max-w-[644px] w-full overflow-hidden overflow-x-scroll no-scrollbar flex mb-[27px] px-1 py-2">
        {recentlyPlayedGameList?.map((item, index) => {
          return (
            <li className="rounded-[10px] mr-4" key={index}>
              <Link
                onClick={() => {
                  closeModal(400);
                }}
                href={staticPaths.game_detail(item?.slug)}
              >
                <div className="relative group hover:scale-105 transition-all ease-in-out duration-300">
                  <CustomImage
                    className="min-w-[94px] w-[94px] h-[94px] rounded-[20px] "
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
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default RecentlyPlayedGame;
