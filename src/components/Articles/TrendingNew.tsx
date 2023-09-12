"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import * as articleService from "@/services/article.service";
import { newestSelector } from "@/store/selectors/article.selector";
import { useEffect } from "react";
import { IArticle } from "@/interface/article/IArticle";

function TrendingNew() {
  const dispatch = useDispatch<AppDispatch>();
  const newest = useSelector<RootState>(newestSelector) as IArticle[];

  /* get newest */
  useEffect(() => {
    !newest && dispatch(articleService.getNewest({}));
  }, [newest]);
  const newest2Item = newest?.slice(0, 2);
  return (
    <div>
      <h2 className="text-[28px] font-bold font-lato text-main-whileColor mb-[10px]">
        Trending News
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-[22px]">
        {newest2Item?.map((item, index) => (
          <div
            key={index}
            className="flex items-center border border-main-pink-be rounded-[10px] bg-main-blackColor"
          >
            <Image
              className="w-[194px] h-[194px] ml-[5px] my-[5px] rounded-[10px]"
              src={item.featured_image}
              alt="trendingNewPicture"
              width={194}
              height={194}
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-main-whileColor mb-[10px]">
                {item.title}
              </h2>
              <div
                className="text-sm font-light font-nunito text-main-whileColor line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.content.slice(1, -1) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingNew;
