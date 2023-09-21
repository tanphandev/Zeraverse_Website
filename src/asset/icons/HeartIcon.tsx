import { forwardRef } from "react";
const HeartIcon = forwardRef<
  any,
  {
    id: string;
    isLoveGame: boolean;
    width: string;
    height: string;
    className?: string;
    onClick?: () => void;
  }
>(function Component(
  { id, isLoveGame, width = "32px", height = "32px", className, onClick },
  ref
) {
  return (
    <svg
      tabIndex={-1}
      ref={ref}
      id={id}
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_2613_215)">
        <path
          d="M17.2943 20.8295L16.4078 20.3223C13.2619 18.5305 11.184 17.344 10.6522 15.3595C10.2164 13.733 11.0452 12.1512 12.5328 11.7526C13.3731 11.5274 14.2939 11.7377 14.9995 12.2652C15.3468 11.4556 16.0391 10.8131 16.8794 10.5879C18.367 10.1893 19.8756 11.1448 20.3115 12.7713C20.8432 14.7558 19.637 16.8223 17.8084 19.947L17.2943 20.8295Z"
          fill="#FD38C6"
        />
        <path
          d="M15.9998 28.4667L14.0665 26.7067C7.19984 20.48 2.6665 16.36 2.6665 11.3333C2.6665 7.21333 5.89317 4 9.99984 4C12.3198 4 14.5465 5.08 15.9998 6.77333C17.4532 5.08 19.6798 4 21.9998 4C26.1065 4 29.3332 7.21333 29.3332 11.3333C29.3332 16.36 24.7998 20.48 17.9332 26.7067L15.9998 28.4667Z"
          fill={isLoveGame ? "#FF0000" : "#929292"}
        />
      </g>
      <defs>
        <filter
          id="filter0_i_2613_215"
          x="0"
          y="0"
          width="34"
          height="34"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_2613_215"
          />
        </filter>
      </defs>
    </svg>
  );
});
export default HeartIcon;
