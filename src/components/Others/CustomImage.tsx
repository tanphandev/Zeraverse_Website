import Image from "next/image";
type Props = {
  className: string;
  style?: any;
  src?: string;
  alt: string;
  fallback: string;
  width?: number;
  height?: number;
  priority?: boolean;
  [x: string]: any;
  onClick?: () => void;
};
function CustomImage({
  className,
  style,
  src,
  alt,
  priority,
  fallback,
  width,
  height,
  onClick,
  ...props
}: Props) {
  return (
    <Image
      priority={priority}
      onClick={onClick}
      className={className}
      style={style}
      src={src || fallback}
      alt={alt}
      width={width}
      height={height}
      sizes="100vw"
      {...props}
    />
  );
}

export default CustomImage;
