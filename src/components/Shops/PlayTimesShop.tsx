"use client";
import Image from "next/image";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { MODAL_NAME, SHOP_NAME } from "@/utils/constants";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
import { IPlaytimeShop } from "@/interface/shop/IPlaytimeShop";
import PlayTimesPicture from "@/../public/asset/image/playtimes_picture.png";
import CoinIcon from "@/asset/icons/CoinIcon";
type Props = {
  list: IPlaytimeShop[];
  itemsPerPage: number;
};
function PlayTimeShop({ list, itemsPerPage }: Props) {
  console.log("list time", list);
  const { openModal, setPayload } = useModalContext();
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
  //Show Modal when Click Item
  const openBuyPlayTimesModal = (payload: any) => {
    openModal(MODAL_NAME.BUY_SHOP);
    setPayload(payload);
  };
  return (
    <div className="px-[66px] pt-[18px] pb-[30px] bg-[#2f145f] border-[5px] border-main-pink-f9 rounded-[30px]">
      <div className="grid grid-cols-4 gap-4 mb-[32px] mt-[47px]">
        {currentItems.map((item, index) => (
          <div
            onClick={() => {
              const payload = {
                type: SHOP_NAME.PLAYTIME,
                id: item?.id,
                name: item?.name,
                price: item?.price,
                url: PlayTimesPicture,
              };
              openBuyPlayTimesModal(payload);
            }}
            key={index}
            className="text-main-whileColor bg-main-pink-83 border-[1px] border-main-pink-f4 rounded-[30px] p-[10px]"
          >
            <div className="flex justify-center items-center bg-[#340216] rounded-[30px] h-[204px] min-w-[150px]">
              <Image
                src={PlayTimesPicture}
                width={0}
                height={0}
                sizes="100vw"
                alt="avatar"
                className="mb-[5px] w-[115px] h-[147px] rounded-[20px] object-cover"
              />
            </div>
            <p className="text-base font-bold font-lato leading-[1.6] mt-[5px]">
              {item?.name}
            </p>
            <div className="flex justify-end items-center">
              <p className="text-sm font-black font-nunito mr-[8px]">
                {item?.price}
              </p>
              <CoinIcon width="22px" height="22px" className="mr-[7px]" />
              <button
                className="transition-colors text-sm font-medium font-lato px-[25px] py-[5px] hover:bg-main-violet-6d border-[1px] border-main-violet-f5 rounded-[30px]"
                disabled={!!item?.user_inventory}
              >
                {!!item?.user_inventory ? "Owned" : "Buy"}
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
    </div>
  );
}

export default PlayTimeShop;
