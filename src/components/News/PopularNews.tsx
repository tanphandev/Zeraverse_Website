import Image from "next/image";
import { IArticle } from "@/interface/article/IArticle";
import { formatDate } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { staticPaths } from "@/utils/paths";
type Props = {
  list: IArticle[];
};
function PopularNews({ list }: Props) {
  const list2Item = list?.slice(0, 2) as IArticle[];
  const router = useRouter();
  const gotoArticleDetail = (slug: string) => {
    router.push(staticPaths.article_detail(slug));
  };
  return (
    <div className="mb-[30px]">
      <h2 className="text-[28px] font-bold font-lato text-main-whileColor mb-[10px]">
        Popular News
      </h2>
      <div className="grid grid-cols-7 gap-5 ">
        <div
          onClick={() => {
            gotoArticleDetail(list2Item[0]?.slug);
          }}
          className="relative col-span-5 rounded-[5px] cursor-pointer"
        >
          <Image
            src={!!list2Item && list2Item[0]?.featured_image}
            width={0}
            height={0}
            sizes="100vw"
            alt="picture"
            style={{
              objectFit: "cover",
            }}
            className="w-full h-[424px] rounded-[5px]"
          />
          <div className="absolute z-10 bottom-4 left-4 flex flex-col">
            <div className=" ">
              <h2 className="text-[28px] font-bold font-lato text-main-whileColor mb-[2px] line-clamp-1">
                {!!list2Item && list2Item[0]?.title}
              </h2>
              <p
                className="text-xs font-light font-nunito text-main-whileColor mb-[18px] line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: !!list2Item && list2Item[0]?.content?.slice(1, -1),
                }}
              />

              <p className="text-[10px] font-light font-nunito text-main-whileColor">
                {formatDate(!!list2Item && list2Item[0]?.updated_at)}
              </p>
            </div>
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0  bg-gradient-to-b from-transparent to-main-blackColor"></div>
        </div>
        <div
          onClick={() => {
            gotoArticleDetail(list2Item[1]?.slug);
          }}
          className="col-span-2 text-main-whileColor bg-main-blackColor rounded-[5px] border-[1px] border-main-pink-be cursor-pointer"
        >
          <Image
            src={!!list2Item && list2Item[1]?.featured_image}
            width={0}
            height={0}
            sizes="100vw"
            alt="picture"
            className="w-full h-auto px-[8px] pt-[8px] rounded-[5px] mb-[12px]"
          />
          <div className="flex flex-col px-[15px] pb-[15px]">
            <div>
              <h2 className="text-2xl font-bold font-lato line-clamp-2">
                {!!list2Item && list2Item[1]?.title}
              </h2>
              <p
                className="text-xs font-light font-nunito text-justify mr-2 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: !!list2Item && list2Item[1]?.content?.slice(1, -1),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularNews;
