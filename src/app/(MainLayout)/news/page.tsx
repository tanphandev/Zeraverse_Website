import News from "@/components/News";
import PopularNews from "@/components/PopularNews";
import TrendingNew from "@/components/TrendingNew";
import { articleList } from "@/dataFetch/dataFetch";
import dynamic from "next/dynamic";
const ArticleCarouselDynamic = dynamic(
  () => import("@/components/ArticleCarousel"),
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
