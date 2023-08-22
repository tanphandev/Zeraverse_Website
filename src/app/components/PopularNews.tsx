import Image from "next/image";
import PopularPic from "@/asset/image/popularPic.jpeg";
import TrendingNew from "@/asset/image/trendingNew1.png";
function PopularNews() {
  return (
    <div className="mb-[30px]">
      <h2 className="text-[28px] font-bold font-lato text-main-whileColor mb-[10px]">
        Popular News
      </h2>
      <div className="grid grid-cols-7 gap-5 ">
        <div className="relative col-span-5 bg-gradient-to-b from-main-whileColor to-main-blackColor rounded-[5px]">
          <Image
            src={PopularPic}
            alt="picture"
            className="w-full h-[480px] rounded-[5px]"
          />
          <div className="absolute bottom-4 left-4 flex flex-col">
            <div className=" ">
              <p className="inline text-[10px] font-normal font-nunito text-main-blackColor py-[6px] px-[10px] bg-main-whileColor rounded-[10px] mb-[2px]">
                Car game
              </p>
              <h2 className="text-[28px] font-bold font-lato text-main-whileColor mb-[2px]">
                The unseen of spending three years at Pixelgrade
              </h2>
              <p className="text-xs font-light font-nunito text-main-whileColor mb-[18px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </p>
              <p className="text-[10px] font-light font-nunito text-main-whileColor">
                2 April, 2023
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 text-main-whileColor bg-main-blackColor rounded-[5px] border-[1px] border-main-pink-be">
          <Image
            src={TrendingNew}
            alt="picture"
            className="w-full h-auto px-[8px] pt-[8px] rounded-[5px] mb-[12px]"
          />
          <div className="flex flex-col px-[15px] pb-[15px]">
            <div>
              <p className="inline-block font-normal text-[10px] leading-[1.4] font-nunito text-[#000000] bg-main-whileColor rounded-[10px] py-[6px] px-[10px] mb-[6px] ">
                Car Game
              </p>
              <h2 className="text-2xl font-bold font-lato">
                The unseen of spending three years at Pixelgrade
              </h2>
              <p className="text-xs font-light font-nunito text-justify mr-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularNews;
