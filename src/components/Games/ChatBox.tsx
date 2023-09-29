import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import EmojiPicker, { EmojiStyle, EmojiClickData } from "emoji-picker-react";
import * as userService from "@/services/user.service";
import { renderToString } from "react-dom/server";
import SendIcon from "@/asset/icons/SendIcon";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import CustomImage from "../Others/CustomImage";
import { images } from "@/asset/image/images";
import EmojiIcon from "@/asset/icons/EmojiIcon";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import { HANDLE_STATUS, MODAL_NAME, VERIFY_STATUS } from "@/utils/constants";
import { IMessage } from "@/interface/chat/IMessage";
import { IUserInfo } from "@/interface/user/IUserInfo";
import { useSocketContext } from "@/contexts/SocketContextProvider";
import CoinIcon from "@/asset/icons/CoinIcon";
import Link from "next/link";
import { staticPaths } from "@/utils/paths";
import { useModalContext } from "@/contexts/ModalContextProvider";

type Props = {
  roomId: number;
  handleSendMessage: () => void;
};
const ChatBox = forwardRef<any, Props>(function Component(
  { handleSendMessage, roomId },
  ref
) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isOpenEmoji, setIsOpenImoji] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("1f60a");
  const [inputValue, setInputValue] = useState<string>("");
  const [previewUser, setPreviewUser] = useState<any[]>([]);
  const emojiRef = useRef<HTMLInputElement | null>(null);
  const messageSectionRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null);
  const { socket, newMessage, systemMessage, sendMessageStatus } =
    useSocketContext();
  const { openModal, payload, setPayload } = useModalContext();
  const { users }: { users: any[] } = payload ?? {};

  useEffect(() => {
    if (users) {
      setPreviewUser(users?.slice(0, 5));
    }
  }, [users]);

  /* close emoji box when click outside box */
  useOnClickOutside(emojiRef, () => {
    setIsOpenImoji(false);
  });
  const { userInfo, verifyStatus } = useAuthContext();

  useImperativeHandle(ref, () => ({
    inputValue: inputValue,
    resetInputValue: () => {
      setInputValue("");
    },
  }));

  /* handle choose emoji */
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setInputValue(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
    setSelectedEmoji(emojiData.unified);
  }

  /* get user online */
  useEffect(() => {
    if (!socket) return;
    socket.on("roomUsers", (data) => {
      setPayload(data);
    });
  }, [socket]);

  /* get message */
  useEffect(() => {
    if (verifyStatus !== VERIFY_STATUS.SUCCESS || !roomId) return;
    userService
      .get_all_message_of_room(roomId)
      .then(({ success, data }) => {
        if (success) {
          setMessages(data.reverse());
        }
      })
      .catch((e: any) => {
        throw e;
      });
  }, [verifyStatus, roomId]);

  /* update new message */
  useEffect(() => {
    if (sendMessageStatus === HANDLE_STATUS.SUCCESS && newMessage) {
      setMessages((prev: any) => [...prev, newMessage]);
    }
  }, [sendMessageStatus, newMessage]);

  /* update system message */
  useEffect(() => {
    if (systemMessage) {
      setMessages((prev: any) => [...prev, systemMessage]);
    }
  }, [systemMessage]);

  /* scroll to bottom */
  useEffect(() => {
    if (messageSectionRef.current) {
      messageSectionRef.current.scrollTo({
        top: messageRef.current?.offsetHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="row-span-3 col-span-3 ">
      <div className="relative flex flex-col rounded-[10px] w-full h-full bg-[#3e3661]">
        {userInfo && (
          <div
            onClick={() => {
              openModal(MODAL_NAME.ONLINE_GAMER);
            }}
            className="flex justify-between items-center px-[10px] py-1 bg-[#52495D] rounded-[10px] cursor-pointer"
          >
            <div className="flex min-h-[40px] items-center">
              {previewUser.map((item, index) => (
                <CustomImage
                  key={index}
                  src={item?.avatar}
                  fallback={images.default_profile_image}
                  alt="avatar"
                  width={0}
                  height={0}
                  className={`first:m-0 w-8 h-8 mr-[-10px] rounded-full object-cover ${
                    index !== 0 && "translate-x-[-10px]"
                  }`}
                />
              ))}
            </div>
            {users?.length > 100 && (
              <p className="text-xs font-normal text-main-whileColor">
                +100 more
              </p>
            )}
          </div>
        )}
        <div
          ref={messageSectionRef}
          className="message-section h-[212px] flex-auto overflow-y-scroll my-2 mr-[3px] pr-1 pl-[10px]"
        >
          {!!userInfo ? (
            <div ref={messageRef}>
              {messages?.map((message, index) => (
                <MessageItem
                  key={index}
                  message={message}
                  userInfo={userInfo!!}
                  prevMessage={index > 0 ? messages[index - 1] : null}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <p className="text-lg font-medium text-main-whileColor font-nunito mb-4">
                Please login to chat!
              </p>
              <Link
                href={staticPaths.login}
                className="transition-all hover:scale-110 px-4 rounded-[20px] leading-[1.6] bg-gradient-to-br from-[#f265e4] via-[#6664ed] to-[#5200ff] text-main-whileColor"
              >
                Login
              </Link>
            </div>
          )}
        </div>
        <div className="relative rounded-[10px] py-[8px] pl-[20px] pr-[80px] bg-[#52495D] ">
          <input
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="w-full text-base leading-[1.6] border-b font-medium font-lato outline-none text-main-whileColor bg-transparent placeholder:text-main-whileColor-70"
            placeholder="Say something ... "
          />
          <div className="absolute top-1/2 right-5 -translate-y-1/2">
            <EmojiIcon
              className="inline mx-3 cursor-pointer"
              onClick={() => {
                setIsOpenImoji(!isOpenEmoji);
              }}
              width="17px"
              height="17px"
            />
            <SendIcon
              onClick={handleSendMessage}
              className="inline cursor-pointer"
              width="17px"
              height="17px"
            />
          </div>
          {isOpenEmoji && (
            <div className="emoji-box" ref={emojiRef}>
              <EmojiPicker
                onEmojiClick={onClick}
                autoFocusSearch={false}
                emojiStyle={EmojiStyle.NATIVE}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ChatBox;

type MessageItemProps = {
  message: IMessage;
  prevMessage: IMessage | null;
  userInfo: IUserInfo;
};
enum Message_Type {
  SYSTEM_MESSAGE = "SYSTEM_MESSAGE",
  MY_MESSAGE = "MY_MESSAGE",
  USER_MESSAGE = "USER_MESSAGE",
}
const MessageItem = ({ message, prevMessage, userInfo }: MessageItemProps) => {
  const isOfOnePerson = !prevMessage?.is_message
    ? false
    : message?.user_id === prevMessage?.user_id
    ? true
    : false;
  const message_type = (message: IMessage, userInfo: IUserInfo) => {
    if (!message.is_message) return Message_Type.SYSTEM_MESSAGE;
    if (message.is_message && userInfo.id === message.user_id)
      return Message_Type.MY_MESSAGE;
    return Message_Type.USER_MESSAGE;
  };
  const customSystemMessage = (message: IMessage, userInfo: IUserInfo) => {
    if (message?.user_id === userInfo.id) {
      return (
        <p
          className="text-center text-xs py-2 text-main-whileColor"
          dangerouslySetInnerHTML={{
            __html: message?.message
              ?.replaceAll(`Player ${userInfo.username}`, "You")
              .replaceAll(
                "ZERA",
                renderToString(
                  <CoinIcon width="16px" height="16px" className="inline" />
                )
              ),
          }}
        />
      );
    } else {
      return (
        <p
          className="text-center text-xs py-2 text-main-whileColor"
          dangerouslySetInnerHTML={{
            __html: message?.message
              ?.replaceAll(
                `${message?.user?.username}`,
                renderToString(
                  <Link href={staticPaths.home}>
                    <p className="inline text-center text-xs py-2 text-main-whileColor hover:text-main-violet-a7">
                      {message?.user?.username}
                    </p>
                  </Link>
                )
              )
              .replaceAll(
                "ZERA",
                renderToString(
                  <CoinIcon width="16px" height="16px" className="inline" />
                )
              ),
          }}
        />
      );
    }
  };
  const MESSAGE_NODE = {
    [Message_Type.SYSTEM_MESSAGE]: customSystemMessage(message, userInfo),
    [Message_Type.MY_MESSAGE]: (
      <div className="w-full flex justify-end mb-1">
        <div className=" max-w-[75%] text-sm bg-main-pink-ec font-nunito font-normal text-main-whileColor rounded-xl py-1 px-2 break-all">
          {message?.message}
        </div>
      </div>
    ),
    [Message_Type.USER_MESSAGE]: (
      <>
        {/* avatar, username */}
        {!isOfOnePerson && (
          <div>
            <header className="flex items-center gap-2 mb-2">
              <CustomImage
                width={0}
                height={0}
                alt="avatar"
                src={message?.user?.avatar?.url}
                fallback={images.default_profile_image}
                className="w-8 h-8 rounded-full"
              />
              <div className="overflow-hidden whitespace-nowrap w-fit max-w-[240px] break-words text-sm text-[#ffffff80] hover:text-main-violet-8b">
                {message?.user?.username}
              </div>
            </header>
          </div>
        )}
        {/* message */}
        <div className="flex justify-start mb-1">
          <div className="max-w-[75%] text-sm font-nunito font-normal text-main-whileColor bg-main-violet-8b py-1 px-2 rounded-2xl">
            {message?.message}
          </div>
        </div>
      </>
    ),
  };
  return <>{MESSAGE_NODE[message_type(message, userInfo)]}</>;
};
