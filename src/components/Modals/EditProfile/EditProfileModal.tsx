"user client";
import XmarkICon from "@/asset/icons/XmarkIcon";
import { useModalContext } from "@/contexts/ModalContextProvider";
import Image from "next/image";
import { useRef, useState } from "react";
import * as userSevice from "@/services/user.service";
import ReactPaginate from "react-paginate";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
import EditTextIcon from "@/asset/icons/EditTextIcon";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import { useDispatch, useSelector } from "react-redux";
import { userAvatarInventorySelector } from "@/store/selectors/user.selector";
import { IAvatarInventory } from "@/interface/user/IAvatarInventory";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import CustomImage from "../../Others/CustomImage";
import { images } from "@/asset/image/images";
import { GLOBAL_MODAL_NAME } from "@/utils/constants";
import { AppDispatch } from "@/store/store";
type Props = {
  itemsPerPage: number;
};
type EditAvatar = {
  avatar: string;
  id: number;
};
function EditProfileModal({ itemsPerPage }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const editAvatarRef = useRef<HTMLDivElement>(null);
  const avatarInventory = useSelector(
    userAvatarInventorySelector
  ) as IAvatarInventory[];
  const { userInfo, setUserInfo } = useAuthContext();
  const [editAvatar, setEditAvatar] = useState<EditAvatar>({
    avatar: userInfo?.avatar!!,
    id: userInfo?.avatar_id!!,
  });
  const [quote, setQuote] = useState<string>(userInfo?.quote!!);
  const { openGlobalModal, closeGlobalModal, closeModalWithAnimation } =
    useModalContext();
  useOnClickOutside(editAvatarRef, () => {
    closeModalWithAnimation(200);
  });
  //set item start
  const [itemOffset, setItemOffset] = useState(0);
  //set item end
  const endOffset = itemOffset + itemsPerPage;
  //current item list to show
  const currentItems = avatarInventory.slice(itemOffset, endOffset);
  //calculate total page
  const pageCount = Math.ceil(avatarInventory.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % avatarInventory.length;
    setItemOffset(newOffset);
  };

  // handle save edit profile event
  const handleSaveProfile = async () => {
    openGlobalModal(GLOBAL_MODAL_NAME.LOADING);
    const editProfile = {
      avatar: editAvatar.id,
      quote,
    };
    try {
      const data = await userSevice.updateUserProfile(editProfile);
    } catch (e: any) {
      throw e;
    }
    const { success, data: newUserInfo } = await userSevice.getUserInfo(
      userInfo?.username!!
    );
    if (success) {
      setUserInfo((prev) => {
        return { ...prev, ...newUserInfo };
      });
    }
    closeGlobalModal();
    closeModalWithAnimation(150);
  };

  return (
    <div className="z-10 fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-main-grayColor-50 backdrop-blur-sm">
      <div
        ref={editAvatarRef}
        id="modal"
        className="w-[400px] sm:w-[540px] md:w-[700px] lg:w-[862px] relative edit-profile-modal transition-all opacity-100 duration-150 text-main-whileColor font-lato text-center rounded-[30px] border-[4px] bg-gradient-to-b from-[#740b99] to-[#2f0652] border-main-pink-f4 pt-[20px]"
      >
        <XmarkICon
          onClick={() => {
            closeModalWithAnimation(150);
          }}
          width="25px"
          height="25px"
          className="absolute top-[20px] right-[20px] sm:top-[35px] sm:right-[52px] p-[3px] cursor-pointer text-main-pink-f4"
        />
        <h2 className="inline texgrid sm:grid-cols-2  md:grid-cols-3 gap-4 mb-[46px] mt-[32px]t-[32px] font-bold font-nunito bg-main-pink-83 rounded-[20px] py-[10px] px-[30px] shadow-md shadow-main-pink-f4">
          Edit Profile
        </h2>
        <div className="mt-[30px] sm:mt-0 h-[530px] overflow-y-scroll no-scrollbar sm:h-auto flex items-center flex-col lg:flex-row px-[10px] sm:px-[20px] md:px-[48px] mb-[46px]">
          <div className="w-[236px] sm:mt-[50px] flex flex-col sm:w-full lg:w-auto lg:pr-[30px] sm:border-b-[3px] lg:border-b-0 lg:border-r-[2px] border-main-pink-f9 sm:pb-[20px] lg:pb-0">
            <div className="sm:flex sm:flex-row sm:justify-evenly sm:items-center lg:block">
              <div className="flex justify-center ">
                <CustomImage
                  className="w-[204px] h-[204px] object-cover rounded-[20px] mb-[18px]"
                  src={editAvatar.avatar}
                  fallback={images.default_profile_image}
                  alt="picture"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
              <div>
                <div className="relative">
                  <textarea
                    disabled
                    value={userInfo?.username ?? ""}
                    rows={1}
                    className="w-full resize-none text-base text-bold font-lato text-main-blackColor outline-none py-1 pl-3 rounded-[20px] no-scrollbar"
                    placeholder="Enter your name..."
                  />
                </div>
                <div className="relative mb-[10px] px-[12px] pt-[12px] pb-[27px] bg-main-whileColor rounded-[20px]">
                  <textarea
                    value={quote ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setQuote(e.target.value);
                    }}
                    className="w-full resize-none h-[150px] text-base font-medium font-lato text-main-blackColor outline-none bg-main-whileColor-30 no-scrollbar"
                    placeholder="User's quote"
                  />
                  <EditTextIcon
                    className="absolute bottom-[9px] right-[9px]"
                    width="18px"
                    height="18px"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handleSaveProfile}
                className=" text-base font-bold font-lato text-main-whileColor px-5 py-[5px] rounded-[40px] bg-gradient-to-br from-[#F265E4] via-[#7270FF] to-[#5200FF] shadow-md shadow-[#F579F8]"
              >
                Save
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between ml-[10px] md:ml-[30px] ">
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-[46px] mt-[32px]">
              {currentItems.map((item, index) => (
                <div key={index} className="flex justify-center">
                  <CustomImage
                    onClick={() => {
                      setEditAvatar({
                        avatar: item.item_info.url,
                        id: item.item_info.id,
                      });
                    }}
                    key={index}
                    src={item?.item_info?.url}
                    fallback={images.default_profile_image}
                    alt="avatar"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={`${
                      item.item_info.id === editAvatar.id
                        ? "border-[4px] border-main-pink-be"
                        : ""
                    } transition-all w-[156px] h-[156px] object-cover rounded-[20px] hover:border-[4px] hover:border-main-pink-be`}
                  />
                </div>
              ))}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel={<ArrowRightIconPagi width="24px" height="24px" />}
              previousLabel={<ArrowLeftIconPagi width="24px" height="24px" />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={4}
              marginPagesDisplayed={1}
              forcePage={0}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              pageClassName="page-item text-[14px] font-bold font-nunito px-[32px]"
              containerClassName="pagination flex justify-center"
              activeClassName="active"
              breakClassName="break"
              nextClassName="pagi-next"
              previousClassName="pagi-previous"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
