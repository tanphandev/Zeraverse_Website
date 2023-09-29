"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import * as userService from "@/services/user.service";
import Gift1 from "@/../public/asset/image/gift1.png";
import Gift2 from "@/../public/asset/image/gift2.png";
import Gift3 from "@/../public/asset/image/gift3.png";
import Gift4 from "@/../public/asset/image/gift4.png";
import Gift5 from "@/../public/asset/image/gift5.png";
import Gift6 from "@/../public/asset/image/gift6.png";
import Gift7 from "@/../public/asset/image/gift7.png";
import tick from "@/../public/asset/image/tick.png";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import { toast } from "react-toastify";
import { TOAST_MESSAGE } from "@/utils/constants";
import { sleep } from "@/utils/helper";
function DailyGiftModal() {
  const daily_gift_days_ref = useRef<string | null>(null);
  const dailyGiftModalRef = useRef<HTMLDivElement>(null);
  const { closeModalWithAnimation } = useModalContext();
  const { userInfo, setUserInfo, usernameAuth } = useAuthContext();
  const playstreak = userInfo?.playstreak;
  console.log("playstreak", playstreak);
  console.log("userInfo", userInfo);
  const [selectedItems, setSelectedItems] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  useOnClickOutside(dailyGiftModalRef, () => {
    closeModalWithAnimation(150);
  });

  // check quanity days checked
  useEffect(() => {
    if (!playstreak) return;
    const initialSelectedItems = [...selectedItems];
    for (let index = 0; index < playstreak - 1; index++) {
      initialSelectedItems[index] = true;
    }
    setSelectedItems(initialSelectedItems);
  }, [playstreak]);

  // set tick for items when click
  const handleItemClick = (index: number) => {
    userService
      .claimDailyBonus()
      .then(() => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index] = true;
        setSelectedItems(newSelectedItems);
        sleep(1000).then(() => {
          userService.getUserInfo(usernameAuth!!).then((response) => {
            setUserInfo(response?.data);
          });
        });
        closeModalWithAnimation(150);
        toast.success(TOAST_MESSAGE.CLAIM_DAILY_GIFT_SUCCESS, {
          position: "top-right",
        });
      })
      .catch((e: any) => {
        closeModalWithAnimation(150);
        toast.error(TOAST_MESSAGE.CLAIM_DAILY_GIFT_FAIL, {
          position: "top-right",
        });
        throw e;
      });
  };
  return (
    <div className="z-20 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 bg-main-grayColor-50 backdrop-blur-sm animate-fadeIn">
      <div
        ref={dailyGiftModalRef}
        id="modal"
        className="daily-gift-modal absolute transition-all duration-150 w-[390px] font-nunito bg-gradient-to-b from-[#C4B5FD] via-[#979BFF] to-[#EF36C6] rounded-[18px] w-[534px] px-2 py-2"
      >
        <h1 className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 inline-block text-3xl text-main-whileColor font-semibold leading-[1.6] px-[30px] bg-main-pink-be rounded-[14px] shadow-[inset_0_-2px_3px_rgba(0,0,0,0.3)]">
          Daily Gift
        </h1>
        <div className="grid grid-cols-3 gap-4 bg-gradient-to-b from-[#FDA3FF] via-[#F4BFFF] to-[#9949FF] px-[30px] py-[40px] rounded-[10px] shadow-[inset_0_2px_2px_rgba(0,0,0,0.6)] shadow-[#d389d4]">
          <div
            onClick={
              playstreak === 1
                ? () => {
                    handleItemClick(playstreak!! - 1);
                  }
                : undefined
            }
            className="relative cursor-pointer"
          >
            <div
              className={`${playstreak === 1 ? "daily-gift-choose" : ""}`}
            ></div>
            <h2 className="text-2xl font-bold font-nunito text-main-whileColor pt-[6px] rounded-t-[15px] text-center bg-main-pink-f4 shadow-[inset_6px_0px_10px_rgba(255,255,255,0.3)]">
              Day 1
            </h2>
            <div className="flex justify-center bg-main-violet-a7 rounded-b-[15px] pt-[9px] shadow-[inset_0px_1px_10px_rgba(0,0,0,0.58)] ">
              <Image width={49} src={Gift1} alt="gift" />
            </div>
            <div
              className={`tick absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-main-whileColor-30 w-full h-full flex justify-center items-center rounded-[15px] 
              ${selectedItems[0] ? "" : "hidden"}
              `}
            >
              <Image src={tick} width={30} alt="tick" />
            </div>
          </div>
          <div
            onClick={
              playstreak === 2
                ? () => {
                    handleItemClick(playstreak!! - 1);
                  }
                : undefined
            }
            className="relative cursor-pointer"
          >
            <div
              className={`${playstreak === 2 ? "daily-gift-choose" : ""}`}
            ></div>
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
            onClick={
              playstreak === 3
                ? () => {
                    handleItemClick(playstreak!! - 1);
                  }
                : undefined
            }
            className="relative cursor-pointer"
          >
            <div
              className={`${playstreak === 3 ? "daily-gift-choose" : ""}`}
            ></div>
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
            onClick={
              playstreak === 4
                ? () => {
                    handleItemClick(playstreak!! - 1);
                  }
                : undefined
            }
            className="relative cursor-pointer"
          >
            <div
              className={`${playstreak === 4 ? "daily-gift-choose" : ""}`}
            ></div>
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
            onClick={
              playstreak === 5
                ? () => {
                    handleItemClick(playstreak!! - 1);
                  }
                : undefined
            }
            className="relative cursor-pointer"
          >
            <div
              className={`${playstreak === 5 ? "daily-gift-choose" : ""}`}
            ></div>
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
            onClick={
              playstreak === 6
                ? () => {
                    handleItemClick(playstreak!! - 1);
                  }
                : undefined
            }
            className="relative cursor-pointer"
          >
            <div
              className={`${playstreak === 6 ? "daily-gift-choose" : ""}`}
            ></div>
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
            onClick={
              playstreak === 7
                ? () => {
                    handleItemClick(playstreak!! - 1);
                  }
                : undefined
            }
            className="col-span-3 relative cursor-pointer"
          >
            <div
              className={`${playstreak === 7 ? "daily-gift-choose" : ""}`}
            ></div>
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
            onClick={() => {
              handleItemClick(playstreak!! - 1);
            }}
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
