import Image from "next/image";
import Picture from "@/asset/image/game10.png";
type Props = {
  data: Array<any>;
  title: string;
};
function PlayListGame({ data, title }: Props) {
  return (
    <div className="mb-[43px]">
      <div className="flex justify-between text-main-whileColor mb-4">
        <h1 className="text-2xl font-bold font-nunito">{title}</h1>
        <button className="text-sx font-medium font-lato">
          View all {">"}
        </button>
      </div>
      <div className="w-full overflow-hidden overflow-x-scroll whitespace-nowrap no-scrollbar">
        {data.map((item, index) => (
          <div
            key={index}
            className="mr-4 inline-flex border-[3px] border-main-pink-f4 rounded-[10px]"
          >
            <Image
              src={Picture}
              alt="Image"
              className="w-[94px] rounded-[10px] inline-block"
            />
            <div className="ml-[12px] mr-[18px] py-[24px] font-lato text-main-whileColor">
              <h2 className="text-xl font-bold">2 players</h2>
              <button className="text-xs font-medium">View all {">"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayListGame;
