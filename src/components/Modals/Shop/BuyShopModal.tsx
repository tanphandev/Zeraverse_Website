import Image from "next/image";
import { useRef } from "react";
import * as shopService from "@/services/shop.service";
import * as userService from "@/services/user.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import CoinIcon from "@/asset/icons/CoinIcon";
import XmarkICon from "@/asset/icons/XmarkIcon";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import {
  GLOBAL_MODAL_NAME,
  HANDLE_STATUS,
  SHOP_ITEM,
  SHOP_NAME,
  TOAST_MESSAGE,
} from "@/utils/constants";
import { shopCategoriesSelector } from "@/store/selectors/shopSelector";
import { IShopCategories } from "@/interface/shop/IShopCategories";

function BuyShopModal() {
  const dispatch = useDispatch<AppDispatch>();
  const shopCategories = useSelector<RootState>(
    shopCategoriesSelector
  ) as IShopCategories[];
  const buyShopRef = useRef<HTMLDivElement | null>(null);
  const {
    openGlobalModal,
    closeGlobalModal,
    closeModalWithAnimation,
    payload,
    setStatus,
  } = useModalContext();
  const { usernameAuth, setUserInfo } = useAuthContext();
  const { type, id, name, price, url } = payload;
  useOnClickOutside(buyShopRef, () => {
    closeModalWithAnimation(150);
  });
  const closeBuyModal = () => {
    closeModalWithAnimation(150);
  };
  const handleBuy = () => {
    const buyItem = async () => {
      openGlobalModal(GLOBAL_MODAL_NAME.LOADING);
      try {
        const { success, data } = await shopService.buyItemShop(id);
        if (success) {
          closeGlobalModal();
          toast.success(
            type === SHOP_NAME.AVATAR
              ? TOAST_MESSAGE.BUY_AVATAR_SUCCESS
              : type === SHOP_NAME.COVER
              ? TOAST_MESSAGE.BUY_COVER_SUCCESS
              : TOAST_MESSAGE.BUY_PLAYTIMES_SUCCESS,
            {
              position: "top-right",
            }
          );
          return data;
        }
      } catch (e: any) {
        closeGlobalModal();
        toast.error(
          type === SHOP_NAME.AVATAR
            ? TOAST_MESSAGE.BUY_AVATAR_FAIL
            : type === SHOP_NAME.COVER
            ? TOAST_MESSAGE.BUY_COVER_FAIL
            : TOAST_MESSAGE.BUY_PLAYTIMES_FAIL,
          {
            position: "top-right",
          }
        );
        throw e;
      }
    };
    buyItem()
      .then(() => {
        {
          switch (type) {
            case SHOP_NAME.AVATAR:
              shopCategories.forEach((item, index) => {
                if (item.item === SHOP_ITEM.AVATAR) {
                  dispatch(
                    shopService.getShopItem({
                      shop_item_id: item.id,
                      shop_item: item.item,
                    })
                  );
                }
              });
              break;
            case SHOP_NAME.COVER:
              shopCategories.forEach((item, index) => {
                if (item.item === SHOP_ITEM.COVER) {
                  dispatch(
                    shopService.getShopItem({
                      shop_item_id: item.id,
                      shop_item: item.item,
                    })
                  );
                }
              });
              break;
            case SHOP_NAME.PLAYTIME:
              shopCategories.forEach((item, index) => {
                if (item.item === SHOP_ITEM.PLAYTIME) {
                  dispatch(
                    shopService.getShopItem({
                      shop_item_id: item.id,
                      shop_item: item.item,
                    })
                  );
                }
              });
              break;
          }
        }
        userService
          .getUserInfo(usernameAuth!!)
          .then((response) => {
            setUserInfo(response?.data);
          })
          .catch((e: any) => {
            throw e;
          });
        dispatch(userService.getUserInventories({}));
      })
      .catch((e: any) => {
        throw e;
      });
    setStatus(HANDLE_STATUS.SUCCESS);
    closeModalWithAnimation(150);
  };
  return (
    <div className="z-10 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-main-grayColor-50 backdrop-blur-sm">
      <div
        id="modal"
        ref={buyShopRef}
        className="buy-shop-modal transition-all absolute min-w-[540px] w-[320px] text-main-whileColor font-lato flex flex-col items-center rounded-[30px] border-[3px] bg-gradient-to-b from-[#570426] to-[#270010] border-main-pink-f4 "
      >
        <XmarkICon
          onClick={closeBuyModal}
          width="20px"
          height="20px"
          className="absolute top-[20px] right-[30px] p-[3px] cursor-pointer text-main-pink-f4 hover:text-main-pink-be transition-colors"
        />
        <div className="flex flex-col items-center font-lato text-main-whileColor w-full px-[50px]">
          <h2 className="font-semibold inline text-center px-[30px] py-[5px] bg-main-pink-83 border-[1px] border-main-pink-ec rounded-[10px] mt-[8px] mb-[24px] shadow-[0px_2px_6px] shadow-[#EC4899]">
            {type}
          </h2>
          <div className="p-[5px] bg-gradient-to-b from-[#C4B5FD] via-[#979BFF] to-[#EF36C6] rounded-[20px] mb-5">
            {type === SHOP_NAME.PLAYTIME ? (
              <div className="flex justify-center items-center bg-[#340216] rounded-[20px] h-[204px] w-[204px]">
                <Image
                  src={url}
                  alt="avatar"
                  className="mb-[5px] w-[115px] h-[147px] rounded-[20px]"
                />
              </div>
            ) : (
              <Image
                src={url}
                alt="image"
                className={`rounded-[20px] h-[204px] w-[204px] object-cover ${
                  type === SHOP_NAME.COVER ? "w-[440px]" : ""
                }`}
                height={204}
                width={204}
              />
            )}
          </div>
          <div className="w-full mb-7 text-center">
            <p className="inline text-base font-bold font-nunito mr-[60px]">
              {name}
            </p>
            <div className="inline-block items-center">
              <p className="inline text-sm font-black font-nunito mr-[8px]">
                {price}
              </p>
              <CoinIcon className="inline" width="20px" height="20px" />
            </div>
          </div>
          <button
            onClick={handleBuy}
            className="transition-colors text-sm font-medium font-lato text-main-whileColor px-[25px] py-[5px] hover:bg-main-violet-6d border-[1px] border-main-violet-f5 rounded-[30px] mb-[29px]"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyShopModal;
