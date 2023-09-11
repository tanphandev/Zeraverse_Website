"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as helper from "@/utils/helper";
import {
  GLOBAL_MODAL_NAME,
  HANDLE_STATUS,
  MODAL_NAME,
  MODAL_STATUS,
} from "@/utils/constants";
import SearchModal from "@/components/Modals/SearchModal";
import BuyShopModal from "@/components/Modals/BuyShopModal";
import GlobalLoading from "@/components/Modals/GlobalLoading";
import EditProfileModal from "@/components/Modals/EditProfileModal";
import EditCoverModal from "@/components/Modals/EditCoverModal";
import DeletePlayListModal from "@/components/Modals/DeletePlayListModal";

type ModalContextType = {
  globalModal: GLOBAL_MODAL_NAME;
  setGlobalModal: React.Dispatch<React.SetStateAction<GLOBAL_MODAL_NAME>>;
  openGlobalModal: (modalname: GLOBAL_MODAL_NAME) => void;
  closeGlobalModal: () => void;
  closeGlobalModalWithAnimation: (duration: number) => void;
  modal: MODAL_NAME;
  setModal: React.Dispatch<React.SetStateAction<MODAL_NAME>>;
  openModal: (modalName: MODAL_NAME) => void;
  closeModal: () => void;
  closeModalWithAnimation: (duration: number) => void;
  payload: any;
  setPayload: React.Dispatch<React.SetStateAction<any>>;
  status: HANDLE_STATUS;
  setStatus: React.Dispatch<React.SetStateAction<HANDLE_STATUS>>;
};

const ModalContext = createContext(null as any);

const GlobalModal: any = {
  [GLOBAL_MODAL_NAME.LOADING]: <GlobalLoading />,
};

const Modal: any = {
  [MODAL_NAME.SEARCH]: <SearchModal />,
  [MODAL_NAME.BUY_AVATAR]: <BuyShopModal />,
  [MODAL_NAME.EDIT_PROFILE]: <EditProfileModal itemsPerPage={6} />,
  [MODAL_NAME.EDIT_COVER]: <EditCoverModal itemsPerPage={4} />,
  [MODAL_NAME.DELETE_PLAYLIST]: <DeletePlayListModal title="Delete Playlist" />,
  [MODAL_NAME.DELETE_ITEM_OF_PLAYLIST]: (
    <DeletePlayListModal title="Delete This Game" />
  ),
};

export const useModalContext = () => {
  const modalContext = useContext(ModalContext) as ModalContextType;
  if (!modalContext) {
    throw new Error(
      "useModalContext() can only be used inside of <ModalContextProvider />, " +
        "please declare it at a higher level."
    );
  }
  return useMemo(() => ({ ...modalContext }), [modalContext]);
};

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [payload, setPayload] = useState<any>();
  const [globalModal, setGlobalModal] = useState<GLOBAL_MODAL_NAME>(
    GLOBAL_MODAL_NAME.NONE
  );
  const [modal, setModal] = useState<MODAL_NAME>(MODAL_NAME.NONE);
  const [status, setStatus] = useState<HANDLE_STATUS>(HANDLE_STATUS.NOT_START);

  // close Global modal with animation
  const closeGlobalModalWithAnimation = useCallback(
    (duration: number = 300) => {
      document.getElementById("global-modal")?.classList.add("hide-modal");
      helper.sleep(duration).then(() => {
        openGlobalModal(GLOBAL_MODAL_NAME.NONE);
      });
    },
    []
  );

  // close global modal
  const closeGlobalModal = useCallback(() => {
    setGlobalModal(GLOBAL_MODAL_NAME.NONE);
  }, []);

  // open global modal
  const openGlobalModal = useCallback((modalName: GLOBAL_MODAL_NAME) => {
    setGlobalModal(modalName);
  }, []);

  // close modal with animation
  const closeModalWithAnimation = useCallback((duration: number = 300) => {
    document.getElementById("modal")?.classList.add("hide-modal");
    helper.sleep(duration).then(() => {
      openModal(MODAL_NAME.NONE);
    });
  }, []);

  // close modal
  const closeModal = useCallback(() => {
    setModal(MODAL_NAME.NONE);
  }, []);

  // open modal
  const openModal = useCallback((modalName: MODAL_NAME) => {
    setModal(modalName);
  }, []);

  const modalProvider: ModalContextType = useMemo(
    () => ({
      globalModal,
      setGlobalModal,
      openGlobalModal,
      closeGlobalModal,
      closeGlobalModalWithAnimation,
      modal,
      setModal,
      openModal,
      closeModal,
      closeModalWithAnimation,
      payload,
      setPayload,
      status,
      setStatus,
    }),
    [
      globalModal,
      setGlobalModal,
      openGlobalModal,
      closeGlobalModal,
      closeGlobalModalWithAnimation,
      modal,
      setModal,
      openModal,
      closeModal,
      closeModalWithAnimation,
      payload,
      setPayload,
      status,
      setStatus,
    ]
  );

  return (
    <ModalContext.Provider value={modalProvider}>
      {globalModal === GLOBAL_MODAL_NAME.NONE ? null : GlobalModal[globalModal]}
      {modal === MODAL_NAME.NONE ? null : Modal[modal]}
      {children}
    </ModalContext.Provider>
  );
};
