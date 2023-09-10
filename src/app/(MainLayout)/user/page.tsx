"use client";
import { useEffect, useState } from "react";
import UserStatus from "@/components/Profile/UserStatistic";
import UserReward from "@/components/Profile/UserReward";
import UserActivities from "@/components/Profile/UserActivities";
import UserFieldDetail from "@/components/Profile/UserFieldDetail";
import UserPlayList from "@/components/Profile/UserPlayList";
import PurchaseHistoryDetail from "@/components/Profile/PurchaseHistoryDetail";
import { UserField } from "@/utils/constants";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import * as userService from "@/services/user.service";
import {
  userLovedGameSelector,
  userPlayListGameSelector,
  userPurchaseHistorySelector,
  userRecentlyGameSelector,
} from "@/store/selectors/userSelector";
import IPlayListGame from "@/interface/user/IPlayListGame";
import IPurchaseHistory from "@/interface/user/IPurchaseHistory";
function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAuthContext();
  const userRecentlyGame = useSelector<RootState>(
    userRecentlyGameSelector
  ) as IGame[];
  const userLovedGame = useSelector<RootState>(
    userLovedGameSelector
  ) as IGame[];
  const userPlayListGame = useSelector<RootState>(
    userPlayListGameSelector
  ) as IPlayListGame[];
  const userPurchaseHistory = useSelector<RootState>(
    userPurchaseHistorySelector
  ) as IPurchaseHistory;
  const [isOpenUserDetail, setIsOpenUserDetail] = useState<boolean>(true);
  const [isOpenRecentGame, setIsOpenRecentGame] = useState<boolean>(false);
  const [isOpenLovedGame, setIsOpenLovedGame] = useState<boolean>(false);
  const [isOpenPlayListGame, setIsOpenPlayListGame] = useState<boolean>(false);
  const [isOpenPurchaseHistory, setIsOpenPurchaseHistory] =
    useState<boolean>(false);
  useEffect(() => {
    dispatch(userService.getUserInventories({}));
  }, [dispatch]);
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
              <UserStatus userInfo={userInfo} />
              <UserReward userInfo={userInfo} />
            </div>
          </div>
          <div className="col-span-7">
            <UserActivities userInfo={userInfo} onClick={handleChooseField} />
          </div>
        </div>
      )}
      {isOpenRecentGame && (
        <UserFieldDetail
          dataList={userRecentlyGame}
          onBack={onBack}
          title={UserField.recentGame}
        />
      )}
      {isOpenLovedGame && (
        <UserFieldDetail
          dataList={userLovedGame}
          onBack={onBack}
          title={UserField.lovedGame}
        />
      )}
      {isOpenPlayListGame && (
        <UserPlayList
          dataList={userPlayListGame}
          onBack={onBack}
          title={UserField.playListGame}
          // showPlayListDetailFirst={{ isShowFirst: boolean, playListId: number }}
        />
      )}
      {isOpenPurchaseHistory && (
        <PurchaseHistoryDetail
          onBack={onBack}
          title={UserField.purchaseHistory}
        />
      )}
    </div>
  );
}

export default UserProfile;
