import { CoinIcon } from "@/asset/icons/icons";
import Image from "next/image";
import ProfilePicture from "@/asset/image/profilePicture.png";
import Link from "next/link";
function UserBar() {
  return (
    <div className=" flex flex-col items-center w-[204px] rounded-[20px] bg-[rgba(15,9,45,0.7)] mr-4 mb-[3px] ">
      <div className="w-[146px] border-b-[1px] border-main-violet-c4">
        <h2 className="my-[10px] text-base font-black font-nunito text-main-whileColor text-center">
          4070{" "}
          <CoinIcon className="ml-2 inline-block" width="20px" height="20px" />
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 my-[10px] mx-[14px]">
        <div>
          <Image
            className="rounded-[10px] border border-main-pink-be"
            src={ProfilePicture}
            alt="Picture"
          />
          <p className="text-[11px] font-black font-nunito text-center text-main-whileColor">
            70
            <CoinIcon
              className="inline-block ml-2"
              width="14px"
              height="14px"
            />
          </p>
        </div>
        <div>
          <Image
            className="rounded-[10px] border border-main-pink-be"
            src={ProfilePicture}
            alt="Picture"
          />
          <p className="text-[11px] font-black font-nunito text-center text-main-whileColor">
            70
            <CoinIcon
              className="inline-block ml-2"
              width="14px"
              height="14px"
            />
          </p>
        </div>
        <div>
          <Image
            className="rounded-[10px] border border-main-pink-be"
            src={ProfilePicture}
            alt="Picture"
          />
          <p className="text-[11px] font-black font-nunito text-center text-main-whileColor">
            70
            <CoinIcon
              className="inline-block ml-2"
              width="14px"
              height="14px"
            />
          </p>
        </div>
        <div>
          <Image
            className="rounded-[10px] border border-main-pink-be"
            src={ProfilePicture}
            alt="Picture"
          />
          <p className="text-[11px] font-black font-nunito text-center text-main-whileColor">
            70
            <CoinIcon
              className="inline-block ml-2"
              width="14px"
              height="14px"
            />
          </p>
        </div>
        <div>
          <Image
            className="rounded-[10px] border border-main-pink-be"
            src={ProfilePicture}
            alt="Picture"
          />
          <p className="text-[11px] font-black font-nunito text-center text-main-whileColor">
            70
            <CoinIcon
              className="inline-block ml-2"
              width="14px"
              height="14px"
            />
          </p>
        </div>
        <div>
          <Image
            className="rounded-[10px] border border-main-pink-be"
            src={ProfilePicture}
            alt="Picture"
          />
          <p className="text-[11px] font-black font-nunito text-center text-main-whileColor">
            70
            <CoinIcon
              className="inline-block ml-2"
              width="14px"
              height="14px"
            />
          </p>
        </div>
      </div>
      <Link href={"/simple-shop"}>
        <button className=" py-[3px] px-[30px] bg-main-pink-be rounded-[10px] mb-[14px]">
          <p className="items-center mb-[2px] text-xs text-center font-bold text-main-whileColor leading-[1.6]">
            Shop
          </p>
        </button>
      </Link>
    </div>
  );
}

export default UserBar;
