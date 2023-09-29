"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import * as userService from "@/services/user.service";
import CoinIcon from "@/asset/icons/CoinIcon";
import achievementZera from "@/../public/asset/image/achievementZera.png";
import achievementPlayedGame from "@/../public/asset/image/achievementPlayedGame.png";
import achievementLeft from "@/../public/asset/image/achievementLeft.png";
import achievementRight from "@/../public/asset/image/achievementRight.png";
import { staticPaths } from "@/utils/paths";
import { achievementSelector } from "@/store/selectors/userSelector";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { IAchievement } from "@/interface/user/IAchievements";
import { counterAnimate } from "@/utils/helper";
import ReactPaginate from "react-paginate";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
import NoData from "@/components/Others/NoData";
import CustomImage from "@/components/Others/CustomImage";
import { images } from "@/asset/image/images";
function Achievements({
  params,
}: {
  params: {
    "username-slug": string;
  };
}) {
  const dispatch = useDispatch<AppDispatch>();
  const achievements =
    (useSelector<RootState>(achievementSelector) as IAchievement) ?? {};
  let { user_info, played_game, total_earned_zera, play_streak } = achievements;
  const { username, avatar, quote, highest_playstreak } = user_info ?? {};
  const { count, rows } = played_game ?? {};
  const gamePlayed = (achievements?.played_game?.rows as any[]) ?? [];
  //define itemsPerPage
  const itemsPerPage = 4;
  //set item start
  const [itemOffset, setItemOffset] = useState(0);
  //set item end
  const endOffset = itemOffset + itemsPerPage;
  //current item list to show
  const currentItems = gamePlayed?.slice(itemOffset, endOffset);
  //calculate total page
  const pageCount = Math.ceil(gamePlayed?.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % gamePlayed?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(
      userService.getAchivements(decodeURIComponent(params["username-slug"]))
    );
  }, []);

  useEffect(() => {
    if (!achievements) return;
    const count_node = document.getElementsByClassName("counter");
    const count_obj = {
      total_earned_zera: parseInt(total_earned_zera) || 0,
      gamePlayed: count || 0,
      highest_playstreak: highest_playstreak || 0,
      play_streak: play_streak || 0,
    };
    for (let i = 0; i < count_node.length; i++) {
      counterAnimate(count_node[i], 0, Object.values(count_obj)[i], 2000);
    }
  }, [achievements]);

  return (
    <div className="relative flex flex-col items-center font-lato text-main-whileColor border-[5px] border-main-pink-f4 rounded-[20px] bg-main-grayColor-80 px-[60px] pb-[62px] mb-[40px]">
      <Link href={staticPaths.home}>
        <button className="absolute top-[25px] left-[21px] text-sm font-bold text-main-pink-ec">
          {"<"}Back
        </button>
      </Link>
      <div className="mt-[9px]">
        <h1 className="inline text-[40px] font-bold font-lato px-[30px] py-[10px] bg-main-pink-9d rounded-[20px] shadow-[inset_-2px_-2px_2px_rgba(0,0,0,0.6)] ">
          Achievements
        </h1>
      </div>
      <div className="w-full rounded-[30px] bg-gradient-to-br from-[#FF00E5] via-[#EAC6E6] to-[#950086] p-[5px] mt-[100px] ">
        <div className="w-full bg-gradient-to-b from-[#300373] to-[#2c026a] py-[64px] px-[110px] rounded-[30px]">
          <div className="flex flex-col items-center mb-[24px]">
            <Link href={staticPaths.otherUser(username)}>
              <CustomImage
                src={avatar?.url}
                fallback={images.default_profile_image}
                width={0}
                height={0}
                className="w-[204px] h-[204px] rounded-[20px]"
                alt="Avatar"
              />
            </Link>
            <p className="text-center font-bold text-base mt-2">{username}</p>
            <p className="text-[13px] text-center">{quote}</p>
          </div>
          <div className="flex justify-center mb-[16px]">
            <div className="px-[13px] pt-[22px] pb-[24px] rounded-[30px] border-[1px] border-main-pink-f9 bg-gradient-to-b from-[#D34880] to-[#2F0652]">
              <div className="flex flex-col w-[204px] items-center py-[10px] mb-[55px]">
                <Image
                  src={achievementZera}
                  alt={"achievementRight"}
                  className="w-[118px] h-[118px] mb-[10px]"
                />
                <p
                  className="counter text-[28px] font-bold font-nunito bg-gradient-to-b bg-clip-text text-transparent from-[#FDE3A7] via-[#DE82A6] to-[#7185DF]"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {parseInt(total_earned_zera) || 0}
                </p>
              </div>

              <p className="text-center font-bold text-base">Earned Zera</p>
            </div>
            <div className="px-[13px] pt-[22px] pb-[24px] rounded-[30px] border-[1px] border-main-pink-f9 bg-gradient-to-b from-[#D34880] to-[#2F0652] mx-[25px]">
              <div className="flex flex-col w-[204px] items-center py-[10px] mb-[55px]">
                <Image
                  src={achievementPlayedGame}
                  alt={"achievementRight"}
                  className="w-[118px] h-[118px] mb-[10px]"
                />
                <p
                  className="counter text-[28px] font-bold font-nunito bg-gradient-to-b bg-clip-text text-transparent from-[#FDE3A7] via-[#DE82A6] to-[#7185DF] "
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {count || 0}
                </p>
              </div>
              <p className="text-center font-bold text-base">
                Total games played
              </p>
            </div>
            <div className="px-[13px] pt-[22px] pb-[24px] rounded-[30px] border-[1px] border-main-pink-f9 bg-gradient-to-b from-[#D34880] to-[#2F0652]">
              <div className="flex flex-col w-[204px] items-center py-[10px] mb-[55px]">
                <div className="mb-[10px] flex items-center">
                  <Image
                    src={achievementLeft}
                    alt="image"
                    className="w-[47px] h-[112px]"
                  />
                  <div className="flex flex-col h-[118px] justify-end">
                    <div className="h-[20px]"></div>
                    <p
                      className="counter text-[90px] leading-[98px] font-bold font-nunito bg-gradient-to-b bg-clip-text text-transparent from-[#FDE3A7] via-[#DE82A6] to-[#7185DF]"
                      style={{
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {highest_playstreak || 0}
                    </p>
                  </div>
                  <Image
                    src={achievementRight}
                    alt="image"
                    className="w-[47px] h-[112px]"
                  />
                </div>
                <div className="h-[45px]"></div>
              </div>
              <div className="relative">
                <p className="text-center font-bold text-base">
                  Highest Playstreak
                </p>
                <p className="absolute text-[10px] font-normal font-lato bottom-[-14px] left-1/2 -translate-x-1/2">
                  Playstreak:{" "}
                  <span className="counter">{play_streak || 0}</span> days
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[28px] font-semibold font-lato text-main-whileColor mb-[15px] text-center">
              Top game played
            </h2>
            {gamePlayed?.length === 0 ? (
              <NoData />
            ) : (
              <div className="grid grid-cols-2 gap-x-[21px] gap-y-[15px] mb-6">
                {currentItems?.map((gameItem, index) => (
                  <Link
                    href={staticPaths.game_detail(gameItem?.id)}
                    key={index}
                    className=" flex justify-between items-center bg-gradient-to-b from-[#8B5CF6] to-[#503098] rounded-[20px] p-[10px]"
                  >
                    <div className="flex items-center">
                      <CustomImage
                        src={gameItem?.game_detail?.thumbnail}
                        fallback={images.default_game_image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="iamge"
                        className="w-[94px] h-[94px] mr-[10px] rounded-[15px]"
                      />
                      <p className="text-base font-bold font-lato text-main-whileColor">
                        {gameItem?.game_detail?.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-bold font-lato text-main-whileColor inline mr-4">
                        {gameItem?.zera_earned}
                      </p>
                      <CoinIcon className="inline" width="32px" height="32px" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <ReactPaginate
              breakLabel="..."
              nextLabel={<ArrowRightIconPagi width="24px" height="24px" />}
              previousLabel={<ArrowLeftIconPagi width="24px" height="24px" />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={4}
              marginPagesDisplayed={1}
              forcePage={0}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              pageClassName="page-item text-[14px] text-main-whileColor font-bold font-nunito px-[32px]"
              containerClassName="pagination flex justify-center"
              activeClassName="active"
              breakClassName="break"
              nextClassName="pagi-next"
              previousClassName="pagi-previous"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
