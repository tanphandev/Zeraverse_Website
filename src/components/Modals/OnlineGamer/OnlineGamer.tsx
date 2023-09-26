import { useModalContext } from "@/contexts/ModalContextProvider";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import { useRef } from "react";
import Gamer from "./Gamer";

function OnlineGamerModal() {
  const onlineGamerModalRef = useRef<HTMLDivElement | null>(null);
  const { closeModalWithAnimation, payload } = useModalContext();
  const { room_id, users }: { room_id: number; users: any[] } = payload;
  useOnClickOutside(onlineGamerModalRef, () => {
    closeModalWithAnimation(150);
  });
  return (
    <div className="z-20 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-main-whileColor-30">
      <div
        id="modal"
        ref={onlineGamerModalRef}
        className="online-gamer-modal transition-all w-[392px] h-[453px] bg-gradient-to-b from-[#C4B5FD] via-[#979BFF] to-[#EF36C6] rounded-[20px] p-[5px]"
      >
        <div className="relative w-full h-full bg-gradient-to-b from-[#FD84FF] to-[#7A12FF] rounded-[20px]">
          <h1 className="online-game-title w-[218px] text-[18px] font-bold font-lato text-main-whileColor text-center py-4 rounded-[14px] bg-main-pink-be shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.25)]">
            All online gamers
          </h1>
          <div className="w-full h-full pt-[34px] pb-[24px] pl-[26px] pr-[2px]">
            <div className="online-gamers-scroll overflow-y-scroll w-full h-full">
              {users?.map((item, index) => (
                <Gamer key={index} gamer={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlineGamerModal;
