import { gameList } from "@/app/dataFetch/dataFetch";
import Image from "next/image";
type Props = {
  title: string;
  onBack: (title: string) => void;
};

function UserFieldDetail({ title, onBack }: Props) {
  return (
    <div className="h-full text-main-whileColor bg-main-grayColor-50 rounded-[20px] mb-[40px]">
      <div className="relative">
        <h2 className=" flex items-center justify-center text-[28px] text-center font-bold bg-main-pink-ec rounded-t-[20px] py-4">
          {title}
        </h2>
        <button
          onClick={() => {
            onBack(title);
          }}
          className="absolute top-1/2 left-5 -translate-y-1/2 text-sm font-bold font-lato"
        >
          {"<"} Back
        </button>
      </div>
      <div className="grid grid-cols-10 gap-4 p-11">
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
