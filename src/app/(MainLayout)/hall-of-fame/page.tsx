"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HallOfFameZera from "@/components/HallOfFameZera";
import GamePlayed from "@/components/HallOfFameGamePlayed";
import PlaysStreak from "@/components/HallOfFamePlaysStreak";
const tabs = [
  {
    label: "ZERA",
    component: <HallOfFameZera />,
  },
  {
    label: "Games Played",
    component: <GamePlayed />,
  },
  {
    label: "Playstreak",
    component: <PlaysStreak />,
  },
];

function HallOfFame() {
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
    router.push("/");
  };
  return (
    <div className="relative flex flex-col items-center font-lato text-main-whileColor border-[5px] border-main-pink-f4 rounded-[20px] bg-main-grayColor-80 px-[60px] pb-[62px] mb-[40px]">
      <button
        onClick={GotoHome}
        className="absolute top-[25px] left-[21px] text-sm font-bold text-main-pink-ec"
      >
        {"<"}Back
      </button>
      <div className="mt-[9px]">
        <h1 className="inline text-[40px] font-bold font-lato px-[30px] py-[10px] bg-main-pink-9d rounded-[20px] shadow-[inset_-2px_-2px_2px_rgba(0,0,0,0.6)] ">
          Hall of Fame
        </h1>
      </div>
      <div className="w-full mt-[58px]">
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

export default HallOfFame;
