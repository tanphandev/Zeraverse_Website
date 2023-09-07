import Image from "next/image";
type Props = {
  className: string;
  src?: string;
  alt: string;
  fallback: string;
  width?: number;
  height?: number;
};
function CustomImage({
  className,
  src,
  alt,
  fallback,
  width,
  height,
  ...props
}: Props) {
  return (
    <Image
      className={className}
      src={src || fallback}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}

export default CustomImage;
