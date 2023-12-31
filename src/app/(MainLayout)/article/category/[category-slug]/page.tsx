"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { AppDispatch, RootState } from "@/store/store";
import * as articleService from "@/services/article.service";
import { IArticle } from "@/interface/article/IArticle";
import { staticPaths } from "@/utils/paths";
import ArticleItem from "@/components/Articles/ArticeItem";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
import { toUpperCaseFirstLetterOfWord } from "@/utils/helper";
type Props = {
  params: {
    "category-slug": string;
  };
};
function ArticleCategory({ params }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const articleList = useSelector<RootState>(
    (state: any) => state?.article?.articles[params["category-slug"]]
  ) as IArticle[];
  //define itemsPerPage
  const itemsPerPage = 8;
  //set item start
  const [itemOffset, setItemOffset] = useState(0);
  //set item end
  const endOffset = itemOffset + itemsPerPage;
  //current item list to show
  const currentItems = articleList?.slice(itemOffset, endOffset);
  //calculate total page
  const pageCount = Math.ceil(articleList?.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % articleList?.length;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    dispatch(articleService.getArticles(params["category-slug"]));
  }, []);
  return (
    <div className="w-[314px] sm:w-[424px] md:w-[644px] lg:w-[754px] xl:w-[974px] min-[1316px]:w-[1084px] 2xl:w-[1194px]">
      <div className="grid grid-cols-[repeat(auto-fill,94px)] auto-rows-[94px] gap-4 bg-main mb-4">
        <h2 className="col-span-3 sm:col-span-4 text-[28px] text-center font-bold font-nunito text-main-whileColor py-7 rounded-[10px] bg-gradient-to-b from-[#979BFF] via-[#ef75f5] to-[#EF36C6]">
          {toUpperCaseFirstLetterOfWord(params["category-slug"])}
        </h2>
      </div>
      <div className="w-full mb-[130px]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
          {currentItems?.map((article, index) => {
            return (
              <Link
                key={index}
                href={staticPaths.article_detail(article?.slug)}
              >
                <ArticleItem article={article} />
              </Link>
            );
          })}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<ArrowRightIconPagi width="24px" height="24px" />}
          previousLabel={<ArrowLeftIconPagi width="24px" height="24px" />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          forcePage={0}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          pageClassName="page-item text-[14px] text-main-whileColor font-bold font-nunito px-[32px]"
          containerClassName="pagination flex justify-center"
          activeClassName="active"
          breakClassName="break"
          nextClassName="pagi-next"
          previousClassName="pagi-previous"
        />
      </div>
    </div>
  );
}

export default ArticleCategory;
