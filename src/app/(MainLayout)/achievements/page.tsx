"use client";
import { useRouter } from "next/navigation";
import achievementZera from "@/asset/image/achievementZera.png";
import achievementPlayedGame from "@/asset/image/achievementPlayedGame.png";
import achievementLeft from "@/asset/image/achievementLeft.png";
import achievementRight from "@/asset/image/achievementRight.png";
import gamePic from "@/asset/image/game1.png";
import Image from "next/image";
import CoinIcon from "@/asset/icons/CoinIcon";
function Achievements() {
  const router = useRouter();
  const GotoHome = () => {
    router.push("/");
  };
  return (
    <div className="relative flex flex-col items-center font-lato text-main-whileColor border-[5px] border-main-pink-f4 rounded-[20px] bg-main-grayColor-80 px-[60px] pb-[62px] mb-[40px]">
      <button
        onClick={GotoHome}
        className="absolute top-[25px] left-[21px] text-sm font-bold text-main-pink-ec"
      >
        {"<"}Back
      </button>
      <div className="mt-[9px]">
        <h1 className="inline text-[40px] font-bold font-lato px-[30px] py-[10px] bg-main-pink-9d rounded-[20px] shadow-[inset_-2px_-2px_2px_rgba(0,0,0,0.6)] ">
          Achievements
        </h1>
      </div>
      <div className="w-full rounded-[30px] bg-gradient-to-br from-[#FF00E5] via-[#EAC6E6] to-[#950086] p-[5px] mt-[100px] ">
        <div className="w-full bg-gradient-to-b from-[#300373] to-[#2c026a] py-[64px] px-[110px] rounded-[30px]">
          <div className="flex justify-center mb-[16px]">
            <div className="px-[13px] pt-[22px] pb-[24px] rounded-[30px] border-[1px] border-main-pink-f9 bg-gradient-to-b from-[#D34880] to-[#2F0652]">
              <div className="flex flex-col w-[204px] items-center py-[10px] mb-[55px]">
                <Image
                  src={achievementZera}
                  alt={"achievementRight"}
                  className="w-[118px] h-[118px] mb-[10px]"
                />
                <p className="text-[28px] font-semibold font-nunito ">10000</p>
              </div>
              <p className="text-center font-bold text-base">Earned Zera</p>
            </div>
            <div className="px-[13px] pt-[22px] pb-[24px] rounded-[30px] border-[1px] border-main-pink-f9 bg-gradient-to-b from-[#D34880] to-[#2F0652] mx-[25px]">
              <div className="flex flex-col w-[204px] items-center py-[10px] mb-[55px]">
                <Image
                  src={achievementPlayedGame}
                  alt={"achievementRight"}
                  className="w-[118px] h-[118px] mb-[10px]"
                />
                <p className="text-[28px] font-semibold font-nunito ">10000</p>
              </div>
              <p className="text-center font-bold text-base">
                Total games played
              </p>
            </div>
            <div className="px-[13px] pt-[22px] pb-[24px] rounded-[30px] border-[1px] border-main-pink-f9 bg-gradient-to-b from-[#D34880] to-[#2F0652] mx-[25px]">
              <div className="flex flex-col w-[204px] items-center py-[10px] mb-[55px]">
                <div className="mb-[10px] flex items-center">
                  <Image
                    src={achievementLeft}
                    alt="image"
                    className="w-[47px] h-[112px]"
                  />
                  <div className="flex flex-col h-[118px] justify-end">
                    <div className="h-[20px]"></div>
                    <p
                      className="text-[90px] leading-[98px] font-bold font-nunito bg-gradient-to-b bg-clip-text text-transparent from-[#FDE3A7] via-[#DE82A6] to-[#7185DF]"
                      style={{
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      15
                    </p>
                  </div>
                  <Image
                    src={achievementRight}
                    alt="image"
                    className="w-[47px] h-[112px]"
                  />
                </div>
                <div className="h-[45px]"></div>
              </div>
              <div className="relative">
                <p className="text-center font-bold text-base">
                  Highest Playstreak
                </p>
                <p className="absolute text-[10px] font-normal font-lato bottom-[-14px] left-1/2 -translate-x-1/2">
                  Playstreak: 2 days
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[28px] font-semibold font-lato text-main-whileColor mb-[15px] text-center">
              Top game played
            </h2>
            <div className="grid grid-cols-2 gap-x-[21px] gap-y-[15px]">
              <div className=" flex justify-between items-center bg-gradient-to-b from-[#8B5CF6] to-[#503098] rounded-[20px] p-[10px]">
                <div className="flex items-center">
                  <Image
                    src={gamePic}
                    alt="iamge"
                    className="w-[94px] h-[94px] mr-[10px]"
                  />
                  <p className="text-base font-bold font-lato text-main-whileColor">
                    Onmyoji The World
                  </p>
                </div>
                <div>
                  <p className="text-base font-bold font-lato text-main-whileColor inline mr-4">
                    1000
                  </p>
                  <CoinIcon className="inline" width="32px" height="32px" />
                </div>
              </div>
              <div className=" flex justify-between items-center bg-gradient-to-b from-[#8B5CF6] to-[#503098] rounded-[20px] p-[10px]">
                <div className="flex items-center">
                  <Image
                    src={gamePic}
                    alt="iamge"
                    className="w-[94px] h-[94px] mr-[10px]"
                  />
                  <p className="text-base font-bold font-lato text-main-whileColor">
                    Onmyoji The World
                  </p>
                </div>
                <div>
                  <p className="text-base font-bold font-lato text-main-whileColor inline mr-4">
                    1000
                  </p>
                  <CoinIcon className="inline" width="32px" height="32px" />
                </div>
              </div>
              <div className=" flex justify-between items-center bg-gradient-to-b from-[#8B5CF6] to-[#503098] rounded-[20px] p-[10px]">
                <div className="flex items-center">
                  <Image
                    src={gamePic}
                    alt="iamge"
                    className="w-[94px] h-[94px] mr-[10px]"
                  />
                  <p className="text-base font-bold font-lato text-main-whileColor">
                    Onmyoji The World
                  </p>
                </div>
                <div>
                  <p className="text-base font-bold font-lato text-main-whileColor inline mr-4">
                    1000
                  </p>
                  <CoinIcon className="inline" width="32px" height="32px" />
                </div>
              </div>
              <div className=" flex justify-between items-center bg-gradient-to-b from-[#8B5CF6] to-[#503098] rounded-[20px] p-[10px]">
                <div className="flex items-center">
                  <Image
                    src={gamePic}
                    alt="iamge"
                    className="w-[94px] h-[94px] mr-[10px]"
                  />
                  <p className="text-base font-bold font-lato text-main-whileColor">
                    Onmyoji The World
                  </p>
                </div>
                <div>
                  <p className="text-base font-bold font-lato text-main-whileColor inline mr-4">
                    1000
                  </p>
                  <CoinIcon className="inline" width="32px" height="32px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
