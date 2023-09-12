import Link from "next/link";
import CategoryGame from "@/components/Games/CategoryGame";
import TrendingNew from "@/components/Articles/TrendingNew";
import MainLayout from "./(MainLayout)/layout";
import GameList from "@/components/Games/GameList";
import DailyGift from "@/components/DailyGift/DailyGift";

export default function Home() {
  return (
    <div>
      <MainLayout>
        <div>
          <GameList />
          <div className="grid grid-cols-11 grid-rows-1 gap-4 mt-4">
            <CategoryGame colSpan="col-span-10" />
            <div className="col-span-1"></div>
          </div>
          <div className="bg-main-grayColor-80 pt-[26px] pb-4 px-[53px] mt-[192px] mb-[70px]">
            <TrendingNew />
            <div>
              <h2 className="text-[28px] font-bold text-main-whileColor mb-[10px]">
                List Article category
              </h2>
              <div className=" text-sm font-normal font-lato text-main-pink-ec">
                <ul className="list-disc pl-[17px] mb-[14px]">
                  <li>Game</li>
                  <li>Game Play</li>
                  <li>Tattic Game</li>
                  <li>Gamer</li>
                </ul>
                <Link href={"article-category-all"}>View all {`>`}</Link>
              </div>
            </div>
          </div>
          <DailyGift />
        </div>
      </MainLayout>
    </div>
  );
}
