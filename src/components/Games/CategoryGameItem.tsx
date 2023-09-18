import { inRange } from "@/utils/helper";
import { staticPaths } from "@/utils/paths";
import Link from "next/link";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
type Props = {
  item: any;
  index: number;
  className: string;
  [x: string]: any;
};
function CategoryGameItem({
  item,
  index,
  className,
  onClick,
  ...props
}: Props) {
  const isMinSize = !inRange(index, 0, 6);

  return (
    <Link
      {...props}
      className={`${className} col-span-2 rounded-2xl overflow-hidden relative cursor-pointer w-full bg-white 
                      ${isMinSize ? "flex items-center justify-start" : ""}
                      hover:translate-y-[-2px] hover:scale-105 transition-all duration-300 shadow-[0px_6px_12px_0px_rgb(0,0,0,0.24)]`}
      href={`${staticPaths.game_category}/${item?.label}`}
    >
      {/* thumbnail */}
      <CustomImage
        alt="picture"
        src={item?.thumbnail}
        fallback={images.default_game_image}
        width={0}
        height={0}
        className={`w-full h-full object-cover  ${
          isMinSize ? "max-w-[94px]" : "max-h-[168px]"
        } `}
      ></CustomImage>

      {/* label */}
      {isMinSize ? (
        <div className="h-full flex items-center ">
          <p
            className="bg-main-whileColor w-full bottom-0 px-4 font-bold h-fit max-w-[110px]
                       text-[13px] line-clamp web-line-clamp-4 text-main-violet-4c uppercase"
          >
            {item?.label}
          </p>
        </div>
      ) : (
        <div
          className="bg-main-whileColor bottom-0 px-4 font-bold h-9 flex items-center justify-center w-[190px]
                       text-[13px] text-main-violet-4c text-ellipsis overflow-hidden whitespace-nowrap uppercase"
        >
          {item?.label}
        </div>
      )}
    </Link>
  );
}

export default CategoryGameItem;
