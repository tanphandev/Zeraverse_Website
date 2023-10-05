"use client";
import Tippy from "@tippyjs/react";
import CustomImage from "@/components/Others/CustomImage";
import CoinIcon from "@/asset/icons/CoinIcon";
import AddIcon from "@/asset/icons/AddIcon";
import EditIcon from "@/asset/icons/EditIcon";
import { images } from "@/asset/image/images";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { MODAL_NAME } from "@/utils/constants";
import "tippy.js/dist/tippy.css";
import { IUserInfo } from "@/interface/user/IUserInfo";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContextProvider";
function UserLayout({
  userInfo,
  children,
}: {
  userInfo: IUserInfo;
  children: React.ReactNode;
}) {
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const { userInfo: currentUserInfo } = useAuthContext();
  const { openModal } = useModalContext();
  /* check isCurrentUser */
  useEffect(() => {
    if (!userInfo || !currentUserInfo) return;
    if (userInfo?.id === currentUserInfo?.id) {
      setIsCurrentUser(true);
    }
  }, [userInfo, currentUserInfo]);

  const openEditAvatarModal = () => {
    openModal(MODAL_NAME.EDIT_PROFILE);
  };

  const openEditCoverModal = () => {
    openModal(MODAL_NAME.EDIT_COVER);
  };
  return (
    <div className="w-[314px] sm:w-[424px] md:w-[644px] lg:w-[754px] xl:w-[974px] min-[1316px]:w-[1084px] 2xl:w-[1194px]">
      <div className="relative group rounded-[20px]">
        <Tippy disabled={!isCurrentUser} content="Update cover image">
          <div>
            <CustomImage
              src={userInfo?.cover}
              fallback={images.default_cover_image}
              alt="bacground"
              width={0}
              height={0}
              className="w-full h-[204px] md:h-[350px] rounded-[20px] object-cover"
            />
            {isCurrentUser && (
              <div
                onClick={openEditCoverModal}
                className="transition-all hidden group-hover:flex hover:opacity-100 justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-main-grayColor-40 opacity-0 duration-120 rounded-[20px]"
              >
                <EditIcon width="30px" height="30px" />
              </div>
            )}
          </div>
        </Tippy>
        <Tippy
          disabled={!isCurrentUser}
          content="Update avatar"
          placement="bottom"
        >
          <div className="absolute bottom-0 left-1/2 md:left-11 -translate-x-1/2 translate-y-1/2 w-[204px] h-[204px] md:translate-x-0 rounded-[20px]">
            <CustomImage
              className="w-[204px] h-[204px] object-cover rounded-[20px]"
              src={userInfo?.avatar}
              fallback={images.default_profile_image}
              alt="avatar"
              width={0}
              height={0}
            />
            {isCurrentUser && (
              <div
                onClick={openEditAvatarModal}
                className="transition-all flex hover:opacity-100 justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-main-grayColor-40 opacity-0 duration-120 rounded-[20px]"
              >
                <EditIcon width="30px" height="30px" />
              </div>
            )}
          </div>
        </Tippy>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-[104px] md:mt-[10px] mb-[90px]">
        <div className="font-lato text-main-whileColor md:ml-[264px] w-[306px] text-center md:text-start">
          <Tippy content={userInfo?.username} placement="bottom">
            <h2 className="inline text-[28px] font-semibold">
              {userInfo?.username}
            </h2>
          </Tippy>
          <p className="text-base font-medium font-lato text-main-whileColor">
            {userInfo?.quote}
          </p>
        </div>
        <div className="flex items-center py-1 px-[10px] bg-main-violet-4c rounded-[10px] shadow-[0_4px_5px_rgba(0,0,0,0.6)]">
          <h2 className="text-[24px] font-black font-nunito mr-[5px] text-main-whileColor mb-1">
            {userInfo?.zera}
          </h2>
          <CoinIcon className="mr-[5px]" width="30px" height="32px" />
          <Tippy content="Buy Zera" placement="bottom">
            <AddIcon
              width="29px"
              height="29px"
              className="cursor-pointer outline-none"
            />
          </Tippy>
        </div>
      </div>
      {children}
    </div>
  );
}

export default UserLayout;
