import DailyGift from "@/components/DailyGift/DailyGift";
import GameList from "@/components/Games/GameList";
import CategoryGame from "@/components/Games/CategoryGame";
import TrendingNew from "@/components/Articles/TrendingNew";
import ListArticleCategory from "@/components/Articles/ListArticleCategory";
import MainLayout from "./(MainLayout)/layout";

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
          <div className="bg-main-grayColor-80 py-[26px] px-[53px] mt-[192px] mb-[70px]">
            <TrendingNew />
            <ListArticleCategory />
          </div>
          <DailyGift />
        </div>
      </MainLayout>
    </div>
  );
}
