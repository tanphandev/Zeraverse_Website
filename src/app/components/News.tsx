"use client";
import { useState } from "react";
import Image from "next/image";
import NewLogo from "@/asset/image/newsLogo.png";
import ReactPaginate from "react-paginate";
import { ArrowLeftIconPagi, ArrowRightIconPagi } from "@/asset/icons/icons";
type Props = {
  list: Array<any>;
  itemsPerPage: number;
};
function News({ list, itemsPerPage }: Props) {
  //set item start
  const [itemOffset, setItemOffset] = useState(0);
  //set item end
  const endOffset = itemOffset + itemsPerPage;
  //current item list to show
  const currentItems = list.slice(itemOffset, endOffset);
  //calculate total page
  const pageCount = Math.ceil(list.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
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
        {currentItems.map((item, index) => (
          <div
            key={index}
            className=" text-main-whileColor bg-main-blackColor rounded-[5px] border-[1px] border-main-pink-be"
          >
            <Image
              src={item.image}
              alt="picture"
              className="w-full h-auto px-[8px] pt-[8px] rounded-[5px] mb-[12px]"
            />
            <div className="flex flex-col px-[15px] pb-[15px]">
              <div>
                <p className="inline-block font-normal text-[10px] leading-[1.4] font-nunito text-[#000000] bg-main-whileColor rounded-[10px] py-[6px] px-[10px] mb-[6px] ">
                  Car Game
                </p>
                <h2 className="text-2xl font-bold font-lato">{item.title}</h2>
                <p className="text-xs font-light font-nunito text-justify mr-2">
                  {item.content}
                </p>
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
        containerClassName="pagination flex justify-center mb-[20px]"
        activeClassName="active"
        breakClassName="break"
        nextClassName="pagi-next"
        previousClassName="pagi-previous"
      />
    </div>
  );
}

export default News;
