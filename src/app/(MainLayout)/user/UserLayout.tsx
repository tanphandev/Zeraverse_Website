"use client";
import Tippy from "@tippyjs/react";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import CustomImage from "@/components/Others/CustomImage";
import CoinIcon from "@/asset/icons/CoinIcon";
import AddIcon from "@/asset/icons/AddIcon";
import EditIcon from "@/asset/icons/EditIcon";
import { images } from "@/asset/image/images";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { MODAL_NAME } from "@/utils/constants";
import "tippy.js/dist/tippy.css";
function UserLayout({ children }: { children: React.ReactNode }) {
  const { userInfo } = useAuthContext();
  const { openModal } = useModalContext();
  const openEditAvatarModal = () => {
    openModal(MODAL_NAME.EDIT_PROFILE);
  };

  const openEditCoverModal = () => {
    openModal(MODAL_NAME.EDIT_COVER);
  };
  return (
    <div className="flex-1">
      <div className="relative group rounded-[20px]">
        <Tippy content="Update cover image">
          <div>
            <CustomImage
              src={userInfo?.cover}
              style={{
                objectFit: "cover",
              }}
              fallback={images.default_cover_image}
              alt="bacground"
              width={0}
              height={0}
              className="w-full h-[350px] rounded-[20px]"
            />
            <div
              onClick={openEditCoverModal}
              className="transition-all hidden group-hover:flex hover:opacity-100 justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-main-grayColor-40 opacity-0 duration-120 rounded-[20px]"
            >
              <EditIcon width="30px" height="30px" />
            </div>
          </div>
        </Tippy>
        <Tippy content="Update avatar" placement="bottom">
          <div className="absolute bottom-0 left-11 translate-y-1/2 rounded-[20px]">
            <CustomImage
              className="w-[204px] h-[204px] object-cover rounded-[20px]"
              src={userInfo?.avatar}
              fallback={images.default_profile_image}
              alt="avatar"
              width={0}
              height={0}
            />
            <div
              onClick={openEditAvatarModal}
              className="transition-all flex hover:opacity-100 justify-center items-center absolute top-0 right-0 bottom-0 left-0 bg-main-grayColor-40 opacity-0 duration-120 rounded-[20px]"
            >
              <EditIcon width="30px" height="30px" />
            </div>
          </div>
        </Tippy>
      </div>
      <div className="flex justify-between items-center mt-[10px] mb-[90px]">
        <div className="font-lato text-main-whileColor ml-[264px] w-[306px]">
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
          <h2 className="text-[24px] font-black font-nunito mr-[5px] text-main-whileColor">
            {userInfo?.zera}
          </h2>
          <CoinIcon className="mr-[5px]" width="30px" height="32px" />
          <AddIcon width="29px" height="29px" className="cursor-pointer" />
        </div>
      </div>
      {children}
    </div>
  );
}

export default UserLayout;
