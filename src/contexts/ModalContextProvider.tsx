"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { MODAL_NAME, MODAL_STATUS } from "@/utils/constants";
import SearchModal from "@/components/Modals/SearchModal";

type ModalContextType = {
  modal: MODAL_NAME;
  setModal: React.Dispatch<React.SetStateAction<MODAL_NAME>>;
  openModal: (modalName: MODAL_NAME) => void;
  closeModal: () => void;
  payload: any;
  setPayload: React.Dispatch<React.SetStateAction<any>>;
  statusModal: MODAL_STATUS;
  setStatusModal: React.Dispatch<React.SetStateAction<MODAL_STATUS>>;
};

const ModalContext = createContext(null as any);

const Modal: any = {
  [MODAL_NAME.SEARCH]: <SearchModal />,
  //   [MODAL_NAME.EDIT_PROFILE]: <ModalEditProfile />,
  //   [MODAL_NAME.DAILY_BONUS]: <ModalDailyBonus />,
  //   [MODAL_NAME.BUY]: <ModalBuy />,
  //   [MODAL_NAME.PLAYLIST]: <ModalPlaylist />,
  //   [MODAL_NAME.DELETE_PLAYLIST]: <ModalDeletePlaylist />,
  //   [MODAL_NAME.CONFIRM]: <ModalConfirm />,
  //   [MODAL_NAME.REPORT]: <ModalReport />,
  //   [MODAL_NAME.BUY_TIME]: <ModalBuyTime />,
  //   [MODAL_NAME.USERS_ONLINE_GAME]: <ModalUsersOnline />,
  //   [MODAL_NAME.RESET_LOGIN]: <ModalResetLogin />,
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
  const [modal, setModal] = useState<MODAL_NAME>(MODAL_NAME.SEARCH);
  const [statusModal, setStatusModal] = useState<MODAL_STATUS>(
    MODAL_STATUS.CLOSE
  );

  const closeModal = useCallback(() => {
    setModal(MODAL_NAME.NONE);
  }, []);

  const closeModalWithAnimation = (duration = 150) => {
    // document.getElementById("modal").classList?.remove("animation-open-modal");
    // sleep(duration).then(() => openModal(MODAL_NAME.NONE));
  };

  const openModal = useCallback((modalName: MODAL_NAME) => {
    setModal(modalName);
  }, []);

  const modalProvider: ModalContextType = useMemo(
    () => ({
      modal,
      setModal,
      openModal,
      closeModal,
      payload,
      setPayload,
      statusModal,
      setStatusModal,
    }),
    [
      modal,
      setModal,
      openModal,
      closeModal,
      payload,
      setPayload,
      statusModal,
      setStatusModal,
    ]
  );

  return (
    <ModalContext.Provider value={{ modalProvider }}>
      {modal === "NONE" ? null : Modal[modal]}
      {children}
    </ModalContext.Provider>
  );
};
