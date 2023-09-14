import { IArticle } from "@/interface/article/IArticle";
import { formatDate } from "@/utils/helper";
import Image from "next/image";
type Props = {
  article: IArticle;
};
function ArticleItem({ article }: Props) {
  return (
    <div className=" bg-violet-gradient relative flex border border-main-pink-ec rounded-[10px] bg-main-blackColor">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className="w-[204px] h-[204px] rounded-[10px] object-cover"
        src={article?.featured_image}
        alt="picture"
      />
      <div className=" flex-1 pt-[13px] pb-5 pr-[24px] pl-[18px]">
        <h2 className="text-[18px] font-nunito font-bold text-main-whileColor mb-[8px] line-clamp-2">
          {article?.title.replace(".", "")}
        </h2>
        <p
          className="text-xs font-medium text-justify font-nunito text-main-whileColor line-clamp-4"
          dangerouslySetInnerHTML={{
            __html: article?.content.replaceAll('"', "")?.replaceAll("\\", ""),
          }}
        />
        <p className="absolute bottom-1 right-[9px] text-[10px] font-medium italic font-nunito text-main-whileColor">
          {formatDate(article?.updated_at)}
        </p>
      </div>
    </div>
  );
}

export default ArticleItem;
