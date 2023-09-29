import Link from "next/link";
import Image from "next/image";
import NoData from "../Others/NoData";
import { staticPaths } from "@/utils/paths";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";

type Props = {
  data: Array<any>;
  title: string;
  onClick?: ({ title, payload }: { title: string; payload?: any }) => void;
};
function SlipBar({ data, title, onClick }: Props) {
  return (
    <div className="mb-[43px]">
      <div className="flex justify-between text-main-whileColor mb-4">
        <h1 className="text-2xl font-bold font-nunito">{title}</h1>
        {!!onClick && (
          <button
            onClick={() => {
              onClick({ title });
            }}
            className="text-sx font-medium font-lato hover:text-main-pink-db"
          >
            View all {">"}
          </button>
        )}
      </div>

      {data.length === 0 ? (
        <NoData />
      ) : (
        <div className="w-full overflow-hidden overflow-x-scroll whitespace-nowrap no-scrollbar p-[10px] mx-[-10px]">
          {data.map((item, index) => (
            <Link
              href={staticPaths.game_detail(item?.slug)}
              key={index}
              className="relative group hover:scale-105 transition-all ease-in-out duration-300 inline-block mr-4"
            >
              <CustomImage
                className={`w-[94px] h-[94px] rounded-[20px]`}
                src={item?.thumbnail}
                fallback={images.default_game_image}
                alt="Image"
                width={0}
                height={0}
                sizes="100vw"
              />
              <p className="w-full overflow-hidden whitespace-nowrap truncate text-center absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 transition-all ease-in-out group-hover:translate-y-[-14px] group-hover:opacity-100 duration-300 text-base text-[#f6f5f5] font-semibold font-lato drop-shadow-2xl [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.8)] px-1">
                {item?.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SlipBar;
