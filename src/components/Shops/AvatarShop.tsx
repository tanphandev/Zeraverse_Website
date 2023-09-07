"use client";
import { useState } from "react";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import BuyShopModal from "../Modals/BuyShopModal";
import CoinIcon from "@/asset/icons/CoinIcon";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
type Props = {
  list: Array<any>;
  itemsPerPage: number;
};
function AvatarShop({ list, itemsPerPage }: Props) {
  const [isOpenBuyAvatarPopUp, setIsOpenBuyAvatarPopUp] =
    useState<boolean>(false);
  const [dataPopUp, setDataPopUp] = useState<Object>({});
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
  //Show PopUp when Click Item
  const openBuyAvatarPopUp = (item: any) => {
    setDataPopUp(item);
    setIsOpenBuyAvatarPopUp(true);
  };
  const closePopUp = () => {
    setIsOpenBuyAvatarPopUp(false);
  };
  const handleOnClickBuy = () => {};
  return (
    <div className="px-[66px] pt-[18px] pb-[30px] bg-[#2f145f] border-[5px] border-main-pink-f9 rounded-[30px]">
      <div className="flex justify-end mb-[27px]">
        <div className="flex items-center mr-4">
          <input type="checkbox" id="all" className="mr-[3px]" />
          <label
            className="text-sm font-medium font-lato text-main-whileColor"
            htmlFor="all"
          >
            All
          </label>
        </div>
        <div className="flex items-center mr-4">
          <input type="checkbox" id="buy" className="mr-[3px]" />
          <label
            className="text-sm font-medium font-lato text-main-whileColor"
            htmlFor="buy"
          >
            Buy
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id=" Owned" className="mr-[3px]" />
          <label
            className="text-sm font-medium font-lato text-main-whileColor"
            htmlFor=" Owned"
          >
            Owned
          </label>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-[32px]">
        {currentItems.map((item, index) => (
          <div
            onClick={() => {
              openBuyAvatarPopUp(item);
            }}
            key={index}
            className="text-main-whileColor bg-main-pink-83 border-[1px] border-main-pink-f4 rounded-[30px] p-[10px]"
          >
            <Image
              src={item.image}
              alt="avatar"
              width={204}
              height={204}
              className="mb-[5px] rounded-[20px]"
            />
            <p className="text-base font-bold font-lato leading-[1.6]">
              {item.title}
            </p>
            <div className="flex justify-end items-center">
              <p className="text-sm font-black font-nunito mr-[8px]">70</p>
              <CoinIcon width="22px" height="22px" className="mr-[7px]" />
              <button className="text-sm font-medium font-lato px-[25px] py-[5px] bg-main-violet-6d border-[1px] border-main-violet-f5 rounded-[30px]">
                Buy
              </button>
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
        pageClassName="page-item text-[14px] font-bold font-nunito px-[32px]"
        containerClassName="pagination flex justify-center"
        activeClassName="active"
        breakClassName="break"
        nextClassName="pagi-next"
        previousClassName="pagi-previous"
      />
      {/* Buy Avatar PopUp */}
      {isOpenBuyAvatarPopUp && <BuyShopModal />}
    </div>
  );
}

export default AvatarShop;
