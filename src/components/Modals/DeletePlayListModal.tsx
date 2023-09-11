import { useModalContext } from "@/contexts/ModalContextProvider";
import {
  GLOBAL_MODAL_NAME,
  HANDLE_STATUS,
  MODAL_NAME,
  TOAST_MESSAGE,
} from "@/utils/constants";
import * as userService from "@/services/user.service";
import { toast } from "react-toastify";

function DeletePlayListModal({ title }: { title?: string }) {
  const {
    openGlobalModal,
    closeGlobalModalWithAnimation,
    payload,
    setStatus,
    closeModalWithAnimation,
  } = useModalContext();
  const onClickYes = () => {
    switch (payload.type) {
      case MODAL_NAME.DELETE_PLAYLIST: {
        openGlobalModal(GLOBAL_MODAL_NAME.LOADING);
        userService
          .deleteUserPlayListGame(payload?.playListId)
          .then(() => {
            setStatus(HANDLE_STATUS.SUCCESS);
            closeGlobalModalWithAnimation(150);
            closeModalWithAnimation(150);
            toast.success(TOAST_MESSAGE.DELETE_PLAYLIST_SUCCESS);
          })
          .catch(() => {
            setStatus(HANDLE_STATUS.FAIL);
            closeGlobalModalWithAnimation(150);
            closeModalWithAnimation(150);
            toast.error(TOAST_MESSAGE.DELETE_PLAYLIST_FAIL);
          });
        break;
      }
      case MODAL_NAME.DELETE_ITEM_OF_PLAYLIST: {
        break;
      }
      default: {
        return;
      }
    }
  };
  //handle Click No
  const onClickNo = () => {
    closeModalWithAnimation(150);
  };
  return (
    <div className="z-20 fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-main-whileColor-40">
      <div
        id="modal"
        className="delete-playlist-modal transition-all opacity-100 duration-150 w-[320px] text-main-whileColor font-lato flex flex-col items-center py-[10px] rounded-[10px] border-[3px] bg-main-pink-83 border-main-pink-ec "
      >
        <h2 className="font-bold mb-[10px]">{title}</h2>
        <p className="text-base font-bold mb-[17px]">Are you sure ?</p>
        <div className="flex">
          <button
            className="text-sm font-medium py-[5px] px-[25px] rounded-[30px] border-[1px] border-main-violet-f5 bg-main-pink-9d mr-[21px] hover:bg-main-violet-6d"
            onClick={onClickNo}
          >
            No
          </button>
          <button
            className="text-sm font-medium py-[5px] px-[25px] rounded-[30px] border-[1px] border-main-violet-f5 bg-main-pink-9d hover:bg-main-violet-6d"
            onClick={onClickYes}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePlayListModal;
