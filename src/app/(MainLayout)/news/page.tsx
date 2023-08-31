import News from "@/components/News/News";
import PopularNews from "@/components/News/PopularNews";
import TrendingNew from "@/components/Articles/TrendingNew";
import { articleList } from "@/dataFetch/dataFetch";
import dynamic from "next/dynamic";
const ArticleCarouselDynamic = dynamic(
  () => import("@/components/Articles/ArticleCarousel"),
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
