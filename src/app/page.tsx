"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ListArticleCategory from "@/components/Articles/ListArticleCategory";
import DailyGift from "@/components/DailyGift/DailyGift";
import GameList from "@/components/Games/GameList";
import CategoryGame from "@/components/Games/CategoryGame";
import TrendingNew from "@/components/Articles/TrendingNew";
import MainLayout from "./(MainLayout)/layout";
import { newestSelector } from "@/store/selectors/article.selector";
import { IArticle } from "@/interface/article/IArticle";
import * as articleService from "@/services/article.service";
import * as gameService from "@/services/game.service";
import { gameCategoriesSelector } from "@/store/selectors/game.selector";
import { IGameCategory } from "@/interface/games/IGameCategory";
export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const newest = useSelector<RootState>(newestSelector) as IArticle[];
  const gameCategories = useSelector<RootState>(
    gameCategoriesSelector
  ) as IGameCategory[];

  /* get newest */
  useEffect(() => {
    !newest && dispatch(articleService.getNewest({}));
  }, [newest]);

  /* get game categories */
  useEffect(() => {
    !gameCategories && dispatch(gameService.getGameCategories({}));
  }, [gameCategories]);

  return (
    <div>
      <MainLayout>
        <div className="w-[314px] sm:w-[424px] md:w-[644px] lg:w-[754px] xl:w-[974px] min-[1316px]:w-[1084px] 2xl:w-[1194px]">
          <GameList />
          <CategoryGame listCategory={gameCategories} />
          <div className="bg-main-grayColor-80 py-[26px] px-[53px] mt-[192px] mb-[70px]">
            <TrendingNew list={newest} />
            <ListArticleCategory />
          </div>
          <DailyGift />
        </div>
      </MainLayout>
    </div>
  );
}
