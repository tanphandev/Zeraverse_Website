import News from "@/app/components/News";
import PopularNews from "@/app/components/PopularNews";
import TrendingNew from "@/app/components/TrendingNew";
import { articleList } from "@/app/dataFetch/dataFetch";
import dynamic from "next/dynamic";
const ArticleCarouselDynamic = dynamic(
  () => import("@/app/components/ArticleCarousel"),
  {
    ssr: false,
  }
);
function NewsPage() {
  return (
    <div>
      <ArticleCarouselDynamic />
      {/* Trending New */}
      <TrendingNew />
      <PopularNews />
      <News list={articleList} itemsPerPage={9} />
    </div>
  );
}

export default NewsPage;
