"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { IUserInfo } from "@/interface/user/IUserInfo";
import { userRewardsSelector } from "@/store/selectors/userSelector";
import * as userService from "@/services/user.service";
import {
  abbreviateNumber,
  getBetweenTwoDate,
  toUpperCaseFirstLetter,
} from "@/utils/helper";
type Props = {
  userInfo?: IUserInfo | null;
};
function UserReward({ userInfo }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const userRewards = useSelector<RootState>(userRewardsSelector) as any[];
  useEffect(() => {
    !!userInfo && dispatch(userService.getUserRewards(userInfo?.username!!));
  }, [userInfo, dispatch]);
  return (
    <div className="h-full text-main-whileColor bg-main-grayColor-50 rounded-[20px]">
      <h2 className="text-[28px] font-bold bg-main-pink-ec rounded-t-[20px]  pt-[22px] pb-[14px] pl-4">
        Rewards
      </h2>
      <div className="font-lato m-[23px]">
        {userRewards?.map((item, index) => (
          <div
            className="text-xl font-bold font-lato leading-[1.6] text-main-whileColor mb-[35px] last:mb-0"
            key={index}
          >
            {item?.type?.includes("BUY_AVATAR") ||
            item?.type?.includes("BUY_COVER_PAGE") ||
            item?.type?.includes("BUY_TIME") ? (
              <span>Spend </span>
            ) : (
              <span>Earn </span>
            )}
            <span>{abbreviateNumber(+item?.zera_amount) + " ZERA from "}</span>
            <span>
              {toUpperCaseFirstLetter(item?.type?.replaceAll("_", " "))}
            </span>
            <div className="opacity-60 text-base">
              {getBetweenTwoDate(item?.created_at)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserReward;
