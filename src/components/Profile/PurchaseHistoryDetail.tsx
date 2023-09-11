"use client";
import { useEffect, useRef } from "react";
import PurchaseItem from "./PurchaseItem";
import { categoryGameList } from "@/dataFetch/dataFetch";
import IPurchaseHistory from "@/interface/user/IPurchaseHistory";
type Props = {
  title: string;
  dataList: IPurchaseHistory;
  onBack: (title: string) => void;
};
function PurchaseHistoryDetail({ title, dataList, onBack }: Props) {
  const purchaseAvatarList = [...categoryGameList];
  const purchaseHistoryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (purchaseHistoryRef.current) {
      purchaseHistoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div
      ref={purchaseHistoryRef}
      className="h-full text-main-whileColor bg-main-grayColor-50 rounded-[20px] mb-[40px]"
    >
      <div className="relative">
        <h2 className=" flex items-center justify-center text-[28px] text-center font-bold bg-main-pink-ec rounded-t-[20px] py-4">
          {title}
        </h2>
        <button
          onClick={() => {
            onBack(title);
          }}
          className="absolute top-1/2 left-5 -translate-y-1/2 text-sm font-bold font-lato"
        >
          {"<"} Back
        </button>
      </div>
      <div className="px-6 pt-8 pb-7">
        <PurchaseItem
          list={dataList.avatar}
          title="Avatar"
          widthPic="94px"
          heightPic="94px"
          itemsPerPage={8}
        />
        <PurchaseItem
          list={dataList.cover}
          title="Cover Page"
          widthPic="204px"
          heightPic="94px"
          itemsPerPage={8}
        />
      </div>
    </div>
  );
}

export default PurchaseHistoryDetail;
