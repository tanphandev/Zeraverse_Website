import Image from "next/image";
import Link from "next/link";
import SlipBar from "./SlipBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  userLovedGameSelector,
  userMostPlayedGameSelector,
  userPlayListGameSelector,
  userPurchaseHistorySelector,
  userRecentlyGameSelector,
} from "@/store/selectors/userSelector";
import PlayListGame from "./PlaylistGame";
import { staticPaths } from "@/utils/paths";
import { UserField } from "../../utils/constants";
import * as userService from "@/services/user.service";
import IPlayListGame from "@/interface/user/IPlayListGame";
import IMostPlayedGame from "@/interface/user/IMostPlayedGame";
import PurchaseHistory from "./PurchaseHistory";
import IPurchaseHistory from "@/interface/user/IPurchaseHistory";
import { IUserInfo } from "@/interface/user/IUserInfo";
type Props = {
  userInfo: IUserInfo | null;
  onClick: (title: string) => void;
};
function UserActivities({ userInfo, onClick }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const mostPlayedGame = useSelector<RootState>(
    userMostPlayedGameSelector
  ) as IMostPlayedGame;
  const userRecentlyGame = useSelector<RootState>(
    userRecentlyGameSelector
  ) as IGame[];
  const userLovedGame = useSelector<RootState>(
    userLovedGameSelector
  ) as IGame[];
  const userListGame = useSelector<RootState>(
    userPlayListGameSelector
  ) as IPlayListGame[];
  const userPurchaseHistory = useSelector<RootState>(
    userPurchaseHistorySelector
  ) as IPurchaseHistory;
  //get User Recently Game, Loved Game, PlayList Game
  useEffect(() => {
    dispatch(userService.getMostPlayedGame(userInfo?.username!!));
    dispatch(userService.getUserRecentlyGame(userInfo?.username!!));
    dispatch(userService.getUserLovedGame(userInfo?.username!!));
    dispatch(userService.getUserPlayListGame(userInfo?.username!!));
    dispatch(userService.getUserPurchaseHistory(userInfo?.username!!));
  }, [userInfo, dispatch]);

  //
  return (
    <div className="h-full text-main-whileColor bg-main-grayColor-50 rounded-[20px]">
      <h2 className="text-[28px] text-center font-bold bg-main-pink-ec rounded-t-[20px]  pt-[22px] pb-[14px] pl-4">
        Activities
      </h2>
      <div className="pt-[21px] px-[42px]">
        <div className="flex flex-col items-center mb-[30px]">
          <h3 className="text-[28px] font-bold font-nunito text-main-whileColor mb-3">
            Most played
          </h3>
          {!!mostPlayedGame ? (
            <Link
              href={staticPaths.game_screen}
              className="relative group hover:scale-105 transition-all ease-in-out duration-300"
            >
              <Image
                className={`max-w-full max-h-full w-auto h-full rounded-[20px]`}
                src={mostPlayedGame.game_detail?.thumbnail}
                alt="MostPlayedPicture"
                width={324}
                height={204}
              />
              <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
                {mostPlayedGame.game_detail?.title}
              </p>
            </Link>
          ) : (
            <>
              <p className="text-lg font-semibold font-nunito text-main-whileColor mb-2">
                You haven&apos;t played any games yet.
              </p>
              <Link
                href={staticPaths.home}
                className="text-[18px] font-medium font-nunito text-main-whileColor py-2 px-5 bg-gradient-to-br from-[#f265e4] via-[#6664ed] to-[#5200ff] rounded-[40px] shadow-[_0px_2px_4px] shadow-[#f579f8] hover:shadow-[inset_0px_2px_4px_#4a054b]"
              >
                Play Now!
              </Link>
            </>
          )}
        </div>
        <SlipBar
          onClick={onClick}
          data={userRecentlyGame}
          title={UserField.recentGame}
        />
        <SlipBar
          onClick={onClick}
          data={userLovedGame}
          title={UserField.lovedGame}
        />
        <PlayListGame
          onClick={onClick}
          data={userListGame}
          title={UserField.playListGame}
        />
        <PurchaseHistory
          onClick={onClick}
          data={userPurchaseHistory}
          title={UserField.purchaseHistory}
        />
      </div>
    </div>
  );
}

export default UserActivities;
