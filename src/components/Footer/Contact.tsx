"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import DiscordIcon from "@/asset/icons/DiscordIcon";
import FacebookIcon from "@/asset/icons/FacebookIcon";
import TelegramIcon from "@/asset/icons/TelegramIcon";
import TwitterIcon from "@/asset/icons/TwitterIcon";
import * as userService from "@/services/user.service";
import { IContact } from "@/interface/user/IContact";
import { contactSelector } from "@/store/selectors/userSelector";

function Contact() {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector<RootState>(contactSelector) as IContact[];

  /* get contact */
  useEffect(() => {
    !contacts && dispatch(userService.getContact({}));
  }, [contacts]);
  return (
    <div className="flex">
      {contacts?.map((contact, index) => {
        let SocialIcon: JSX.Element | null = null;
        if (contact.network === "Facebook") {
          SocialIcon = <FacebookIcon width="30px" height="30px" />;
        } else if (contact.network === "Twitter") {
          SocialIcon = <TwitterIcon width="30px" height="30px" />;
        } else if (contact.network === "Telegram") {
          SocialIcon = <TelegramIcon width="30px" height="30px" />;
        } else if (contact.network === "Discord") {
          SocialIcon = <DiscordIcon width="30px" height="30px" />;
        }
        return (
          <Link key={index} href={contact.link}>
            <div className="mr-[19px] cursor-pointer">{SocialIcon}</div>
          </Link>
        );
      })}
    </div>
  );
}

export default Contact;
