import Image from "next/image";
import UserPageBackground from "@/asset/image/UserPageBackround.png";
import Avatar from "@/asset/image/profilePicture.png";
import CoinIcon from "@/asset/icons/CoinIcon";
import AddIcon from "@/asset/icons/AddIcon";
import EditIcon from "@/asset/icons/EditIcon";

function UserLayout({ children }: { children: string }) {
  return (
    <div className="flex-1">
      <div className="relative group rounded-[20px]">
        <div>
          <Image
            src={UserPageBackground}
            alt="bacground"
            className="w-full h-[350px] rounded-[20px]"
          />
          <div className="transition-all hidden group-hover:flex hover:opacity-100 justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-main-grayColor-40 opacity-0 duration-120 rounded-[20px]">
            <EditIcon width="30px" height="30px" />
          </div>
        </div>
        <div className="absolute bottom-0 left-11 translate-y-1/2 rounded-[20px]">
          <Image
            className="rounded-[20px]"
            src={Avatar}
            alt="avatar"
            width={204}
            height={204}
          />
          <div className="transition-all flex hover:opacity-100 justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-main-grayColor-40 opacity-0 duration-120 rounded-[20px]">
            <EditIcon width="30px" height="30px" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-[10px] mb-[27px]">
        <div className="font-lato text-main-whileColor ml-[264px] w-[306px]">
          <h2 className="text-[28px] font-semibold">Tanphandev</h2>
          <p className="text-base font-medium ">
            User’s quote:Lorem ipsum dolor sit amet consectetur adipiscing elit
            Ut et.
          </p>
        </div>
        <div className="flex items-center py-1 px-[10px] bg-main-violet-4c rounded-[10px] shadow-[0_4px_5px_rgba(0,0,0,0.6)]">
          <h2 className="text-[24px] font-black font-nunito mr-[5px] text-main-whileColor">
            70
          </h2>
          <CoinIcon className="mr-[5px]" width="30px" height="32px" />
          <AddIcon width="29px" height="29px" />
        </div>
      </div>
      {children}
    </div>
  );
}

export default UserLayout;
