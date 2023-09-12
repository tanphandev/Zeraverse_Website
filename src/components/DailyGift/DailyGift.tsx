"use client";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { MODAL_NAME } from "@/utils/constants";
import { useEffect } from "react";

function DailyGift() {
  const { userInfo } = useAuthContext();
  const { openModal } = useModalContext();
  useEffect(() => {
    if (userInfo && !userInfo?.isClaimDailyBonus) {
      openModal(MODAL_NAME.CLAIM_DAILY_BONUS);
    }
  }, [userInfo]);
  return <></>;
}

export default DailyGift;
