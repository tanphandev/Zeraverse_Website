import Image from "next/image";
import IPlayListGame from "@/interface/user/IPlayListGame";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
import NoData from "../Others/NoData";
type Props = {
  data: IPlayListGame[];
  title: string;
  onClick: (title: string) => void;
};
function PlayListGame({ data, title, onClick }: Props) {
  return (
    <div className="mb-[43px]">
      <div className="flex justify-between text-main-whileColor mb-4">
        <h1 className="text-2xl font-bold font-nunito">{title}</h1>
        <button
          onClick={() => {
            onClick(title);
          }}
          className="text-sx font-medium font-lato"
        >
          View all {">"}
        </button>
      </div>
      {data.length === 0 ? (
        <NoData />
      ) : (
        <div className="w-full overflow-hidden overflow-x-scroll whitespace-nowrap no-scrollbar">
          {data.map((item, index) => (
            <div
              key={index}
              className="mr-4 inline-flex border-[3px] border-main-pink-f4 rounded-[10px]"
            >
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={item?.thumbnail}
                alt="Image"
                className="w-[94px] rounded-[10px] inline-block"
              />
              <div className="ml-[12px] mr-[18px] py-[24px] font-lato text-main-whileColor text-center">
                <h2 className="text-xl font-bold">{item?.name}</h2>
                <button className="text-xs  font-medium">View all {">"}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayListGame;
