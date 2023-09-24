import SendIcon from "@/asset/icons/SendIcon";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import Image from "next/image";
import { forwardRef, useImperativeHandle, useState } from "react";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";

type Props = {
  handleSendMessage: () => void;
};
const ChatBox = forwardRef<any, Props>(function Component(
  { handleSendMessage },
  ref
) {
  const [inputValue, setInputValue] = useState<string>("");
  const { userInfo } = useAuthContext();
  useImperativeHandle(ref, () => ({
    getMessage: inputValue,
  }));

  return (
    <div className="row-span-3 col-span-3 ">
      <div className="relative flex flex-col rounded-[10px] w-full h-full bg-[#3e3661]">
        <div className="flex justify-between items-center px-[10px] py-1 bg-[#52495D] rounded-[10px]">
          <CustomImage
            src={userInfo?.avatar!!}
            fallback={images.default_profile_image}
            alt="avatar"
            width={24}
            height={24}
            className="rounded-[50%]"
          />
          <p className="text-xs font-normal text-main-whileColor pb-[2px] ">
            +100 more
          </p>
        </div>
        <div className="flex-1 pb-[44px] text-main-whileColor">Message</div>
        <div className="absolute bottom-0 left-0 right-0 rounded-[10px] bg-[#52495D] ">
          <input
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
            }}
            className="w-full text-sm font-medium font-lato outline-none py-[10px] pl-[20px] pr-[40px] text-main-whileColor bg-transparent placeholder:text-main-whileColor-70"
            placeholder="Say something ... "
          />
          <SendIcon
            onClick={handleSendMessage}
            className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer"
            width="14px"
            height="14px"
          />
        </div>
      </div>
    </div>
  );
});

export default ChatBox;
