import { useDispatch } from "react-redux";
import Link from "next/link";
import UserIcon from "@/asset/icons/UserIcon";
import AchievementIcon from "@/asset/icons/AchievementsIcon";
import LogoutIcon from "@/asset/icons/LogoutIcon";
import { signOut } from "next-auth/react";

function UserOption({ hideUserOption }: { hideUserOption: () => void }) {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    signOut();
  };
  return (
    <div className="animate-fadeIn_20 flex flex-col items-start px-4 py-3 rounded-2xl border-[1px] border-main-pink-9d bg-[#0c0020]">
      <Link
        className="flex items-center group hover:text-main-violet-8b px-3 pb-3"
        href={"/user"}
        onClick={hideUserOption}
      >
        <UserIcon
          className="inline text-main-violet-c4 group-hover:text-main-violet-8b  mr-1"
          width="20px"
          height="20px"
        />
        <p className="inline text-base font-nunito font-medium text-main-violet-c4 group-hover:text-main-violet-8b">
          Profile
        </p>
      </Link>
      <Link
        className="flex items-center group hover:text-main-violet-8b border-b-[1px] border-main-violet-6d px-3 pb-3"
        href={"/achievements"}
        onClick={hideUserOption}
      >
        <AchievementIcon
          className="inline text-main-violet-c4 group-hover:text-main-violet-8b mr-1"
          width="20px"
          height="20px"
        />
        <p className="inline text-base font-nunito font-medium text-main-violet-c4 group-hover:text-main-violet-8b">
          Achievements
        </p>
      </Link>
      <button
        onClick={hideUserOption}
        className="flex items-center text-main-whileColor group hover:text-main-violet-8b  mx-3 mt-3"
      >
        <LogoutIcon
          className="inline group-hover:text-main-violet-8b mr-1"
          width="20px"
          height="20px"
        />
        <p
          onClick={handleLogOut}
          className="inline text-base font-nunito font-medium group-hover:text-main-violet-8b"
        >
          Log out
        </p>
      </button>
    </div>
  );
}

export default UserOption;
