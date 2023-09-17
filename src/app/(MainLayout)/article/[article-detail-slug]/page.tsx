import Link from "next/link";
import ApiCaller from "@/api/apiCaller";
import apiURL from "@/utils/apiURL";
import { use } from "react";
import { IArticleDetail } from "@/interface/article/IArticleDetail";
import { formatDate, toUpperCaseFirstLetterOfDoc } from "@/utils/helper";
import Breadcrumbs from "@/components/Others/Breadcumbs";
import { staticPaths } from "@/utils/paths";
const getArticleDetail = async (article_slug: string): Promise<any> => {
  try {
    const { success, data } = await ApiCaller.get(
      apiURL.get_article_detail(article_slug)
    );
    if (success) {
      return data;
    }
  } catch (e: any) {
    throw e;
  }
};

function ArticleDetail({
  params,
}: {
  params: { "article-detail-slug": string };
}) {
  const articleDetail: IArticleDetail = use(
    getArticleDetail(params["article-detail-slug"])
  );
  return (
    <div className="font-lato text-main-whileColor border-[5px] border-main-pink-f4 rounded-[20px] bg-main-grayColor-80 py-[24px] px-[28px] mb-[40px]">
      <Link
        href={staticPaths.home}
        className="text-sm font-bold text-main-pink-ec cursor-pointer"
      >
        <p className="mb-2"> {"<"} Back</p>
      </Link>
      <Breadcrumbs
        items={[
          { label: "Home", path: staticPaths.home },
          { label: "Article", path: staticPaths.article },
          {
            label: toUpperCaseFirstLetterOfDoc(params["article-detail-slug"]),
            path: staticPaths.article_detail(params["article-detail-slug"]),
          },
        ]}
      />
      <h1 className="text-[32px] font-nunito font-bold my-[22px]">
        {articleDetail?.title}
      </h1>
      <p className="text-xs font-nunito mb-2">
        {formatDate(articleDetail?.updated_at)}
      </p>
      <div className=" text-base font-bold font-nunito text-justify">
        <div
          className="article"
          dangerouslySetInnerHTML={{
            __html: articleDetail?.content
              .replaceAll('"', "")
              ?.replaceAll("\\", ""),
          }}
        />
      </div>
    </div>
  );
}

export default ArticleDetail;
