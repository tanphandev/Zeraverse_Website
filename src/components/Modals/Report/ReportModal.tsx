import XmarkICon from "@/asset/icons/XmarkIcon";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import { useRef, useState } from "react";
import * as gameService from "@/services/game.service";
import { toast } from "react-toastify";
import { HANDLE_STATUS, TOAST_MESSAGE } from "@/utils/constants";
function ReportModal() {
  const [titleReport, setTitleReport] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const reminderRef = useRef<HTMLDivElement>(null);
  const { payload, setStatus } = useModalContext();
  const { closeModalWithAnimation } = useModalContext();
  useOnClickOutside(reminderRef, () => {
    closeModalWithAnimation(150);
  });

  const titleReportList = [
    {
      lable: "Lag",
      value: "Lag",
    },
    {
      lable: "Sound Quality",
      value: "Sound Quality",
    },
    {
      lable: "Functions",
      value: "Functions",
    },
    {
      lable: "Text",
      value: "Text",
    },
    {
      lable: "Animation",
      value: "Animation",
    },
  ];

  const handleCheckboxChange = (value: string) => {
    if (titleReport.includes(value)) {
      setTitleReport(titleReport.filter((item) => item !== value));
    } else {
      setTitleReport([...titleReport, value]);
    }
  };

  const handleSubmit = () => {
    const game_slug = payload?.game_detail?.slug;
    setStatus(HANDLE_STATUS.IN_PROGRESS);
    gameService
      .report_game(game_slug, {
        title: titleReport,
        content: content.trim(),
      })
      .then(({ success, data }) => {
        if (success) {
          setStatus(HANDLE_STATUS.SUCCESS);
          closeModalWithAnimation(150);
          toast.success(TOAST_MESSAGE.REPORT_SUCCESS, {
            position: "top-right",
          });
        }
      })
      .catch((e) => {
        setStatus(HANDLE_STATUS.FAIL);
        toast.error(e?.message);
        throw e;
      });
  };
  return (
    <div className="z-20 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-main-grayColor-50 backdrop-blur-sm">
      <div
        id="modal"
        ref={reminderRef}
        className="add-playlist-modal transition-all absolute w-[540px] pt-5 pb-10 px-[44px] text-main-whileColor font-lato flex flex-col items-center rounded-[30px] border-[3px] bg-[#515151] border-[#9f9f9f] "
      >
        <XmarkICon
          onClick={() => {
            closeModalWithAnimation(150);
          }}
          width="20px"
          height="20px"
          className="absolute top-[20px] right-[30px] p-[3px] cursor-pointer text-main-whileColor hover:text-main-pink-be transition-colors outline-none"
        />
        <div className="font-nunito w-full h-full">
          <h2 className="text-[30px] font-bold mb-3 text-center w-full">
            Report
          </h2>
          <>
            <div className="text-base font-nunito text-main-whileColor ">
              {titleReportList.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    id={item.lable}
                    className="mr-3 w-[18px] h-[18px] cursor-pointer"
                    type="checkbox"
                    checked={titleReport.includes(item.value)}
                    value={item.value}
                    onChange={() => handleCheckboxChange(item.value)}
                  />
                  <label className="cursor-pointer" htmlFor={item.lable}>
                    {item.lable}
                  </label>
                </div>
              ))}
              <label htmlFor="">Else</label>
              <div className="p-3 mb-3 bg-main-whileColor rounded-[20px] ">
                <textarea
                  value={content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setContent(e.target.value);
                  }}
                  spellCheck={false}
                  placeholder="Write something..."
                  className="text-main-blackColor bg-transparent w-full h-[56px] placeholder:text-main-violet-8b outline-none no-scrollbar resize-none"
                />
              </div>
              <div className="w-full text-center">
                <button
                  disabled={titleReport.length === 0 && !content}
                  onClick={(e: any) => {
                    handleSubmit();
                  }}
                  className="text-[18px] py-2 px-9 bg-main-violet-8b rounded-[30px] disabled:opacity-60"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default ReportModal;
