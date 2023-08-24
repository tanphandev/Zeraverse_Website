"use client";
import { useState } from "react";
import Image from "next/image";
import { news } from "@/dataFetch/dataFetch";
import ArrowRightIcon from "@/asset/icons/ArrowRightIcon";
function ArticleCarousel() {
  const [initComplete, setInitComplete] = useState(false);
  console.log("initComplete", initComplete);
  const init = async () => {
    const { Carousel, initTE } = await import("tw-elements");
    initTE({ Carousel });
    setInitComplete(true);
  };
  init();
  return (
    <div className="pr-[28px]">
      {/* Carousel */}
      <div
        id="carouselIndicators"
        className="relative mb-[30px]"
        data-te-carousel-init
        data-te-ride="carousel"
        data-te-interval="4000"
      >
        {/* Carousel indicators */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
          data-te-carousel-indicators
        >
          {news.map((item, index) => (
            <button
              key={index}
              type="button"
              data-te-target="#carouselIndicators"
              data-te-slide-to={index}
              {...(index === 0 ? { "data-te-carousel-active": true } : {})}
              className="mx-[3px] slide-control opacity-50 box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-clip-padding p-0 -indent-[999px] transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
              aria-current="true"
              aria-label={`Slide ${index}`}
            ></button>
          ))}
        </div>
        {/* Carousel items */}
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {news.map((item, index) => (
            <div
              key={index}
              className={`relative ${
                index === 0 ? "" : "hidden"
              } float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none rounded-[5px]`}
              data-te-carousel-item
              {...(index === 0 ? { "data-te-carousel-active": true } : {})}
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt="image"
                  className="w-full max-h-[537px] rounded-[5px]"
                />
                <div className="absolute flex flex-col justify-center top-0 right-0 bg-main-grayColor-70 rounded-tr-[5px] rounded-br-[5px] h-full w-[380px] text-main-whileColor">
                  <div className="px-[26px]">
                    <p className="inline-block text-[10px] font-normal font-nunito text-main-blackColor leading-[1.4] py-[6px] px-[10px] bg-main-whileColor rounded-[10px] mb-[6px]">
                      Technology
                    </p>
                    <h2 className="text-[32px] font-bold font-lato mb-[10px]">
                      The unseen of spending three years at Pixelgrade
                    </h2>
                    <p className="text-xs font-light font-nunito mb-[26px] text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua...
                    </p>
                    <p className="font-light font-nunito mb-[43px]">1 min</p>
                    <button className=" flex items-center px-[10px] py-[6px] bg-main-pink-be rounded-[2px]">
                      <p className="inline text-xs font-normal font-nunito">
                        Read More
                      </p>
                      <ArrowRightIcon
                        className="inline"
                        width="20px"
                        height="20px"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Carousel controls - prev item */}
        <button
          className="absolute bottom-0 left-0 top-0 z-[1] flex w-[28px] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none hover:bg-main-grayColor-20"
          type="button"
          data-te-target="#carouselIndicators"
          data-te-slide="prev"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Previous
          </span>
        </button>
        <button
          className="absolute bottom-0 right-0 top-0 z-[1] flex w-[28px] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-no hover:bg-main-grayColor-20"
          type="button"
          data-te-target="#carouselIndicators"
          data-te-slide="next"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
      </div>
    </div>
  );
}

export default ArticleCarousel;
