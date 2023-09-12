"use client";
import Image from "next/image";
import Link from "next/link";
import CoinIcon from "@/asset/icons/CoinIcon";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import * as shopService from "@/services/shop.service";
import { avatarShopSelector } from "@/store/selectors/shopSelector";
import { IAvatarShop } from "@/interface/shop/IAvatarShop";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { MODAL_NAME, SHOP_NAME } from "@/utils/constants";
type Props = {
  zera?: number | null;
};

type PayLoadBuyModal = {
  type: SHOP_NAME;
  id: number;
  name: string;
  price: number;
  url: string;
};
function UserBar({ zera }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const avatarShop = useSelector<RootState>(
    avatarShopSelector
  ) as IAvatarShop[];
  const { openModal, setPayload } = useModalContext();
  //call api to get items in avatar shop
  useEffect(() => {
    dispatch(shopService.getAvatarShop({}));
  }, []);
  // handleClickBuy
  const handleClickBuyAvatar = (payload: PayLoadBuyModal) => {
    openModal(MODAL_NAME.BUY_AVATAR);
    setPayload(payload);
  };
  return (
    <div className=" flex flex-col items-center w-[204px] rounded-[20px] bg-[rgba(15,9,45,0.7)] mr-4 mb-[3px] ">
      <div className="w-[146px] border-b-[1px] border-main-violet-c4">
        <h2 className="my-[10px] text-base font-black font-nunito text-main-whileColor text-center">
          {zera}
          <CoinIcon className="ml-2 inline-block" width="20px" height="20px" />
        </h2>
      </div>
      <div className="avatar-shop-list grid grid-cols-2 gap-x-4 gap-y-2 my-[10px] ml-[14px] mr-[4px] pr-[10px] h-[320px] overflow-y-scroll">
        {avatarShop?.map((item, index) => (
          <div key={index}>
            <div className="relative group">
              <Image
                className="rounded-[10px] border border-main-pink-be"
                src={item.value}
                alt="Picture"
                width={80}
                height={80}
              />
              {/* buy */}
              {!item?.user_inventory && (
                <div className="hidden group-hover:flex absolute items-center justify-center top-0 left-0 bottom-0 right-0 bg-main-grayColor-40 rounded-[10px]">
                  <button
                    onClick={() => {
                      const payload = {
                        type: SHOP_NAME.AVATAR,
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        url: item.url,
                      };
                      handleClickBuyAvatar(payload);
                    }}
                    className="px-[10px] py-[5px] rounded-[10px] bg-gradient-to-b from-[#9D174D] to-[#5F0026]"
                  >
                    <p className="text-[10px] font-bold font-nunito text-main-whileColor">
                      Buy now
                    </p>
                  </button>
                </div>
              )}
            </div>
            {!!item?.user_inventory ? (
              <div className="text-center">
                <p className="inline text-[11px] font-semibold font-nunito text-main-whileColor px-2 py-[3px] rounded-[20px] bg-[#360e1e] shadow-[_0_1px_2px_0] shadow-main-pink-9d">
                  Owned
                </p>
              </div>
            ) : (
              <p className="text-[11px] font-black font-nunito text-center text-main-whileColor">
                {item.price}
                <CoinIcon
                  className="inline-block ml-2"
                  width="14px"
                  height="14px"
                />
              </p>
            )}
          </div>
        ))}
      </div>
      <Link href={"/simple-shop"}>
        <button className="transition-colors py-[3px] px-[30px] bg-main-pink-be hover:bg-main-pink-83 rounded-[10px] mb-[14px]">
          <p className="items-center mb-[2px] text-xs text-center font-bold text-main-whileColor leading-[1.6]">
            Shop
          </p>
        </button>
      </Link>
    </div>
  );
}

export default UserBar;
