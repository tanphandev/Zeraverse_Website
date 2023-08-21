import Link from "next/link";

function ArticleCategoryAll() {
  const allArticleList = [
    {
      name: "Game",
    },
    {
      name: "Game Play",
    },
    {
      name: "Taltic Game",
    },
    {
      name: "Gamer Game",
    },
    {
      name: "Sport Game",
    },
  ];
  return (
    <div className="font-lato text-main-whileColor border-[5px] border-main-pink-f4 rounded-[20px] bg-main-grayColor-80 py-[24px] px-[28px] mb-[40px]">
      <Link
        href={"/home"}
        className="text-sm font-bold text-main-pink-ec cursor-pointer"
      >
        {"<"} Back
      </Link>
      <p className="text-xs font-bold mb-[20px] mt-5">
        Home / All article category
      </p>
      <h1 className="font-bold font-nunito mb-3">All Article Category</h1>
      <ul className="list-disc ml-4 text-sm font-normal font-lato text-main-pink-ec">
        {allArticleList.map((articleCategory, index) => (
          <li className="mb-2" key={index}>
            <Link href={`/article-category-all/${articleCategory.name}`}>
              {articleCategory.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleCategoryAll;
