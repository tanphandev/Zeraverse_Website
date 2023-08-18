import { CopyIcon } from "@/asset/icons/icons";

function UserStatus() {
  return (
    <div className="relative text-main-whileColor bg-main-grayColor-50 rounded-[20px]">
      <h2 className="text-[28px] font-bold bg-main-pink-ec rounded-t-[20px]  pt-[22px] pb-[14px] pl-4">
        Status
      </h2>
      <ul className="font-lato mt-[34px] mx-[28px]">
        <li className="mb-[33px]">
          <p className="text-[28px] font-medium">77 minutes left</p>
        </li>
        <li className="mb-[33px]">
          <p className="text-[28px] font-medium">Playstreak: 5 days</p>
          <p className="text-base font-bold text-main-whileColor-50">
            Highest streak: 15 days
          </p>
        </li>
        <li className="mb-[33px]">
          <p className="text-[28px] font-medium">12 games played</p>
        </li>
        <li className="mb-[33px]">
          <p className="text-[28px] font-medium">6 games loved</p>
        </li>
        <li className="mb-[33px]">
          <p className="text-[28px] font-medium">Joined 6 years ago</p>
        </li>
      </ul>
      <div className="absolute bottom-0 left-0 right-0 rounded-b-[20px] bg-main-violet-8b py-[15px]">
        <h3 className="inline text-2xl font-semibold font-lato text-main-violet-f5 ml-[28px]">
          Referall link:
        </h3>
        <span className="text-xl font-semibold text-main-pink-fb mx-[7px]">
          @Zeraverse
        </span>
        <CopyIcon className="inline-block" width="17px" height="20px" />
      </div>
    </div>
  );
}

export default UserStatus;
