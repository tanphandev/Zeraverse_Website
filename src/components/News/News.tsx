"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NewLogo from "@/asset/image/newsLogo.png";
import ReactPaginate from "react-paginate";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
import { IArticle } from "@/interface/article/IArticle";
import { staticPaths } from "@/utils/paths";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
type Props = {
  list: IArticle[];
  itemsPerPage: number;
};
function News({ list, itemsPerPage }: Props) {
  const router = useRouter();
  //set item start
  const [itemOffset, setItemOffset] = useState(0);
  //set item end
  const endOffset = itemOffset + itemsPerPage;
  //current item list to show
  const currentItems = list?.slice(itemOffset, endOffset);
  //calculate total page
  const pageCount = Math.ceil(list?.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };
  const gotoArticleDetail = (slug: string) => {
    router.push(staticPaths.article_detail(slug));
  };
  return (
    <div>
      <div className="mb-[20px]">
        <Image
          src={NewLogo}
          alt="News"
          width={118}
          height={75}
          className="inline-block mr-[30px]"
        />
        <h2 className="inline-block text-[20px] font-normal font-lato text-main-whileColor bg-main-pink-be py-[10px] px-[16px] rounded-[2px]">
          All Articles
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-[20px] mr-[114px]">
        {currentItems?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              gotoArticleDetail(item?.slug);
            }}
            className=" text-main-whileColor bg-main-blackColor rounded-[5px] border-[1px] border-main-pink-be cursor-pointer px-[8px] pt-[8px]"
          >
            <CustomImage
              src={item?.featured_image}
              fallback={images.default_article_image}
              alt="picture"
              width={0}
              height={0}
              sizes="100vw"
              className="object-cover w-full h-[300px] rounded-[5px] mb-2"
            />
            <div className="flex flex-col px-2 pb-[15px]">
              <div>
                <h2 className="text-2xl font-bold font-lato line-clamp-2">
                  {item?.title}
                </h2>
                <div
                  className="news w-full text-xs text-justify font-light font-nunito mr-2 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: item?.content.slice(1, -1),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
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
        pageClassName="page-item text-[14px] font-bold font-nunito px-[32px] text-[#ffffff]"
        containerClassName="pagination flex justify-center mb-[20px] mr-[114px]"
        activeClassName="active"
        breakClassName="break"
        nextClassName="pagi-next"
        previousClassName="pagi-previous"
      />
    </div>
  );
}

export default News;
