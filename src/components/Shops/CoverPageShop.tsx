"use client";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
import CoinIcon from "@/asset/icons/CoinIcon";
import { ICoverShop } from "@/interface/shop/ICoverShop";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { MODAL_NAME, SHOP_NAME } from "@/utils/constants";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
import GroupRadio from "./GroupRadio";
import { RadioOption } from "./AvatarShop";
type Props = {
  list: ICoverShop[];
  itemsPerPage: number;
};
function CoverPageShop({ list, itemsPerPage }: Props) {
  const { openModal, setPayload } = useModalContext();
  const [selectedOption, setSelectedOption] = useState<RadioOption>(
    RadioOption.All
  );
  const [listData, setListData] = useState<ICoverShop[]>(list);
  const [currentPage, setCurrentPage] = useState(0);
  //set item start
  const [itemOffset, setItemOffset] = useState(0);
  //set item end
  const endOffset = itemOffset + itemsPerPage;
  //current item list to show
  const currentItems = listData.slice(itemOffset, endOffset);
  //calculate total page
  const pageCount = Math.ceil(listData.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % listData.length;
    setCurrentPage(event.selected);
    setItemOffset(newOffset);
  };

  /* filter list data */
  useEffect(() => {
    switch (selectedOption) {
      case RadioOption.All:
        setListData([...list]);
        break;
      case RadioOption.Buy:
        setListData(list.filter((item) => !item?.user_inventory));
        break;
      case RadioOption.Owned:
        setListData(list.filter((item) => item?.user_inventory));
        break;
    }
    setCurrentPage(0);
    setItemOffset(0);
  }, [selectedOption, list]);

  //Show Modal when Click Item
  const openBuyAvatarModal = (payload: any) => {
    openModal(MODAL_NAME.BUY_SHOP);
    setPayload(payload);
  };
  return (
    <div className="px-[10px] md:px-[30px] lg:px-[66px] pt-[18px] pb-[30px] bg-[#2f145f] border-[5px] border-main-pink-f9 rounded-[30px]">
      <GroupRadio
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[32px]">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="text-main-whileColor bg-main-pink-83 border-[1px] border-main-pink-f4 rounded-[30px] p-[10px]"
          >
            <CustomImage
              src={item?.url}
              fallback={images.default_cover_image}
              alt="avatar"
              width={0}
              height={0}
              className="mb-[5px] w-[441px] h-[204px] rounded-[20px] object-cover"
            />
            <p className="text-base font-bold font-lato leading-[1.6]">
              {item?.name}
            </p>
            <div className="flex justify-end items-center">
              <p className="text-sm font-black font-nunito mr-[8px]">
                {item?.price}
              </p>
              <CoinIcon width="22px" height="22px" className="mr-[7px]" />
              <button
                className="buy-button transition-colors text-sm font-medium font-lato px-[25px] py-[5px] hover:bg-main-violet-6d border-[1px] border-main-violet-f5 rounded-[30px]"
                onClick={() => {
                  const payload = {
                    type: SHOP_NAME.COVER,
                    id: item?.id,
                    name: item?.name,
                    price: item?.price,
                    url: item?.url,
                  };
                  openBuyAvatarModal(payload);
                }}
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
        forcePage={currentPage}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        pageClassName="page-item text-[14px] font-bold font-nunito px-4 sm:px-[32px]"
        containerClassName="pagination flex justify-center "
        activeClassName="active"
        breakClassName="break"
        nextClassName="pagi-next"
        previousClassName="pagi-previous"
      />
    </div>
  );
}

export default CoverPageShop;
