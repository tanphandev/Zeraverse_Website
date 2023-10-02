import Image from "next/image";
import IPlayListGame from "@/interface/user/IPlayListGame";
import NoData from "../Others/NoData";
import PlayListGameIcon from "@/asset/icons/PlayListGameIcon";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
type Props = {
  data: IPlayListGame[];
  title: string;
  onClick?: ({ title, payload }: { title: string; payload?: any }) => void;
};
function PlayListGame({ data, title, onClick }: Props) {
  return (
    <div className="mb-[43px]">
      <div className="flex justify-between text-main-whileColor mb-4">
        <h1 className="text-2xl font-bold font-nunito">{title}</h1>
        {!!onClick && (
          <button
            onClick={() => {
              onClick({
                title,
                payload: {
                  isShowPlayListDetailFirst: false,
                },
              });
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
        <div className="w-full overflow-hidden overflow-x-scroll whitespace-nowrap no-scrollbar">
          {data.map((item, index) => (
            <div
              key={index}
              className="mr-4 inline-flex border-[3px] border-main-pink-f4 rounded-[10px]"
            >
              {item?.thumbnail ? (
                <CustomImage
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={item?.thumbnail}
                  fallback={images.default_game_image}
                  alt="Image"
                  className="object-cover w-[94px] rounded-[10px] inline-block"
                />
              ) : (
                <div className="mx-4">
                  <PlayListGameIcon className="" width="56px" height="100%" />
                </div>
              )}
              <div className="ml-[12px] mr-[18px] py-[24px] font-lato text-main-whileColor text-center">
                <h2 className="text-xl font-bold">{item?.name}</h2>
                {!!onClick && (
                  <button
                    onClick={() => {
                      onClick({
                        title,
                        payload: {
                          isShowPlayListDetailFirst: true,
                          playListId: item.id,
                        },
                      });
                    }}
                    className="text-sx font-medium hover:text-main-pink-db"
                  >
                    View all {">"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlayListGame;
