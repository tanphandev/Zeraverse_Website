import CoinIcon from "@/asset/icons/CoinIcon";
import XmarkICon from "@/asset/icons/XmarkIcon";
import Image from "next/image";

function BuyShopPopUp({
  data,
  title,
  onClickBuy,
  onClose,
}: {
  data: any;
  title: string;
  onClickBuy: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-main-whileColor-30">
      <div className="absolute min-w-[540px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] text-main-whileColor font-lato flex flex-col items-center rounded-[30px] border-[3px] bg-gradient-to-b from-[#570426] to-[#270010] border-main-pink-f4 ">
        <XmarkICon
          onClick={onClose}
          width="20px"
          height="20px"
          className="absolute top-[20px] right-[30px] p-[3px] cursor-pointer text-main-pink-f4"
        />
        <div className="flex flex-col items-center font-lato text-main-whileColor w-full px-[50px]">
          <h2 className="font-semibold inline text-center px-[30px] py-[5px] bg-main-pink-83 border-[1px] border-main-pink-ec rounded-[10px] mt-[8px] mb-[24px] shadow-[0px_2px_6px] shadow-[#EC4899]">
            {title}
          </h2>
          <div className="p-[5px] bg-gradient-to-b from-[#C4B5FD] via-[#979BFF] to-[#EF36C6] rounded-[20px] mb-5">
            <Image
              src={data.image}
              alt="image"
              className="rounded-[20px] h-[204px] w-auto"
            />
          </div>
          <div className="w-full mb-7 text-center">
            <p className="inline text-base font-bold font-nunito mr-[60px]">
              {data.title}
            </p>
            <div className="inline-block items-center">
              <p className="inline text-sm font-black font-nunito mr-[8px]">
                70
              </p>
              <CoinIcon className="inline" width="20px" height="20px" />
            </div>
          </div>
          <button
            onClick={onClickBuy}
            className="text-sm font-medium font-lato text-main-whileColor px-[25px] py-[5px] bg-main-violet-6d border-[1px] border-main-violet-f5 rounded-[30px] mb-[29px]"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyShopPopUp;
