import { CoinIcon } from "@/asset/icons/icons";
import Image from "next/image";
import Link from "next/link";
import { avatarShopList } from "../dataFetch/dataFetch";
function UserBar() {
  return (
    <div className=" flex flex-col items-center w-[204px] rounded-[20px] bg-[rgba(15,9,45,0.7)] mr-4 mb-[3px] ">
      <div className="w-[146px] border-b-[1px] border-main-violet-c4">
        <h2 className="my-[10px] text-base font-black font-nunito text-main-whileColor text-center">
          4070{" "}
          <CoinIcon className="ml-2 inline-block" width="20px" height="20px" />
        </h2>
      </div>
      <div className="avatar-shop-list grid grid-cols-2 gap-x-4 gap-y-2 my-[10px] ml-[14px] mr-[4px] pr-[10px] h-[206px] overflow-y-scroll">
        {avatarShopList.map((item, index) => (
          <div key={index}>
            <div className="relative group">
              <Image
                className="rounded-[10px] border border-main-pink-be"
                src={item.avatar}
                alt="Picture"
              />
              {/* buy */}
              <div className="hidden group-hover:flex absolute items-center justify-center top-0 left-0 bottom-0 right-0 bg-main-grayColor-40 rounded-[10px]">
                <button className="px-[10px] py-[5px] rounded-[10px] bg-gradient-to-b from-[#9D174D] to-[#5F0026]">
                  <p className="text-[10px] font-bold font-nunito text-main-whileColor">
                    Buy now
                  </p>
                </button>
              </div>
            </div>
            <p className="text-[11px] font-black font-nunito text-center text-main-whileColor">
              {item.coin}
              <CoinIcon
                className="inline-block ml-2"
                width="14px"
                height="14px"
              />
            </p>
          </div>
        ))}
      </div>
      <Link href={"/simple-shop"}>
        <button className=" py-[3px] px-[30px] bg-main-pink-be rounded-[10px] mb-[14px]">
          <p className="items-center mb-[2px] text-xs text-center font-bold text-main-whileColor leading-[1.6]">
            Shop
          </p>
        </button>
      </Link>
    </div>
  );
}

export default UserBar;
