import React, { forwardRef, useImperativeHandle, useRef } from "react";
import ArrowLeftVersion2 from "@/asset/icons/ArrowLeftVersion2";
import LogoIcon from "@/asset/icons/LogoIcon";
import { IGameDetail } from "@/interface/games/IGameDetail";
type Props = {
  gameDetail: IGameDetail;
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};
const GameScreen = forwardRef<any, Props>(function Component(
  { gameDetail, isFullScreen, setIsFullScreen },
  ref
) {
  const gamescreenRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    handleZoomInScreen: () => {
      setIsFullScreen(true);
      document.body.style.overflow = "hidden";
      gamescreenRef.current?.classList.add("full-screen");
      if (!document.fullscreenElement) {
        gamescreenRef.current?.requestFullscreen();
      }
    },
  }));

  const handleZoomOutScreen = () => {
    setIsFullScreen(false);
    document.body.style.overflow = "auto";
    gamescreenRef.current?.classList.remove("full-screen");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };
  return (
    <div ref={gamescreenRef} className="w-full h-full relative">
      <iframe src={gameDetail?.play_url} className="w-full h-full"></iframe>
      {isFullScreen && (
        <div
          onClick={handleZoomOutScreen}
          className="flex items-center justify-center w-[62px] h-[40px] absolute top-[10%] left-0 rounded-r-[30px] bg-main-violet-dd shadow-sm shadow-main-violet-a7 cursor-pointer"
        >
          <ArrowLeftVersion2
            width="14px"
            height="14px"
            className="text-main-violet-7c mr-1"
          />
          <LogoIcon width="24px" height="20px" />
        </div>
      )}
    </div>
  );
});

export default GameScreen;
