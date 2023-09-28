"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { InlineShareButtons } from "sharethis-reactjs";

function SocialShare() {
  const pathName = usePathname();
  const [url, setUrl] = useState("");
  // change url when router change
  useEffect(() => {
    setUrl(`${window.location.href}${pathName}`);
  }, [pathName]);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className=" text-base font-bold leading-[1.6] font-lato text-main-whileColor mb-[3px]">
        Share
      </h2>
      <InlineShareButtons
        config={{
          alignment: "center",
          color: "social",
          enabled: true,
          font_size: 16,
          labels: "cta",
          language: "en",
          networks: [
            "facebook",
            "messenger",
            "linkedin",
            "twitter",
            "whatsapp",
          ],
          padding: 12,
          radius: 4,
          show_total: false,
          size: 40,

          url: "https://www.vietnamworks.com/company/NamLong?utm_campaign_navi=459535&utm_medium_navi=viplogo&utm_source_navi=vnw_homepage&utm_term_navi=new-homepage",
          image: "https://bit.ly/2CMhCMC",
          description: "custom text",
          title: "custom title",
          message: "custom email text",
          subject: "custom email subject",
          username: "custom twitter handle",
        }}
      />
    </div>
  );
}

export default SocialShare;
