import Image from "next/image";
import fame1 from "@/asset/image/fame1.png";
import fame2 from "@/asset/image/fame2.png";
import fame3 from "@/asset/image/fame3.png";
import top1 from "@/asset/image/fame1-1.png";
import top2 from "@/asset/image/fame2-2.png";
import top3 from "@/asset/image/fame3-3.png";

import Avatar from "@/asset/image/profilePicture.png";
import RateTable from "./RateTable";
import CoinIcon from "@/asset/icons/CoinIcon";
function HallOfFameZera() {
  const rateList = [
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
    { name: "Name", place: "4", quantity: "1000" },
  ];
  return (
    <div className="px-[80px] pb-[40px] border-[5px] border-main-pink-f9 rounded-[30px]">
      <div className="flex justify-center items-end mt-[206px] mb-[22px]">
        <div>
          <div className="relative mx-[15px]">
            <Image src={fame2} alt="fame2" className="w-[233px] --[158px]" />
            <div className="flex flex-col items-center absolute bottom-[54px] left-1/2 -translate-x-1/2">
              <Image
                className="mb-[10px] rounded-[10px]"
                src={Avatar}
                alt="picture"
                width={94}
                height={94}
              />
              <p className="text-base font-medium font-lato text-main-whileColor mb-[14px]">
                LamPhan
              </p>
              <Image
                className="mb-[18px]"
                src={top2}
                alt="top1"
                width={50}
                height={50}
              />
              <div className="flex items-center">
                <CoinIcon width="30px" height="30px" className="mr-2" />
                <div>
                  <p className="text-[28px] font-lato leading-[1]">9000</p>
                  <p className="text-sm font-medium font-lato">Zera</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mx-[15px] mb-[44px]">
            <Image src={fame1} alt="fame1" className="w-[233px] --[158px]" />
            <div className="flex flex-col items-center absolute bottom-[54px] left-1/2 -translate-x-1/2">
              <Image
                className="mb-[10px] rounded-[10px]"
                src={Avatar}
                alt="picture"
                width={94}
                height={94}
              />
              <p className="text-base font-medium font-lato text-main-whileColor mb-[14px]">
                LamPhan
              </p>
              <Image
                className="mb-[18px]"
                src={top1}
                alt="top1"
                width={50}
                height={50}
              />
              <div className="flex items-center">
                <CoinIcon width="30px" height="30px" className="mr-2" />
                <div>
                  <p className="text-[28px] font-lato leading-[1]">9000</p>
                  <p className="text-sm font-medium font-lato">Zera</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mx-[15px]">
            <Image src={fame3} alt="fame3" className="w-[233px] --[158px]" />
            <div className="flex flex-col items-center absolute bottom-[54px] left-1/2 -translate-x-1/2">
              <Image
                className="mb-[10px] rounded-[10px]"
                src={Avatar}
                alt="picture"
                width={94}
                height={94}
              />
              <p className="text-base font-medium font-lato text-main-whileColor mb-[14px]">
                LamPhan
              </p>
              <Image
                className="mb-[18px]"
                src={top3}
                alt="top1"
                width={50}
                height={50}
              />
              <div className="flex items-center">
                <CoinIcon width="30px" height="30px" className="mr-2" />
                <div>
                  <p className="text-[28px] font-lato leading-[1]">9000</p>
                  <p className="text-sm font-medium font-lato">Zera</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RateTable quanityName="ZERA" list={rateList} itemsPerPage={10} />
    </div>
  );
}

export default HallOfFameZera;
