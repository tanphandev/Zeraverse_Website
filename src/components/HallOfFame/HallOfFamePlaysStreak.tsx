import Image from "next/image";
import fame1 from "@/asset/image/fame1.png";
import fame2 from "@/asset/image/fame2.png";
import fame3 from "@/asset/image/fame3.png";
import top1 from "@/asset/image/fame1-1.png";
import top2 from "@/asset/image/fame2-2.png";
import top3 from "@/asset/image/fame3-3.png";
import Avatar from "@/asset/image/profilePicture.png";
import PlayStreakLeft from "@/asset/image/PlayStreakLeft.png";
import PlayStreakRight from "@/asset/image/PlayStreakRight.png";
import PlayedGameRate from "@/asset/image/playedGameRateAvatar.png";
import RateTable from "./RateTable";
import { IHallOfFamePlayStreak } from "@/interface/user/IHallOfFamePlayStreak";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
type Props = {
  hallOfFamePlaysStreak: IHallOfFamePlayStreak[];
};
function PlayStreak({ hallOfFamePlaysStreak }: Props) {
  const topThreeUser = hallOfFamePlaysStreak
    ? hallOfFamePlaysStreak?.slice(0, 3)
    : [];
  const remainingUser = hallOfFamePlaysStreak
    ? hallOfFamePlaysStreak?.slice(3)
    : [];
  console.log("topThreeUser", topThreeUser);
  return (
    <div className="px-[80px] pb-[40px] border-[5px] border-main-pink-f9 rounded-[30px]">
      <div className="flex justify-center items-end mt-[206px] mb-[22px] animate-fadeUp">
        <div>
          <div className="relative mx-[15px]">
            <Image src={fame2} alt="fame2" className="w-[233px]" />
            <div className="flex flex-col items-center absolute bottom-[42px] left-1/2 -translate-x-1/2">
              <CustomImage
                className="w-[94px] h-[94px] mb-[10px] rounded-[10px]"
                src={topThreeUser[1]?.user?.avatar?.url}
                fallback={images.default_profile_image}
                alt="picture"
                width={0}
                height={0}
              />
              <p className="text-base font-medium font-lato text-main-whileColor mb-[14px]">
                {topThreeUser[1]?.user?.username}
              </p>
              <Image src={top2} alt="top1" width={50} height={50} />
              <div>
                <div className="flex justify-center items-center mb-[5px]">
                  <Image
                    src={PlayStreakLeft}
                    alt="StreakPic"
                    className="w-[24px] h-[54px]"
                  />
                  <p className="text-[32px] font-bold font-lato mx-1">
                    {topThreeUser[1]?.user?.highest_playstreak}
                  </p>
                  <Image
                    src={PlayStreakRight}
                    alt="StreakPic"
                    className="w-[24px] h-[53px]"
                  />
                </div>
                <p className="text-center text-sm font-medium font-lato">
                  playsteak
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mx-[15px] mb-[44px]">
            <Image src={fame1} alt="fame1" className="w-[233px]" />
            <div className="flex flex-col items-center absolute bottom-[42px] left-1/2 -translate-x-1/2">
              <CustomImage
                className="w-[94px] h-[94px] mb-[10px] rounded-[10px]"
                src={topThreeUser[0]?.user?.avatar?.url}
                fallback={images.default_profile_image}
                alt="picture"
                width={0}
                height={0}
              />
              <p className="text-base font-medium font-lato text-main-whileColor mb-[14px]">
                {topThreeUser[0]?.user?.username}
              </p>
              <Image src={top1} alt="top1" width={50} height={50} />
              <div>
                <div className="flex justify-center items-center mb-[5px]">
                  <Image
                    src={PlayStreakLeft}
                    alt="StreakPic"
                    className="w-[24px] h-[54px]"
                  />
                  <p className="text-[32px] font-bold font-lato mx-1">
                    {topThreeUser[0]?.user?.highest_playstreak}
                  </p>
                  <Image
                    src={PlayStreakRight}
                    alt="StreakPic"
                    className="w-[24px] h-[53px]"
                  />
                </div>
                <p className="text-center text-sm font-medium font-lato">
                  playsteak
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mx-[15px]">
            <Image src={fame3} alt="fame3" className="w-[233px]" />
            <div className="flex flex-col items-center absolute bottom-[42px] left-1/2 -translate-x-1/2">
              <CustomImage
                className="w-[94px] h-[94px] mb-[10px] rounded-[10px]"
                src={topThreeUser[2]?.user?.avatar?.url}
                fallback={images.default_profile_image}
                alt="picture"
                width={0}
                height={0}
              />
              <p className="text-base font-medium font-lato text-main-whileColor mb-[14px]">
                {topThreeUser[2]?.user?.username}
              </p>
              <Image src={top3} alt="top1" width={50} height={50} />
              <div>
                <div className="flex justify-center items-center mb-[5px]">
                  <Image
                    src={PlayStreakLeft}
                    alt="StreakPic"
                    className="w-[24px] h-[54px]"
                  />
                  <p className="text-[32px] font-bold font-lato mx-1">
                    {topThreeUser[2]?.user?.highest_playstreak}
                  </p>
                  <Image
                    src={PlayStreakRight}
                    alt="StreakPic"
                    className="w-[24px] h-[53px]"
                  />
                </div>
                <p className="text-center text-sm font-medium font-lato">
                  playsteak
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RateTable
        quanityName="Playstreak"
        list={remainingUser}
        itemsPerPage={10}
      />
    </div>
  );
}

export default PlayStreak;
