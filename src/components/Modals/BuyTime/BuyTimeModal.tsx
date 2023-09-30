import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useModalContext } from "@/contexts/ModalContextProvider";
import * as shopService from "@/services/shop.service";
import XmarkICon from "@/asset/icons/XmarkIcon";
import PlayTimeShop from "@/components/Shops/PlayTimesShop";
import { IPlaytimeShop } from "@/interface/shop/IPlaytimeShop";
import { IShopCategories } from "@/interface/shop/IShopCategories";
import { SHOP_ITEM } from "@/utils/constants";
import {
  playtimeShopSelector,
  shopCategoriesSelector,
} from "@/store/selectors/shopSelector";
import { useOnClickOutside } from "@/hooks/useClickOutSide";

function BuyTimeModal() {
  const dispatch = useDispatch<AppDispatch>();
  const buyTimeRef = useRef<HTMLDivElement>(null);
  const [isFetchCategories, setIsFetchCategories] = useState<boolean>(false);

  useOnClickOutside(buyTimeRef, () => {
    closeModalWithAnimation(150);
  });
  const playtimeShop =
    (useSelector<RootState>(playtimeShopSelector) as IPlaytimeShop[]) ?? [];
  const shopCategoriesSelectorResult = useSelector<RootState>(
    shopCategoriesSelector
  ) as IShopCategories[];
  const shopCategories = useMemo(
    () => shopCategoriesSelectorResult ?? [],
    [shopCategoriesSelectorResult]
  );
  const { openModal, closeModalWithAnimation } = useModalContext();

  /* optimize send request to get shop */
  useEffect(() => {
    if (shopCategories.length !== 0) {
      setIsFetchCategories(true);
    }
  }, [shopCategories]);

  /* get Cover shop */
  useEffect(() => {
    isFetchCategories &&
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
  }, [isFetchCategories]);
  return (
    <div className="z-10 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-main-grayColor-50 backdrop-blur-sm">
      <div
        id="modal"
        ref={buyTimeRef}
        className="buy-time-modal transition-all absolute text-main-whileColor font-lato flex flex-col items-center rounded-[30px] bg- bg-main-violet-c4"
      >
        <XmarkICon
          onClick={() => {
            closeModalWithAnimation(150);
          }}
          width="20px"
          height="20px"
          className="absolute top-[30px] right-[30px] p-[3px] cursor-pointer text-main-pink-f4 hover:text-main-pink-be transition-colors"
        />
        <h2 className="absolute top-0 font-semibold inline text-center px-[30px] py-[5px] bg-main-pink-83 border-[1px] border-main-pink-ec rounded-[10px] mt-[8px] mb-[24px] shadow-[0px_2px_6px] shadow-[#EC4899]">
          Buy Times
        </h2>
        <PlayTimeShop list={playtimeShop} itemsPerPage={4} />
      </div>
    </div>
  );
}

export default BuyTimeModal;
