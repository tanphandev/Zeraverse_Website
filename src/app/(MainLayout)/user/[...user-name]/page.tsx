"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import UserStatus from "@/components/Profile/UserStatistic";
import UserReward from "@/components/Profile/UserReward";
import UserActivities from "@/components/Profile/UserActivities";
import * as userService from "@/services/user.service";
import { getOtherUserInfoSelector } from "@/store/selectors/userSelector";
import { IUserInfo } from "@/interface/user/IUserInfo";
import UserLayout from "../UserLayout";
type Props = {
  params: {
    "user-name": string;
  };
};
function OtherUser({ params }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const otherUserInfo = useSelector<RootState>(
    getOtherUserInfoSelector
  ) as IUserInfo;
  useEffect(() => {
    dispatch(userService.getOtherUserInfo(params["user-name"]));
  }, []);
  return (
    <UserLayout userInfo={otherUserInfo!!}>
      <div>
        <div className="grid grid-cols-11 gap-x-[18px] mb-[40px]">
          <div className="col-span-4">
            <div className="grid grid-rows-2 h-full font-nunito text-main-whileColor gap-y-4">
              <UserStatus userInfo={otherUserInfo!!} />
              <UserReward userInfo={otherUserInfo!!} />
            </div>
          </div>
          <div className="col-span-7">
            <UserActivities userInfo={otherUserInfo!!} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default OtherUser;
