"use client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as helper from "@/utils/helper";
import { MODAL_NAME, MODAL_STATUS } from "@/utils/constants";
import SearchModal from "@/components/Modals/SearchModal";
import BuyShopModal from "@/components/Modals/BuyShopModal";
import GlobalLoading from "@/components/Modals/GlobalLoading";

type ModalContextType = {
  modal: MODAL_NAME;
  setModal: React.Dispatch<React.SetStateAction<MODAL_NAME>>;
  openModal: (modalName: MODAL_NAME) => void;
  closeModal: () => void;
  closeModalWithAnimation: (duration: number) => void;
  payload: any;
  setPayload: React.Dispatch<React.SetStateAction<any>>;
  statusModal: MODAL_STATUS;
  setStatusModal: React.Dispatch<React.SetStateAction<MODAL_STATUS>>;
};

const ModalContext = createContext(null as any);

const Modal: any = {
  [MODAL_NAME.SEARCH]: <SearchModal />,
  [MODAL_NAME.LOADING]: <GlobalLoading />,
  [MODAL_NAME.BUY_AVATAR]: <BuyShopModal />,
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
  const [modal, setModal] = useState<MODAL_NAME>(MODAL_NAME.NONE);
  const [statusModal, setStatusModal] = useState<MODAL_STATUS>(
    MODAL_STATUS.CLOSE
  );

  const closeModalWithAnimation = useCallback((duration: number = 300) => {
    document.getElementById("modal")?.classList.add("hide-modal");
    helper.sleep(duration).then(() => {
      openModal(MODAL_NAME.NONE);
    });
  }, []);

  const closeModal = useCallback(() => {
    setModal(MODAL_NAME.NONE);
  }, []);

  const openModal = useCallback((modalName: MODAL_NAME) => {
    setModal(modalName);
  }, []);

  const modalProvider: ModalContextType = useMemo(
    () => ({
      modal,
      setModal,
      openModal,
      closeModal,
      closeModalWithAnimation,
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
      closeModalWithAnimation,
      payload,
      setPayload,
      statusModal,
      setStatusModal,
    ]
  );

  return (
    <ModalContext.Provider value={modalProvider}>
      {modal === "NONE" ? null : Modal[modal]}
      {children}
    </ModalContext.Provider>
  );
};
