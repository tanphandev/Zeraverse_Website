import Link from "next/link";
import Image from "next/image";
import Logo from "@/asset/image/Logo.png";
import LetterForm from "./LetterForm";
import Contact from "./Contact";
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
            <LetterForm />
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
              <Contact />
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
