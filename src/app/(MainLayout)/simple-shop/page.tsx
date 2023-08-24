"use client";
import { useRouter } from "next/navigation";
import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import AvatarShop from "@/components/AvatarShop";
import CoverPage from "@/components/CoverPageShop";
import PlaytimesShop from "@/components/PlayTimesShop";
import {
  avatarShoplist,
  coverPageList,
  playtimesList,
} from "@/dataFetch/dataFetch";
import CoinIcon from "@/asset/icons/CoinIcon";
import AddIcon from "@/asset/icons/AddIcon";
const tabs = [
  {
    label: "Avatar",
    component: <AvatarShop list={avatarShoplist} itemsPerPage={8} />,
  },
  {
    label: "Cover page",
    component: <CoverPage list={coverPageList} itemsPerPage={4} />,
  },
  {
    label: "Playtimes",
    component: <PlaytimesShop list={playtimesList} itemsPerPage={8} />,
  },
];

function SimpleShop() {
  const router = useRouter();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsRef = useRef<HTMLButtonElement[]>([]);
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
  const GotoHome = () => {
    router.push("/home");
  };
  return (
    <div className="relative flex flex-col items-center font-lato text-main-whileColor border-[5px] border-main-violet-c4 rounded-[20px] bg-main-grayColor-80 px-[60px] pb-[62px] mb-[40px]">
      <button
        onClick={GotoHome}
        className="absolute top-[25px] left-[21px] text-sm font-bold text-main-pink-ec"
      >
        {"<"}Back
      </button>
      <div className="mt-[9px]">
        <h1 className="inline text-[40px] font-bold font-lato px-[30px] py-[10px] bg-main-pink-9d rounded-[20px] shadow-[inset_-2px_-2px_2px_rgba(0,0,0,0.6)] ">
          Simple Shop
        </h1>
      </div>
      <div className="relative w-full mt-[58px]">
        <div className="absolute top-[-14px] right-0 flex px-[10px] py-[10px] bg-main-violet-4c rounded-[10px]">
          <p className="text-2xl font-black font-nunito mr-[5px]">70</p>
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
                  className="text-base text-main-whileColor-70 bg-main-violet-4c font-bold font-lato min-w-[120px] py-[10px] border-[1px] border-main-violet-8b rounded-t-[20px] mx-[6px]"
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
