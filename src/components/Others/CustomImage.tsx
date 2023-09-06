import Image from "next/image";
import { image } from "@/asset/image/images";
type Props = {
  className: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};
function CustomImage({ className, src, alt, width, height, ...props }: Props) {
  return (
    <Image
      className={className}
      src={src || image.default_profile_image}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}

export default CustomImage;
