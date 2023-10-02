import { forwardRef } from "react";

const AddIcon = forwardRef<
  any,
  {
    width: string;
    height: string;
    className?: string;
  }
>(function components({ width = "42px", height = "37px", className }, ref) {
  return (
    <svg
      ref={ref}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_162_11151)">
        <circle
          cx="15.2957"
          cy="14.5"
          r="14.5"
          fill="#2B2B2B"
          fillOpacity="0.7"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7957 6C16.3479 6 16.7957 6.44772 16.7957 7V13H22.7957C23.3479 13 23.7957 13.4477 23.7957 14C23.7957 14.5523 23.3479 15 22.7957 15H16.7957V21C16.7957 21.5523 16.3479 22 15.7957 22C15.2434 22 14.7957 21.5523 14.7957 21V15H8.79565C8.24337 15 7.79565 14.5523 7.79565 14C7.79565 13.4477 8.24337 13 8.79565 13H14.7957V7C14.7957 6.44772 15.2434 6 15.7957 6Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_i_162_11151"
          x="0.795654"
          y="-1"
          width="29"
          height="30"
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
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_162_11151"
          />
        </filter>
      </defs>
    </svg>
  );
});
export default AddIcon;
