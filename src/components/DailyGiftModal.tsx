import Image from "next/image";
import Gift1 from "@/asset/image/gift1.png";
import Gift2 from "@/asset/image/gift2.png";
import Gift3 from "@/asset/image/gift3.png";
import Gift4 from "@/asset/image/gift4.png";
import Gift5 from "@/asset/image/gift5.png";
import Gift6 from "@/asset/image/gift6.png";
import Gift7 from "@/asset/image/gift7.png";
import tick from "@/asset/image/tick.png";
import { useState } from "react";
function DailyGiftModal({ closeModal }: { closeModal: () => void }) {
  const [selectedItems, setSelectedItems] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // set tick for items when click
  const handleItemClick = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = true; // Khi click vào mục, đánh dấu mục đó là true
    setSelectedItems(newSelectedItems);
  };
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-main-grayColor-50 backdrop-blur-sm animate-fadeIn">
      <div className="w-[390px] font-nunito bg-gradient-to-b from-[#C4B5FD] via-[#979BFF] to-[#EF36C6] rounded-[18px] absolute top-[50%] right-[50%] translate-x-1/2 -translate-y-1/2 w-[534px] px-2 py-2">
        <h1 className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 inline-block text-3xl text-main-whileColor font-semibold leading-[1.6] px-[30px] bg-main-pink-be rounded-[14px] shadow-[inset_0_-2px_3px_rgba(0,0,0,0.3)]">
          Daily Gift
        </h1>
        <div className="grid grid-cols-3 gap-4 bg-gradient-to-b from-[#FDA3FF] via-[#F4BFFF] to-[#9949FF] px-[30px] py-[40px] rounded-[10px] shadow-[inset_0_2px_2px_rgba(0,0,0,0.6)] shadow-[#d389d4]">
          <div
            onClick={() => {
              handleItemClick(0);
            }}
            className="relative"
          >
            <h2 className="text-2xl font-bold font-nunito text-main-whileColor pt-[6px] rounded-t-[15px] text-center bg-main-pink-f4 shadow-[inset_6px_0px_10px_rgba(255,255,255,0.3)]">
              Day 1
            </h2>
            <div className="flex justify-center bg-main-violet-a7 rounded-b-[15px] pt-[9px] shadow-[inset_0px_1px_10px_rgba(0,0,0,0.58)] ">
              <Image width={49} src={Gift1} alt="gift" />
            </div>
            <div
              className={`tick absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-main-whileColor-30 w-full h-full flex justify-center items-center rounded-[15px] ${
                selectedItems[0] ? "" : "hidden"
              }`}
            >
              <Image src={tick} width={30} alt="tick" />
            </div>
          </div>
          <div
            onClick={() => {
              handleItemClick(1);
            }}
            className="relative"
          >
            <h2 className="text-2xl font-bold font-nunito text-main-whileColor pt-[6px] rounded-t-[15px] text-center bg-main-pink-f4 shadow-[inset_6px_0px_10px_rgba(255,255,255,0.3)]">
              Day 2
            </h2>
            <div className="flex justify-center bg-main-violet-a7 rounded-b-[15px] pt-[9px] shadow-[inset_0px_1px_10px_rgba(0,0,0,0.58)] ">
              <Image width={49} src={Gift2} alt="gift" />
            </div>
            <div
              className={`tick absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-main-whileColor-30 w-full h-full flex justify-center items-center rounded-[15px] ${
                selectedItems[1] ? "" : "hidden"
              }`}
            >
              <Image src={tick} width={30} alt="tick" />
            </div>
          </div>
          <div
            onClick={() => {
              handleItemClick(2);
            }}
            className="relative"
          >
            <h2 className="text-2xl font-bold font-nunito text-main-whileColor pt-[6px] rounded-t-[15px] text-center bg-main-pink-f4 shadow-[inset_6px_0px_10px_rgba(255,255,255,0.3)]">
              Day 3
            </h2>
            <div className="flex justify-center bg-main-violet-a7 rounded-b-[15px] pt-[9px] shadow-[inset_0px_1px_10px_rgba(0,0,0,0.58)] ">
              <Image width={49} src={Gift3} alt="gift" />
            </div>
            <div
              className={`tick absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-main-whileColor-30 w-full h-full flex justify-center items-center rounded-[15px] ${
                selectedItems[2] ? "" : "hidden"
              }`}
            >
              <Image src={tick} width={30} alt="tick" />
            </div>
          </div>
          <div
            onClick={() => {
              handleItemClick(3);
            }}
            className="relative"
          >
            <h2 className="text-2xl font-bold font-nunito text-main-whileColor pt-[6px] rounded-t-[15px] text-center bg-main-pink-f4 shadow-[inset_6px_0px_10px_rgba(255,255,255,0.3)]">
              Day 4
            </h2>
            <div className="flex justify-center bg-main-violet-a7 rounded-b-[15px] pt-[9px] shadow-[inset_0px_1px_10px_rgba(0,0,0,0.58)] ">
              <Image width={49} src={Gift4} alt="gift" />
            </div>
            <div
              className={`tick absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-main-whileColor-30 w-full h-full flex justify-center items-center rounded-[15px] ${
                selectedItems[3] ? "" : "hidden"
              }`}
            >
              <Image src={tick} width={30} alt="tick" />
            </div>
          </div>
          <div
            onClick={() => {
              handleItemClick(4);
            }}
            className="relative"
          >
            <h2 className="text-2xl font-bold font-nunito text-main-whileColor pt-[6px] rounded-t-[15px] text-center bg-main-pink-f4 shadow-[inset_6px_0px_10px_rgba(255,255,255,0.3)]">
              Day 5
            </h2>
            <div className="flex justify-center bg-main-violet-a7 rounded-b-[15px] pt-[9px] shadow-[inset_0px_1px_10px_rgba(0,0,0,0.58)] ">
              <Image width={49} src={Gift5} alt="gift" />
            </div>
            <div
              className={`tick absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-main-whileColor-30 w-full h-full flex justify-center items-center rounded-[15px] ${
                selectedItems[4] ? "" : "hidden"
              }`}
            >
              <Image src={tick} width={30} alt="tick" />
            </div>
          </div>
          <div
            onClick={() => {
              handleItemClick(5);
            }}
            className="relative"
          >
            <h2 className="text-2xl font-bold font-nunito text-main-whileColor pt-[6px] rounded-t-[15px] text-center bg-main-pink-f4 shadow-[inset_6px_0px_10px_rgba(255,255,255,0.3)]">
              Day 6
            </h2>
            <div className="flex justify-center bg-main-violet-a7 rounded-b-[15px] pt-[9px] shadow-[inset_0px_1px_10px_rgba(0,0,0,0.58)] ">
              <Image width={49} src={Gift6} alt="gift" />
            </div>
            <div
              className={`tick absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-main-whileColor-30 w-full h-full flex justify-center items-center rounded-[15px] ${
                selectedItems[5] ? "" : "hidden"
              }`}
            >
              <Image src={tick} width={30} alt="tick" />
            </div>
          </div>
          <div
            onClick={() => {
              handleItemClick(6);
            }}
            className="col-span-3 relative"
          >
            <h2 className="text-2xl font-bold font-nunito text-main-whileColor pt-[6px] rounded-t-[15px] text-center bg-main-pink-f4 shadow-[inset_6px_0px_10px_rgba(255,255,255,0.3)]">
              Day 7
            </h2>
            <div className="flex justify-center bg-main-violet-a7 rounded-b-[15px] pt-[9px] shadow-[inset_0px_1px_10px_rgba(0,0,0,0.58)]">
              <Image width={49} src={Gift7} alt="gift" />
            </div>
            <div
              className={`tick absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-main-whileColor-30 w-full h-full flex justify-center items-center rounded-[15px] ${
                selectedItems[6] ? "" : "hidden"
              }`}
            >
              <Image src={tick} width={30} alt="tick" />
            </div>
          </div>
        </div>
        <button className="bg-gradient-to-br from-[#EDE342] to-[#FF51EB] rounded-[25px] p-[6px] absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-[0px_0px_10px] shadow-[#EDE342]">
          <p
            onClick={closeModal}
            className="text-3xl text-main-whileColor font-semibold px-[36px] py-1 border-[3px] border-main-whileColor rounded-[25px]"
          >
            Claim
          </p>
        </button>
      </div>
    </div>
  );
}

export default DailyGiftModal;
