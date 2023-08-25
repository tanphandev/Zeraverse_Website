import Image from "next/image";
import Logo from "@/asset/image/Logo.png";
import Link from "next/link";
import RedditIcon from "@/asset/icons/RedditIcon";
import FacebookIcon from "@/asset/icons/FacebookIcon";
import TwitterIcon from "@/asset/icons/TwitterIcon";
import TelegramIcon from "@/asset/icons/TelegramIcon";
import DiscordIcon from "@/asset/icons/DiscordIcon";
function Footer() {
  return (
    <div className="bg-frameFooter bg-center bg-cover w-full h-[408px] pl-[70px] pr-[124px] ">
      <div className=" w-full h-full ">
        <div className="flex w-full h-[calc(100%-40px)] items-center justify-between">
          <Link href={"/"}>
            <Image
              className="max-w-[290px] max-h-[156px]"
              src={Logo}
              alt="Logo"
            />
          </Link>
          <div className="flex">
            <form className="font-lato mr-[116px]">
              <h3 className="text-main-whileColor font-semibold mb-[11px] font-lato">
                Join our newsletter
              </h3>
              <input
                className="outline-none w-[296px] rounded-[10px] p-[7px] leading-[1.6] text-base text-main-blackColor block mb-[11px]"
                placeholder="Enter your name"
              />
              <input
                className="outline-none w-[296px] h-[40px] rounded-[10px] p-[7px] leading-[1.6] text-base text-main-blackColor mb-[11px]"
                placeholder="Enter your email"
              />
              <button className="block text-base text-main-whileColor font-bold leading-[1.6] px-[10px] py-[5px] rounded-[10px] bg-gradient-to-tl from-[#5200FF] to-[#F265E4] ">
                Subscribe now
              </button>
            </form>
            <div>
              <h2 className="text-[28px] font-semibold text-main-whileColor font-lato mb-[10px]">
                Useful links
              </h2>
              <div className="flex flex-col">
                <Link
                  className="text-base leading-[1.6 text-main-whileColor mb-[10px] block] hover:text-main-pink-ec"
                  href={"about-us"}
                >
                  About Us
                </Link>
                <Link
                  className="text-base leading-[1.6 text-main-whileColor mb-[10px] block] hover:text-main-pink-ec"
                  href={"privacy-policy"}
                >
                  Privacy Policy
                </Link>
                <Link
                  className="text-base leading-[1.6 text-main-whileColor mb-[10px] block] hover:text-main-pink-ec"
                  href={"terms-of-use"}
                >
                  Terms
                </Link>
              </div>
              <div className="flex">
                <RedditIcon
                  className="mr-[19px] cursor-pointer"
                  width="30px"
                  height="30px"
                />
                <FacebookIcon
                  className="mr-[19px] cursor-pointer"
                  width="30px"
                  height="30px"
                />
                <TwitterIcon
                  className="mr-[19px] cursor-pointer"
                  width="30px"
                  height="30px"
                />
                <TelegramIcon
                  className="mr-[19px] cursor-pointer"
                  width="30px"
                  height="30px"
                />
                <DiscordIcon
                  className="cursor-pointer"
                  width="30px"
                  height="30px"
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs font-semibold text-[rgba(255,255,255,0.5)] w-full text-center">
          Zeraverse 2023
        </p>
      </div>
    </div>
  );
}

export default Footer;
