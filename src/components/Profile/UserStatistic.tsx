import Tippy from "@tippyjs/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "react-toastify";
import { userStatisticSelector } from "@/store/selectors/user.selector";
import { IUserStatistic } from "@/interface/user/IUserStatistic";
import { TOAST_MESSAGE } from "@/utils/constants";
import { IUserInfo } from "@/interface/user/IUserInfo";
import * as userService from "@/services/user.service";
import CopyIcon from "@/asset/icons/CopyIcon";
import "tippy.js/dist/tippy.css";
type Props = {
  userInfo?: IUserInfo | null;
};
function UserStatus({ userInfo }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const userStatistic = useSelector<RootState>(
    userStatisticSelector
  ) as IUserStatistic;
  // convert miliseconds to seconds
  const playTimeMinute = Math.floor(userStatistic?.playtime!! / 60);
  const dateData = new Date(userStatistic?.joined);

  // convert to day, month, year
  const day = dateData?.getDate();
  const month = (dateData?.getMonth() as number) + 1;
  const year = dateData?.getFullYear();

  // get user statistic
  useEffect(() => {
    userInfo?.username &&
      dispatch(userService.getUserStatistic(userInfo?.username));
  }, [userInfo, dispatch]);

  //handle click copy user url
  const handleCopyUserLink = () => {
    navigator.clipboard.writeText(userInfo?.ref_link!!);
    toast.success(TOAST_MESSAGE.COPY_SUCCESS, { position: "top-right" });
  };
  return (
    <div className="relative text-main-whileColor bg-main-grayColor-50 rounded-[20px]">
      <h2 className="text-[28px] font-bold bg-main-pink-ec rounded-t-[20px]  pt-[22px] pb-[14px] pl-4">
        Statistic
      </h2>
      <ul className="font-lato mb-[90px] mt-[34px] mx-[28px]">
        <li className="pb-[33px]">
          <p className="text-[28px] font-medium">
            {playTimeMinute} minutes left
          </p>
        </li>
        <li className="pb-[33px]">
          <p className="text-[28px] font-medium">
            Playstreak: {userInfo?.playstreak} days
          </p>
          <p className="text-base font-bold text-main-whileColor-50">
            Highest streak: {userStatistic?.highest_playstreak} days
          </p>
        </li>
        <li className="pb-[33px]">
          <p className="text-[28px] font-medium">
            {userStatistic?.played_game} games played
          </p>
        </li>
        <li className="pb-[33px]">
          <p className="text-[28px] font-medium">
            {userStatistic?.loved_game} games loved
          </p>
        </li>
        <li className="pb-[34px]">
          <p className="text-[28px] font-medium">
            Joined {`${day}/${month}/${year}`}
          </p>
        </li>
      </ul>
      <div className="absolute bottom-0 left-0 right-0 rounded-b-[20px] bg-main-violet-8b py-[15px]">
        <h3 className="inline text-2xl font-semibold font-lato text-main-violet-f5 ml-[28px]">
          Referall link:
        </h3>
        <Tippy content="Copy" placement="bottom">
          <div
            onClick={handleCopyUserLink}
            className="inline-block cursor-pointer"
          >
            <span className="text-xl font-semibold text-main-pink-fb mx-[7px]">
              {userInfo?.username}
            </span>
            <CopyIcon className="inline-block" width="17px" height="20px" />
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default UserStatus;
