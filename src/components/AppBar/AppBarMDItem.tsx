import LogoIcon from "@/asset/icons/LogoIcon";
import MenuIcon from "@/asset/icons/MenuIcon";
import SearchIcon from "@/asset/icons/SearchIcon";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { MODAL_NAME } from "@/utils/constants";
import { staticPaths } from "@/utils/paths";
import Link from "next/link";
import React from "react";
type Props = {
  isShowAppBarMD: boolean;
  setIsShowAppBarMD: React.Dispatch<React.SetStateAction<boolean>>;
};
function AppBarMDItem({ isShowAppBarMD, setIsShowAppBarMD }: Props) {
  const { openModal } = useModalContext();

  return (
    <div className="fixed z-10 w-[94px] h-[94px] flex flex-col items-center justify-center rounded-[20px] bg-[#00000080] shadow-[2px_2px_4px_#522658] backdrop-blur-[10px] px-3 pt-3 pb-[6px]">
      <Link href={staticPaths.home}>
        <LogoIcon width="40px" height="40px" className="mb-1" />
      </Link>
      <div className="w-full flex justify-between items-center">
        <button
          onClick={() => {
            setIsShowAppBarMD(!isShowAppBarMD);
          }}
        >
          <MenuIcon width="32px" height="32px" />
        </button>
        <button
          onClick={() => {
            openModal(MODAL_NAME.SEARCH);
          }}
        >
          <SearchIcon width="28px" height="28px" className="text-[#C4B5FD]" />
        </button>
      </div>
      {/* <AppBarMD isShow={isShowAppBarMD} setIsShow={setIsShowAppBarMD} /> */}
    </div>
  );
}

export default AppBarMDItem;
