import ArticleItem from "@/app/components/ArticeItem";

function ArticleCategoryPage() {
  //mockdata
  const articleList = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div>
      <div className="grid grid-cols-11 gap-4 bg-main">
        <h2 className="col-span-4 text-[28px] text-center font-bold font-nunito text-main-whileColor py-7 rounded-[10px] bg-gradient-to-b from-[#979BFF] via-[#ef75f5] to-[#EF36C6] mb-4">
          Article
        </h2>
        <div className="col-span-10 mb-[130px]">
          <div className="grid grid-cols-2 gap-x-[20px] gap-y-4">
            {articleList.map((article, index) => {
              return <ArticleItem key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCategoryPage;
