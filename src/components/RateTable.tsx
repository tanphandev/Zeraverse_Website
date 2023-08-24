"use client";
import ArrowDown from "@/asset/icons/ArrowDownIcon";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import { useState } from "react";
import ReactPaginate from "react-paginate";
type RateInfo = {
  name: string;
  place: string;
  quantity: string;
};
function RateTable({
  list,
  itemsPerPage,
  quanityName,
}: {
  list: Array<RateInfo>;
  itemsPerPage: number;
  quanityName: string;
}) {
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
      <table className="w-full text-base text-main-whileColor font-medium font-lato border-separate border-spacing-y-[5px]">
        <tr className=" text-main-pink-f4">
          <th className=" pb-4 w-[20%] ">Place</th>
          <th className=" pb-4 w-[60%]">Username</th>
          <th className=" pb-4 w-[20%]">
            <p className="inline-block mr-1">{quanityName}</p>
            <ArrowDown className="inline" width="20px" height="20px" />
          </th>
        </tr>
        {currentItems.map((item, index) => (
          <tr
            key={index}
            className="text-center bg-main-pink-83 bg-opacity-50 rounded-[10px] "
          >
            <td className="rounded-tl-[10px] rounded-bl-[10px] py-[11px] ">
              {item.place}
            </td>
            <td className="py-[11px]">{item.name}</td>
            <td className="rounded-tr-[10px] rounded-br-[10px] py-[11px]">
              {item.quantity}
            </td>
          </tr>
        ))}
      </table>
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
        containerClassName="pagination w-full flex justify-center mt-4"
        activeClassName="active"
        breakClassName="break"
        nextClassName="pagi-next"
        previousClassName="pagi-previous"
      />
    </div>
  );
}

export default RateTable;
