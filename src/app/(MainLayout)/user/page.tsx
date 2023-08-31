"use client";
import { useState } from "react";
import UserStatus from "@/components/Profile/UserStatus";
import UserReward from "@/components/Profile/UserReward";
import UserActivities from "@/components/Profile/UserActivities";
import UserFieldDetail from "@/components/Profile/UserFieldDetail";
import { UserField } from "@/utils/constants";
import UserPlayList from "@/components/Profile/UserPlayList";
import PurchaseHistory from "@/components/Profile/PurchaseHistory";
function UserProfile() {
  const [isOpenUserDetail, setIsOpenUserDetail] = useState<boolean>(true);
  const [isOpenRecentGame, setIsOpenRecentGame] = useState<boolean>(false);
  const [isOpenLovedGame, setIsOpenLovedGame] = useState<boolean>(false);
  const [isOpenPlayListGame, setIsOpenPlayListGame] = useState<boolean>(false);
  const [isOpenPurchaseHistory, setIsOpenPurchaseHistory] =
    useState<boolean>(false);

  const handleChooseField = (title: string) => {
    switch (title) {
      case UserField.recentGame: {
        setIsOpenUserDetail(false);
        setIsOpenRecentGame(true);
        break;
      }
      case UserField.lovedGame: {
        setIsOpenUserDetail(false);
        setIsOpenLovedGame(true);
        break;
      }
      case UserField.playListGame: {
        setIsOpenUserDetail(false);
        setIsOpenPlayListGame(true);
        break;
      }
      case UserField.purchaseHistory: {
        setIsOpenUserDetail(false);
        setIsOpenPurchaseHistory(true);
        break;
      }
    }
  };
  const onBack = (title: string) => {
    switch (title) {
      case UserField.recentGame:
        setIsOpenRecentGame(false);
        break;
      case UserField.lovedGame:
        setIsOpenLovedGame(false);
        break;
      case UserField.playListGame:
        setIsOpenPlayListGame(false);
        break;
      case UserField.purchaseHistory:
        setIsOpenPurchaseHistory(false);
        break;
    }
    setIsOpenUserDetail(true);
  };
  return (
    <div>
      {isOpenUserDetail && (
        <div className="grid grid-cols-11 gap-x-[18px] mb-[40px]">
          <div className="col-span-4">
            <div className="grid grid-rows-2 h-full font-nunito text-main-whileColor gap-y-4">
              <UserStatus />
              <UserReward />
            </div>
          </div>
          <div className="col-span-7">
            <UserActivities onClick={handleChooseField} />
          </div>
        </div>
      )}
      {isOpenRecentGame && (
        <UserFieldDetail onBack={onBack} title={UserField.recentGame} />
      )}
      {isOpenLovedGame && (
        <UserFieldDetail onBack={onBack} title={UserField.lovedGame} />
      )}
      {isOpenPlayListGame && (
        <UserPlayList onBack={onBack} title={UserField.playListGame} />
      )}
      {isOpenPurchaseHistory && (
        <PurchaseHistory onBack={onBack} title={UserField.purchaseHistory} />
      )}
    </div>
  );
}

export default UserProfile;
