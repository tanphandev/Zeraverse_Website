"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IListArticleCategory } from "@/interface/article/IListArticleCategory";
import { listArticleCategorySelector } from "@/store/selectors/article.selector";
import { AppDispatch, RootState } from "@/store/store";
import { staticPaths } from "@/utils/paths";
import * as articleService from "@/services/article.service";
import Breadcrumbs from "@/components/Others/Breadcumbs";

function ArticleCategoryAll() {
  const dispatch = useDispatch<AppDispatch>();
  const articleCategories = useSelector<RootState>(
    listArticleCategorySelector
  ) as IListArticleCategory[];
  useEffect(() => {
    !articleCategories && dispatch(articleService.getListArticleCategory({}));
  }, [articleCategories]);
  return (
    <div className="font-lato text-main-whileColor border-[5px] border-main-pink-f4 rounded-[20px] bg-main-grayColor-80 py-[24px] px-[28px] mb-[40px]">
      <Link
        href={"/"}
        className="text-sm font-bold text-main-pink-ec cursor-pointer"
      >
        {"<"} Back
      </Link>
      <div className="mb-[20px] mt-5">
        <Breadcrumbs
          items={[
            {
              label: "Home",
              path: staticPaths.home,
            },
            {
              label: "Article Category",
              path: staticPaths.article,
            },
          ]}
        />
      </div>
      <h1 className="font-bold font-nunito mb-3">Article Category</h1>
      <ul className="list-disc ml-4 text-sm font-normal font-lato text-main-pink-ec">
        {articleCategories?.map((category, index) => (
          <li className="mb-2" key={index}>
            <Link
              className="hover:text-main-pink-9d"
              href={`${staticPaths.article_category}/${category?.slug}`}
            >
              {category?.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleCategoryAll;
