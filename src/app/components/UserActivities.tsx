import Image from "next/image";
import MostPlayedPic from "@/asset/image/MostPlayedPic.png";
import SlipBar from "./SlipBar";
import { gameList } from "@/app/dataFetch/dataFetch";
import PlayListGame from "./PlaylistGame";
function UserActivities() {
  return (
    <div className="h-full text-main-whileColor bg-main-grayColor-50 rounded-[20px]">
      <h2 className="text-[28px] text-center font-bold bg-main-pink-ec rounded-t-[20px]  pt-[22px] pb-[14px] pl-4">
        Activities
      </h2>
      <div className="pt-[21px] px-[42px]">
        <div className="flex flex-col items-center">
          <h3>Most played</h3>
          <Image
            className=""
            src={MostPlayedPic}
            alt="MostPlayedPicture"
            width={324}
            height={204}
          />
        </div>
        <SlipBar data={gameList} title="Recent games" />
        <SlipBar data={gameList} title="Loved games" />
        <PlayListGame data={gameList} title="Playlist" />
        <SlipBar data={gameList} title="Purchase history" />
      </div>
    </div>
  );
}

export default UserActivities;
