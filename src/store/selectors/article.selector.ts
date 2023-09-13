import { ARTICLE_CATEGORY_NAME } from "@/utils/constants";

export const newestSelector = (state: any) => state.article.newest;
export const listArticleCategorySelector = (state: any) =>
  state.article.listArticleCategory;
export const articleRandomSelector = (state: any) =>
  state.article.articleRandom;
export const allArticleSelector = (state: any) =>
  state.article.articles[ARTICLE_CATEGORY_NAME.ALL_ARTICLE];
