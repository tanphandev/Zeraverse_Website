"use client";
import { IArticle } from "@/interface/article/IArticle";
import { useRouter } from "next/navigation";
import { staticPaths } from "@/utils/paths";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";

type Props = {
  list: IArticle[];
};
function TrendingNew({ list }: Props) {
  const router = useRouter();
  const list2Item = list?.slice(0, 2);
  const gotoArticleDetail = (slug: string) => {
    router.push(staticPaths.article_detail(slug));
  };
  return (
    <div>
      <h2 className="text-[28px] font-bold font-lato text-main-whileColor mb-[10px]">
        Trending News
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-[22px]">
        {list2Item?.map((item, index) => (
          <div
            onClick={() => {
              gotoArticleDetail(item?.slug);
            }}
            key={index}
            className="flex items-center border border-main-pink-be rounded-[10px] bg-main-blackColor cursor-pointer"
          >
            <CustomImage
              className="w-[194px] h-[194px] ml-[5px] my-[5px] rounded-[10px]"
              src={item?.featured_image}
              fallback={images.default_article_image}
              alt="trendingNewPicture"
              width={194}
              height={194}
            />
            <div className="p-4">
              <h2 className=" text-2xl font-bold text-main-whileColor mb-[10px] line-clamp-2">
                {item?.title}
              </h2>
              <div
                className="text-sm font-light font-nunito text-main-whileColor line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item?.content.slice(1, -1) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingNew;
