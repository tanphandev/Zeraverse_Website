import Link from "next/link";
import Image from "next/image";
import fame1 from "@/../public/asset/image/fame1.png";
import fame2 from "@/../public/asset/image/fame2.png";
import fame3 from "@/../public/asset/image/fame3.png";
import top1 from "@/../public/asset/image/fame1-1.png";
import top2 from "@/../public/asset/image/fame2-2.png";
import top3 from "@/../public/asset/image/fame3-3.png";
import PlayedGameRate from "@/../public/asset/image/gameplayedRate.png";
import RateTable from "./RateTable";
import { IHallOfFameGamePlayed } from "@/interface/user/IHallOfFameGamePlayed";
import { abbreviateNumber } from "@/utils/helper";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
import { staticPaths } from "@/utils/paths";
import Tippy from "@tippyjs/react";
type Props = {
  hallOfFameGamePlayed: IHallOfFameGamePlayed[];
};
function GamePlayed({ hallOfFameGamePlayed }: Props) {
  const topThreeUser = hallOfFameGamePlayed
    ? hallOfFameGamePlayed?.slice(0, 3)
    : [];
  const remainingUser = hallOfFameGamePlayed
    ? hallOfFameGamePlayed?.slice(3)
    : [];
  return (
    <div className="pb-[40px] border-[5px] border-main-pink-f9 rounded-[20px]">
      <div className="transition-all flex justify-center flex-wrap gap-y-[170px] items-end mt-[206px] mb-[22px] animate-fadeUp">
        <div>
          <div className="relative mx-[15px]">
            <Image src={fame2} alt="fame2" className="w-[233px] --[158px]" />
            <div className="flex flex-col items-center absolute bottom-[54px] left-1/2 -translate-x-1/2">
              <Link
                href={staticPaths.achievements(
                  encodeURI(topThreeUser[1]?.user?.username)
                )}
              >
                <CustomImage
                  className="w-[94px] h-[94px] mb-[10px] rounded-[10px]"
                  src={topThreeUser[1]?.user?.avatar?.url}
                  fallback={images.default_profile_image}
                  alt="picture"
                  width={0}
                  height={0}
                />
              </Link>
              <Tippy
                content={topThreeUser[1]?.user?.username}
                placement="bottom"
              >
                <Link
                  href={staticPaths.achievements(
                    encodeURI(topThreeUser[1]?.user?.username)
                  )}
                >
                  <p className="text-base font-medium font-lato text-main-whileColor mb-[14px] hover:text-main-pink-db hover:underline">
                    {topThreeUser[1]?.user?.username}
                  </p>
                </Link>
              </Tippy>
              <Image
                className="mb-[18px]"
                src={top2}
                alt="top1"
                width={50}
                height={50}
              />
              <div className="flex items-center">
                <Image
                  src={PlayedGameRate}
                  alt="ratePic"
                  className="mr-2 w-[35px] h-[27px]"
                />
                <div>
                  <p className="text-[28px] font-lato leading-[1]">
                    {abbreviateNumber(+topThreeUser[1]?.total_games_played)}
                  </p>
                  <p className="text-sm font-medium font-lato">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mx-[15px] mb-[44px]">
            <Image src={fame1} alt="fame1" className="w-[233px] --[158px]" />
            <div className="flex flex-col items-center absolute bottom-[54px] left-1/2 -translate-x-1/2">
              <Link
                href={staticPaths.achievements(
                  encodeURI(topThreeUser[0]?.user?.username)
                )}
              >
                <CustomImage
                  className="w-[94px] h-[94px] mb-[10px] rounded-[10px]"
                  src={topThreeUser[0]?.user?.avatar?.url}
                  fallback={images.default_profile_image}
                  alt="picture"
                  width={0}
                  height={0}
                />
              </Link>
              <Tippy
                content={topThreeUser[0]?.user?.username}
                placement="bottom"
              >
                <Link
                  href={staticPaths.achievements(
                    encodeURI(topThreeUser[0]?.user?.username)
                  )}
                >
                  <p className="text-base font-medium font-lato text-main-whileColor mb-[14px] hover:text-main-pink-ec hover:underline">
                    {topThreeUser[0]?.user?.username}
                  </p>
                </Link>
              </Tippy>
              <Image
                className="mb-[18px]"
                src={top1}
                alt="top1"
                width={50}
                height={50}
              />
              <div className="flex items-center">
                <Image
                  src={PlayedGameRate}
                  alt="ratePic"
                  className="mr-2 w-[35px] h-[27px]"
                />
                <div>
                  <p className="text-[28px] font-lato leading-[1]">
                    {abbreviateNumber(+topThreeUser[0]?.total_games_played)}
                  </p>
                  <p className="text-sm font-medium font-lato">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mx-[15px]">
            <Image src={fame3} alt="fame3" className="w-[233px] --[158px]" />
            <div className="flex flex-col items-center absolute bottom-[54px] left-1/2 -translate-x-1/2">
              <Link
                href={staticPaths.achievements(
                  encodeURI(topThreeUser[2]?.user?.username)
                )}
              >
                <CustomImage
                  className="w-[94px] h-[94px] mb-[10px] rounded-[10px]"
                  src={topThreeUser[2]?.user?.avatar?.url}
                  fallback={images.default_profile_image}
                  alt="picture"
                  width={0}
                  height={0}
                />
              </Link>
              <Tippy
                content={topThreeUser[2]?.user?.username}
                placement="bottom"
              >
                <Link
                  href={staticPaths.achievements(
                    encodeURI(topThreeUser[2]?.user?.username)
                  )}
                >
                  <p className="text-base font-medium font-lato text-main-whileColor mb-[14px] hover:text-main-pink-ec hover:underline">
                    {topThreeUser[2]?.user?.username}
                  </p>
                </Link>
              </Tippy>
              <Image
                className="mb-[18px]"
                src={top3}
                alt="top1"
                width={50}
                height={50}
              />
              <div className="flex items-center">
                <Image
                  src={PlayedGameRate}
                  alt="ratePic"
                  className="mr-2 w-[35px] h-[27px]"
                />
                <div>
                  <p className="text-[28px] font-lato leading-[1]">
                    {abbreviateNumber(+topThreeUser[2]?.total_games_played)}
                  </p>
                  <p className="text-sm font-medium font-lato">total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RateTable
        quanityName="Games played"
        list={remainingUser}
        itemsPerPage={10}
      />
    </div>
  );
}

export default GamePlayed;
