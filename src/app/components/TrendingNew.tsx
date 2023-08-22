import Image from "next/image";
import TrendingNew1 from "@/asset/image/trendingNew1.png";
import TrendingNew2 from "@/asset/image/trendingNew2.png";

function TrendingNew() {
  return (
    <div>
      <h2 className="text-[28px] font-bold font-lato text-main-whileColor mb-[10px]">
        Trending News
      </h2>
      <div className="flex justify-center mb-[22px]">
        <div className="flex items-center border border-main-pink-be mr-4 rounded-[10px] bg-main-blackColor">
          <Image
            className="w-[194px] h-[194px] ml-[5px] mr-4 my-[5px]"
            src={TrendingNew1}
            alt="trendingNewPicture"
          />
          <div className="pr-[7px]">
            <p className="inline-block font-normal text-[10px] leading-[1.4] font-nunito text-[#000000] bg-main-whileColor rounded-[10px] py-[6px] px-[10px] ">
              Car Game
            </p>
            <h2 className="font-bold text-main-whileColor mb-[10px]">
              The unseen of spending three years at Pixelgrade
            </h2>
            <p className="text-xs font-light font-nunito text-main-whileColor">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
        </div>
        <div className="flex items-center border border-main-pink-be rounded-[10px] bg-main-blackColor">
          <Image
            className="w-[194px] h-[194px] ml-[5px] mr-4 my-[5px]"
            src={TrendingNew2}
            alt="trendingNewPicture"
          />
          <div className="pr-[7px]">
            <p className="inline-block font-normal text-[10px] leading-[1.4] font-nunito text-[#000000] bg-main-whileColor rounded-[10px] py-[6px] px-[10px] ">
              Car Game
            </p>
            <h2 className="font-bold text-main-whileColor mb-[10px]">
              The unseen of spending three years at Pixelgrade
            </h2>
            <p className="text-xs font-light font-nunito text-main-whileColor">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrendingNew;
