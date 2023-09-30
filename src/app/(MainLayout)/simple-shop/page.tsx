"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as shopService from "@/services/shop.service";
import AvatarShop from "@/components/Shops/AvatarShop";
import CoverPage from "@/components/Shops/CoverPageShop";
import PlaytimesShop from "@/components/Shops/PlayTimesShop";
import CoinIcon from "@/asset/icons/CoinIcon";
import AddIcon from "@/asset/icons/AddIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  avatarShopSelector,
  coverShopSelector,
  playtimeShopSelector,
  shopCategoriesSelector,
} from "@/store/selectors/shopSelector";
import { SHOP_ITEM } from "@/utils/constants";
import { ICoverShop } from "@/interface/shop/ICoverShop";
import { IPlaytimeShop } from "@/interface/shop/IPlaytimeShop";
import { IShopCategories } from "@/interface/shop/IShopCategories";
import { IAvatar } from "@/interface/shop/IAvatar";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import Link from "next/link";
import { staticPaths } from "@/utils/paths";

function SimpleShop() {
  const { userInfo, prevRoute } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();
  const shopCategoriesSelectorResult = useSelector<RootState>(
    shopCategoriesSelector
  ) as IShopCategories[];

  const shopCategories = useMemo(
    () => shopCategoriesSelectorResult ?? [],
    [shopCategoriesSelectorResult]
  );
  const avatarShop =
    (useSelector<RootState>(avatarShopSelector) as IAvatar[]) ?? [];
  const coverShop =
    (useSelector<RootState>(coverShopSelector) as ICoverShop[]) ?? [];
  const playtimeShop =
    (useSelector<RootState>(playtimeShopSelector) as IPlaytimeShop[]) ?? [];

  const [isFetchCategories, setIsFetchCategories] = useState<boolean>(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsRef = useRef<HTMLButtonElement[]>([]);
  const tabs = [
    {
      label: "Avatar",
      component: <AvatarShop list={avatarShop} itemsPerPage={8} />,
    },
    {
      label: "Cover page",
      component: <CoverPage list={coverShop} itemsPerPage={4} />,
    },
    {
      label: "Playtimes",
      component: <PlaytimesShop list={playtimeShop} itemsPerPage={8} />,
    },
  ];
  useEffect(() => {
    function setTabPosition() {
      tabsRef.current?.forEach((tab, idx) => {
        if (idx === activeTabIndex) {
          tab.classList.add("active-tab");
        } else {
          tab.classList.remove("active-tab");
        }
      });
    }
    setTabPosition();
  }, [activeTabIndex]);

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
        if (item.item === SHOP_ITEM.COVER || item.item === SHOP_ITEM.PLAYTIME) {
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
    <div className="relative flex flex-col items-center font-lato text-main-whileColor border-[5px] border-main-violet-c4 rounded-[20px] bg-main-grayColor-80 px-[60px] pb-[62px] mb-[40px]">
      <Link
        href={prevRoute.current || staticPaths.home}
        className="absolute top-[25px] left-[21px] text-sm font-bold text-main-pink-ec"
      >
        {"<"}Back
      </Link>
      <div className="mt-[9px]">
        <h1 className="inline text-[40px] font-bold font-lato px-[30px] py-[10px] bg-main-pink-9d rounded-[20px] shadow-[inset_-2px_-2px_2px_rgba(0,0,0,0.6)] ">
          Simple Shop
        </h1>
      </div>
      <div className="relative w-full mt-[58px]">
        <div className="absolute top-[-14px] right-0 flex px-[10px] py-[10px] bg-main-violet-4c rounded-[10px]">
          <p className="text-2xl font-black font-nunito mr-[5px]">
            {userInfo?.zera}
          </p>
          <CoinIcon width="32px" height="32px" className="mr-[10px]" />
          <AddIcon width="29px" height="29px" />
        </div>
        <div>
          {/* tab selector */}
          <div className="tab-container text-center">
            {tabs.map((tab, idx) => {
              return (
                <button
                  key={idx}
                  ref={(el) => {
                    if (el) {
                      tabsRef.current[idx] = el;
                    }
                  }}
                  className="text-base tab text-main-whileColor-70 bg-main-violet-4c font-bold font-lato min-w-[120px] py-[10px] border-[1px] border-main-violet-8b rounded-t-[20px] mx-[6px]"
                  onClick={() => setActiveTabIndex(idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          {/* tabs content */}
          {tabs[activeTabIndex].component}
        </div>
      </div>
    </div>
  );
}

export default SimpleShop;
