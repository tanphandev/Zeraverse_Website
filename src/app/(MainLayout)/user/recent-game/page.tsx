import { gameList } from "@/app/dataFetch/dataFetch";
import Image from "next/image";
type Props = {
  title: string;
};

function UserFieldDetail({ title }: Props) {
  return (
    <div className="h-full text-main-whileColor bg-main-grayColor-50 rounded-[20px] p-11 mb-[40px]">
      <h2 className="relative text-[28px] text-center font-bold bg-main-pink-ec rounded-t-[20px]  pt-[22px] pb-[14px] pl-4 mb-[44px]">
        {title}
        <button className="absolute top-1/2 left-5 -translate-y-1/2 text-sm font-bold font-lato">
          {"<"} Back
        </button>
      </h2>
      <div className="grid grid-cols-10 gap-4">
        {gameList.map((item, index) => (
          <Image
            key={index}
            src={item.src}
            alt="game_picture"
            className="w-full rounded-[10px]"
          />
        ))}
      </div>
    </div>
  );
}

export default UserFieldDetail;
