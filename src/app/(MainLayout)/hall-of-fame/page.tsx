"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GamePlayed from "@/components/HallOfFame/HallOfFameGamePlayed";
import HallOfFameZera from "@/components/HallOfFame/HallOfFameZera";
import PlaysStreak from "@/components/HallOfFame/HallOfFamePlaysStreak";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import * as userService from "@/services/user.service";
import {
  hallOfFameGamesPlayedSelector,
  hallOfFamePlaystreakSelector,
  hallOfFameZeraSelector,
} from "@/store/selectors/userSelector";
import { HallOfFameType } from "@/utils/constants";
import { IHallOfFameZera } from "@/interface/user/IHallOfFameZera";
import { IHallOfFameGamePlayed } from "@/interface/user/IHallOfFameGamePlayed";
import { IHallOfFamePlayStreak } from "@/interface/user/IHallOfFamePlayStreak";

function HallOfFame() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /* selector */
  const hallOfFameZera = useSelector<RootState>(
    hallOfFameZeraSelector
  ) as IHallOfFameZera[];
  const hallOfFameGamePlayed = useSelector<RootState>(
    hallOfFameGamesPlayedSelector
  ) as IHallOfFameGamePlayed[];
  const hallOfFamePlaysStreak = useSelector<RootState>(
    hallOfFamePlaystreakSelector
  ) as IHallOfFamePlayStreak[];

  /*  defind tabs */
  const tabs = [
    {
      label: "ZERA",
      component: <HallOfFameZera hallOfFameZera={hallOfFameZera} />,
    },
    {
      label: "Games Played",
      component: <GamePlayed hallOfFameGamePlayed={hallOfFameGamePlayed} />,
    },
    {
      label: "Playstreak",
      component: <PlaysStreak hallOfFamePlaysStreak={hallOfFamePlaysStreak} />,
    },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  /* get hall of fame zera */
  useEffect(() => {
    dispatch(userService.getHallOfFame(HallOfFameType.ZERA));
    dispatch(userService.getHallOfFame(HallOfFameType.GAME_PLAYED));
    dispatch(userService.getHallOfFame(HallOfFameType.PLAYSTREAK));
  }, []);

  /* set active tab */
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
    <div className="w-[314px] sm:w-[424px] md:w-[644px] lg:w-[754px] xl:w-[974px] min-[1316px]:w-[1084px] 2xl:w-[1194px] relative flex flex-col items-center font-lato text-main-whileColor border-[5px] border-main-pink-f4 rounded-[20px] bg-main-grayColor-80 px-4 md:px-[60px] pb-[62px] mb-[40px]">
      <button
        onClick={GotoHome}
        className="absolute top-[25px] left-[21px] text-sm font-bold text-main-pink-ec"
      >
        {"<"}Back
      </button>
      <div className="mt-[9px]">
        <h1 className="inline text-[20px] md:text-[30px] lg:text-[40px] font-bold font-lato px-[30px] py-[10px] bg-main-pink-9d rounded-[20px] shadow-[inset_-2px_-2px_2px_rgba(0,0,0,0.6)] ">
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
                  className="text-xs sm:text-sm lg:text-base text-main-whileColor-70 bg-main-violet-4c font-bold font-lato lg:min-w-[120px] py-[10px] border-[1px] border-main-violet-8b rounded-t-[20px] px-2 mx-[6px]"
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
