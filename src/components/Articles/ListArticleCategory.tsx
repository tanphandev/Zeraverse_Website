"use client";
import Link from "next/link";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import * as articleService from "@/services/article.service";
import { listArticleCategorySelector } from "@/store/selectors/article.selector";
import { IListArticleCategory } from "@/interface/article/IListArticleCategory";
import { staticPaths } from "@/utils/paths";
import { useRouter } from "next/navigation";
function ListArticleCategory() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const listArticleCategory = useSelector<RootState>(
    listArticleCategorySelector
  ) as IListArticleCategory[];
  const listFourArticleCategory = listArticleCategory?.slice(0, 4);
  /* get list article category */
  useEffect(() => {
    !listArticleCategory && dispatch(articleService.getListArticleCategory({}));
  }, [listArticleCategory]);
  const gotoArticleDetail = (slug: string) => {
    router.push(staticPaths.article_category_detail(slug));
  };
  return (
    <div>
      <h2 className="text-[28px] font-bold text-main-whileColor mb-[10px]">
        List Article category
      </h2>
      <div className=" text-sm font-normal font-lato text-main-pink-ec">
        <ul className="list-disc pl-[17px] mb-[14px]">
          {listFourArticleCategory?.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                gotoArticleDetail(item?.slug);
              }}
              className="cursor-pointer hover:text-main-pink-83"
            >
              {item.label}
            </li>
          ))}
        </ul>
        <Link
          className="hover:text-main-pink-83"
          href={staticPaths.article_category}
        >
          View all {`>`}
        </Link>
      </div>
    </div>
  );
}

export default ListArticleCategory;
