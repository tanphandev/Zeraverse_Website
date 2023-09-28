import Image from "next/image";
import Tippy from "@tippyjs/react";
import fame1 from "@/../public/asset/image/fame1.png";
import fame2 from "@/../public/asset/image/fame2.png";
import fame3 from "@/../public/asset/image/fame3.png";
import top1 from "@/../public/asset/image/fame1-1.png";
import top2 from "@/../public/asset/image/fame2-2.png";
import top3 from "@/../public/asset/image/fame3-3.png";
import RateTable from "./RateTable";
import CoinIcon from "@/asset/icons/CoinIcon";
import { IHallOfFameZera } from "@/interface/user/IHallOfFameZera";
import { abbreviateNumber } from "@/utils/helper";
import Link from "next/link";
import { staticPaths } from "@/utils/paths";
import "tippy.js/dist/tippy.css";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
type Props = {
  hallOfFameZera: IHallOfFameZera[];
};
function HallOfFameZera({ hallOfFameZera }: Props) {
  const topThreeUser = hallOfFameZera ? hallOfFameZera?.slice(0, 3) : [];
  const remainingUser = hallOfFameZera ? hallOfFameZera?.slice(3) : [];
  return (
    <div className="px-[80px] pb-[40px] border-[5px] border-main-pink-f9 rounded-[30px]">
      {/* three ranked user */}
      <div className="transition-all flex justify-center items-end mt-[206px] mb-[22px] animate-fadeUp">
        <div>
          <div className="relative mx-[15px]">
            <Image src={fame2} alt="fame2" className="w-[233px] h-[158px]" />
            <div className="flex flex-col items-center absolute bottom-[54px] left-1/2 -translate-x-1/2">
              <Link
                href={staticPaths.achievements(
                  encodeURI(topThreeUser[1]?.user?.username)
                )}
              >
                <CustomImage
                  className="mb-[10px] rounded-[10px]"
                  src={topThreeUser[1]?.user?.avatar?.url}
                  fallback={images.default_profile_image}
                  alt="picture"
                  width={94}
                  height={94}
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
                <CoinIcon width="30px" height="30px" className="mr-2" />
                <div>
                  <p className="text-[28px] font-lato leading-[1]">
                    {abbreviateNumber(+topThreeUser[1]?.total_earned_zera)}
                  </p>
                  <p className="text-sm font-medium font-lato">Zera</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mx-[15px] mb-[44px]">
            <Image src={fame1} alt="fame1" className="w-[233px] h-[158px]" />
            <div className="flex flex-col items-center absolute bottom-[54px] left-1/2 -translate-x-1/2">
              <Link
                href={staticPaths.achievements(
                  encodeURI(topThreeUser[0]?.user?.username)
                )}
              >
                <CustomImage
                  className="mb-[10px] rounded-[10px]"
                  src={topThreeUser[0]?.user?.avatar?.url}
                  fallback={images.default_profile_image}
                  alt="picture"
                  width={94}
                  height={94}
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
                  <p className="text-base font-medium font-lato text-main-whileColor mb-[14px] hover:text-main-pink-db hover:underline">
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
                <CoinIcon width="30px" height="30px" className="mr-2" />
                <div>
                  <p className="text-[28px] font-lato leading-[1]">
                    {abbreviateNumber(+topThreeUser[1]?.total_earned_zera)}
                  </p>
                  <p className="text-sm font-medium font-lato">Zera</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mx-[15px]">
            <Image src={fame3} alt="fame3" className="w-[233px] h-[158px]" />
            <div className="flex flex-col items-center absolute bottom-[54px] left-1/2 -translate-x-1/2">
              <Link
                href={staticPaths.achievements(
                  encodeURI(topThreeUser[2]?.user?.username)
                )}
              >
                <CustomImage
                  className="mb-[10px] rounded-[10px]"
                  src={topThreeUser[2]?.user?.avatar?.url}
                  fallback={images.default_profile_image}
                  alt="picture"
                  width={94}
                  height={94}
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
                  <p className="text-base font-medium font-lato text-main-whileColor mb-[14px] hover:text-main-pink-db hover:underline">
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
                <CoinIcon width="30px" height="30px" className="mr-2" />
                <div>
                  <p className="text-[28px] font-lato leading-[1]">
                    {abbreviateNumber(+topThreeUser[2]?.total_earned_zera)}
                  </p>
                  <p className="text-sm font-medium font-lato">Zera</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* remaining user */}
      <RateTable quanityName="ZERA" list={remainingUser} itemsPerPage={10} />
    </div>
  );
}

export default HallOfFameZera;
