"use client";
import Image from "next/image";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Avatar from "@/asset/image/profilePicture.png";
import CoinIcon from "@/asset/icons/CoinIcon";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
import { IAvatarInventory } from "@/interface/user/IAvatarInventory";
import { ICoverInventory } from "@/interface/user/ICoverInventory";
import { formatDate } from "@/utils/helper";
import NoData from "../Others/NoData";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
type Props = {
  list: IAvatarInventory[] | ICoverInventory[];
  title: string;
  widthPic: string;
  heightPic: string;
  itemsPerPage: number;
  className?: string;
};
function PurchaseItem({
  list,
  title,
  widthPic,
  heightPic,
  itemsPerPage,
  className,
}: Props) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = list.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(list.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold font-nunito">{title}</h2>
      {list.length !== 0 ? (
        <div className={`${className} mb-4`}>
          {currentItems.map((item, index) => (
            <div className="flex items-center" key={index}>
              <CustomImage
                src={item.item_info.url}
                fallback={images.default_profile_image}
                alt="Image"
                width={0}
                height={0}
                sizes="100vw"
                className={`h-[${heightPic}] w-[${widthPic}] rounded-[10px] mr-[15px] object-cover`}
              />
              <div className="flex flex-col text-main-whileColor">
                <div className="flex items-center">
                  <h3 className="inline-block text-xl font-black font-nunito mr-2 ">
                    {item.item_info.price}
                  </h3>
                  <CoinIcon
                    className="inline-block"
                    width="20px"
                    height="22px"
                  />
                </div>
                <span className="text-[8px] font-normal italic font-nunito">
                  {formatDate(item.updated_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
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
        containerClassName="pagination flex justify-center mb-7"
        activeClassName="active"
        breakClassName="break"
        nextClassName="pagi-next"
        previousClassName="pagi-previous"
      />
    </div>
  );
}

export default PurchaseItem;
