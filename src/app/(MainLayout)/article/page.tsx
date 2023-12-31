"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import * as articleService from "@/services/article.service";
import {
  allArticleSelector,
  articleRandomSelector,
  listArticleCategorySelector,
  newestSelector,
} from "@/store/selectors/article.selector";
import { IArticleRandom } from "@/interface/article/IArticleRandom";
import News from "@/components/News/News";
import PopularNews from "@/components/News/PopularNews";
import TrendingNew from "@/components/Articles/TrendingNew";
import dynamic from "next/dynamic";
import { IArticle } from "@/interface/article/IArticle";
import { IListArticleCategory } from "@/interface/article/IListArticleCategory";
import { ARTICLE_CATEGORY_NAME } from "@/utils/constants";
import ArticleCarousel from "@/components/Articles/ArticleCarousel";
function NewsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const listArticleCategories = useSelector<RootState>(
    listArticleCategorySelector
  ) as IListArticleCategory[];
  const articleRandom = useSelector<RootState>(
    articleRandomSelector
  ) as IArticleRandom[];
  const newest = useSelector<RootState>(newestSelector) as IArticle[];
  const allArticles = useSelector<RootState>(allArticleSelector) as IArticle[];
  useEffect(() => {
    !articleRandom && dispatch(articleService.getArticleRandom({}));
  }, [articleRandom]);
  /* get newest */
  useEffect(() => {
    !newest && dispatch(articleService.getNewest({}));
  }, [newest]);

  /* get all articles */
  useEffect(() => {
    !listArticleCategories &&
      dispatch(articleService.getListArticleCategory({}));
    !!listArticleCategories &&
      !allArticles &&
      listArticleCategories.forEach((articleCate, index) => {
        if (articleCate?.slug === ARTICLE_CATEGORY_NAME.ALL_ARTICLE) {
          dispatch(articleService.getArticles(articleCate?.slug));
        }
      });
  }, [listArticleCategories, allArticles]);
  return (
    <div className="w-[314px] sm:w-[424px] md:w-[644px] lg:w-[754px] xl:w-[974px] min-[1316px]:w-[1084px] 2xl:w-[1194px]">
      <ArticleCarousel articleRandom={articleRandom} />
      {/* Trending New */}
      <TrendingNew list={newest} />
      <PopularNews list={newest} />
      <News list={allArticles} itemsPerPage={9} />
    </div>
  );
}

export default NewsPage;
