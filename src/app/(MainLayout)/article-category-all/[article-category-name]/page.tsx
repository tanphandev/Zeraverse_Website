import ArticleItem from "@/components/ArticeItem";
import Link from "next/link";

function ArticleCategory() {
  //mockdata
  const articleList = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-11 gap-4 bg-main">
        <h2 className="col-span-4 text-[28px] text-center font-bold font-nunito text-main-whileColor py-7 rounded-[10px] bg-gradient-to-b from-[#979BFF] via-[#ef75f5] to-[#EF36C6] mb-4">
          Article
        </h2>
        <div className="col-span-10 mb-[130px]">
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-4 cursor-pointer">
            {articleList.map((article, index) => {
              return (
                <Link key={index} href={`abc/${article.id}`}>
                  <ArticleItem />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCategory;
