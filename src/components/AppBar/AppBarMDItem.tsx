"use client";
import LogoIcon from "@/asset/icons/LogoIcon";
import React, { useEffect, useRef, useState } from "react";
import AppBarMD from "../Modals/AppBarMD/AppBarMD";
type Props = {
  isShowAppBarMD: boolean;
  setIsShowAppBarMD: React.Dispatch<React.SetStateAction<boolean>>;
};
function AppBarMDItem({ isShowAppBarMD, setIsShowAppBarMD }: Props) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [spendTimeClick, setSpendTimeClick] = useState<number>(0);
  let isDragging = false;
  let mouseDownTime = useRef(0);
  let mouseUpTime = useRef(0);
  useEffect(() => {
    if (menuRef.current === null) return;
    let offsetX: any, offsetY: any;

    const handleMouseDown = function (e: any) {
      isDragging = true;
      mouseDownTime.current = Date.now();
      // get current position
      offsetX =
        menuRef.current &&
        e.clientX - menuRef.current.getBoundingClientRect().left;
      offsetY =
        menuRef.current &&
        e.clientY - menuRef.current.getBoundingClientRect().top;
    };

    const handleMouseUp = function () {
      isDragging = false;
      mouseUpTime.current = Date.now();
      setSpendTimeClick(mouseUpTime.current - mouseDownTime.current);
      mouseDownTime.current = 0;
      mouseUpTime.current = 0;
    };

    const handleMouseMove = function (e: any) {
      if (!isDragging) return;

      // get mew position
      var left = e.clientX - offsetX;
      var top = e.clientY - offsetY;
      setPosition({
        left,
        top,
      });
    };
    menuRef.current.addEventListener("mousedown", handleMouseDown);
    menuRef.current.addEventListener("mouseup", handleMouseUp);
    menuRef.current.addEventListener("mousemove", handleMouseMove);

    const cleanUp = () => {
      menuRef.current?.removeEventListener("mousedown", handleMouseDown);
      menuRef.current?.removeEventListener("mouseup", handleMouseUp);
      menuRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
    return cleanUp;
  }, [menuRef]);

  return (
    <div>
      <div
        style={{
          left: position?.left,
          top: position?.top,
        }}
        ref={menuRef}
        id="menu"
        className="cursor-move fixed z-10 w-[94px] h-[94px] flex flex-col items-center justify-center rounded-[20px] bg-[#00000080] shadow-[2px_2px_4px_#522658] backdrop-blur-[10px] px-3 pt-3 pb-[6px]"
        onClick={() => {
          if (spendTimeClick < 100) {
            setIsShowAppBarMD(!isShowAppBarMD);
          }
        }}
      >
        <div>
          <LogoIcon width="40px" height="40px" className="mb-1" />
        </div>
        {/* <div className="w-full flex justify-between items-center">
          <button
            onClick={() => {
              setIsShowAppBarMD(!isShowAppBarMD);
            }}
          >
            <MenuIcon width="32px" height="32px" />
          </button>
          <button
            onClick={() => {
              openModal(MODAL_NAME.SEARCH);
            }}
          >
            <SearchIcon width="28px" height="28px" className="text-[#C4B5FD]" />
          </button>
        </div> */}
        {/* <AppBarMD isShow={isShowAppBarMD} setIsShow={setIsShowAppBarMD} /> */}
      </div>
      {isShowAppBarMD && (
        <AppBarMD position={position} setIsShow={setIsShowAppBarMD} />
      )}
    </div>
  );
}

export default AppBarMDItem;
