import Image from "next/image";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { userCoverInventorySelector } from "@/store/selectors/userSelector";
import * as userService from "@/services/user.service";
import { ICoverInventory } from "@/interface/user/ICoverInventory";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import ArrowRightIconPagi from "@/asset/icons/ArrowRightIconPagi";
import ArrowLeftIconPagi from "@/asset/icons/ArrowLeftIconPagi";
import XmarkICon from "@/asset/icons/XmarkIcon";
import { GLOBAL_MODAL_NAME } from "@/utils/constants";
import NoData from "../../Others/NoData";
type Props = {
  itemsPerPage: number;
};
type EditCover = {
  id: number;
  cover: string;
};
function EditCoverModal({ itemsPerPage }: Props) {
  const { userInfo, setUserInfo } = useAuthContext();
  const [editCover, setEditCover] = useState<EditCover>({
    id: userInfo?.cover_id,
    cover: userInfo?.cover,
  });
  const coverInventory = useSelector(
    userCoverInventorySelector
  ) as ICoverInventory[];
  const editCoverModalRef = useRef<HTMLDivElement>(null);
  const { openGlobalModal, closeGlobalModal, closeModalWithAnimation } =
    useModalContext();
  useOnClickOutside(editCoverModalRef, () => {
    closeModalWithAnimation(150);
  });
  //set item start
  const [itemOffset, setItemOffset] = useState(0);
  //set item end
  const endOffset = itemOffset + itemsPerPage;
  //current item list to show
  const currentItems = coverInventory.slice(itemOffset, endOffset);
  //calculate total page
  const pageCount = Math.ceil(coverInventory.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % coverInventory.length;
    setItemOffset(newOffset);
  };
  const handleEditCover = async (item: ICoverInventory) => {
    openGlobalModal(GLOBAL_MODAL_NAME.LOADING);
    const newEditCover = {
      id: item.item_info.id,
      cover: item.item_info.url,
    };
    setEditCover(newEditCover);
    try {
      const { success } = await userService.updateCoverProfle({
        cover: newEditCover.id,
      });
      if (success) {
        const { success: successGetUserInfo, data: newUserInfo } =
          await userService.getUserInfo(userInfo?.username!!);
        if (successGetUserInfo) {
          setUserInfo((prev) => {
            return { ...prev, ...newUserInfo };
          });
        }
      }
      closeGlobalModal();
      closeModalWithAnimation(150);
    } catch (e: any) {
      throw e;
    }
  };
  return (
    <div className="z-10 fixed  flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-main-grayColor-50 backdrop-blur-sm">
      <div
        ref={editCoverModalRef}
        id="modal"
        className="relative edit-cover-modal transition-all opacity-100 duration-150 min-w-[540px] text-main-whileColor font-lato text-center rounded-[30px] border-[4px] bg-gradient-to-b from-[#740b99] to-[#2f0652] border-main-pink-f4 pt-[20px]"
      >
        <XmarkICon
          onClick={() => {
            closeModalWithAnimation(150);
          }}
          width="25px"
          height="25px"
          className="absolute top-[35px] right-[52px] p-[3px] cursor-pointer text-main-pink-f4"
        />
        <h2 className="inline text-[32px] font-bold font-nunito bg-main-pink-83 rounded-[20px] py-[10px] px-[30px] shadow-md shadow-main-pink-f4">
          Edit Cover Page
        </h2>
        <div className="w-[862px] px-[48px] py-[40px]">
          {coverInventory.length === 0 ? (
            <NoData />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-[29px]">
                {currentItems.map((item, index) => (
                  <Image
                    onClick={() => {
                      handleEditCover(item);
                    }}
                    key={index}
                    src={item.item_info.url}
                    alt="cover"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={`${
                      item.item_info.id === editCover.id
                        ? "border-[4px] border-main-pink-be"
                        : ""
                    } w-[424px] max-h-[204px] rounded-[30px] hover:border-[4px] hover:border-main-pink-be`}
                  />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditCoverModal;
