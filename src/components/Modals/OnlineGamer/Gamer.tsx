import { images } from "@/asset/image/images";
import CustomImage from "@/components/Others/CustomImage";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { staticPaths } from "@/utils/paths";
import Link from "next/link";
type Props = {
  gamer: any;
};
function Gamer({ gamer }: Props) {
  const { closeModalWithAnimation } = useModalContext();
  return (
    <Link
      href={staticPaths.otherUser(gamer?.username)}
      onClick={() => {
        closeModalWithAnimation(150);
      }}
      className="flex items-center mb-[10px] cursor-pointer group"
    >
      <CustomImage
        alt="avatar"
        src={gamer?.avatar}
        fallback={images.default_profile_image}
        width={0}
        height={0}
        className="w-[30px] h-[30px] rounded-[50%] mr-2 object-cover"
      />
      <p className="text-base font-normal font-lato text-main-whileColor group-hover:text-main-violet-7c">
        {gamer?.username}
      </p>
    </Link>
  );
}

export default Gamer;
