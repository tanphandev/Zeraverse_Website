import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import XmarkICon from "@/asset/icons/XmarkIcon";
import { images } from "@/asset/image/images";
import { staticPaths } from "@/utils/paths";

function ReminderModal() {
  const router = useRouter();
  const reminderRef = useRef<HTMLDivElement>(null);
  const { closeModalWithAnimation } = useModalContext();
  useOnClickOutside(reminderRef, () => {
    closeModalWithAnimation(150);
  });

  return (
    <div className="z-10 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-main-whileColor-30">
      <div
        id="modal"
        ref={reminderRef}
        className="add-playlist-modal transition-all absolute w-[540px] h-[300px] px-5 pb-5 text-main-whileColor font-lato flex flex-col items-center rounded-[30px] border-[3px] bg-gradient-to-b from-[#740B99] to-[#2F0652] border-main-pink-f4 "
      >
        <XmarkICon
          onClick={() => {
            closeModalWithAnimation(150);
          }}
          width="20px"
          height="20px"
          className="absolute top-[20px] right-[30px] p-[3px] cursor-pointer text-main-pink-f4 hover:text-main-pink-be transition-colors outline-none"
        />

        <div className="font-lato text-main-whileColor w-full">
          <div className="w-full text-center mt-[20px]">
            <h2 className="font-semibold inline text-center px-[30px] py-[5px] bg-main-pink-83 border-[1px] border-main-pink-ec rounded-[10px] mt-[8px] mb-[24px] shadow-[0px_2px_6px] shadow-[#EC4899]">
              REMINDER
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-center text-[22px] leading-[1.4] font-medium font-nunito text-main-whileColor">
              Please{" "}
              <span
                onClick={() => {
                  closeModalWithAnimation(150);
                  router.push(staticPaths.login);
                }}
                className="text-main-pink-f4 hover:underline cursor-pointer"
              >
                Login
              </span>
              <br />
              or
              <br />
              <span
                onClick={() => {
                  closeModalWithAnimation(150);
                  router.push(staticPaths.register);
                }}
                className="text-main-pink-f4 hover:underline cursor-pointer"
              >
                Register
              </span>{" "}
              to continue
            </div>
            <Image
              src={images.reminder}
              alt="reminder_picture"
              width={180}
              height={90}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReminderModal;
