const ArrowRightIconPagi = ({
  width = "24px",
  height = "24px",
  className,
}: {
  width: string;
  height: string;
  className?: string;
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_i_2584_8370)">
      <rect
        width="24"
        height="24"
        rx="5"
        transform="matrix(-1 0 0 1 24 0)"
        fill="#4C1D95"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.21301 5.20503C7.929 5.47839 7.929 5.92161 8.21301 6.19497L14.2442 12L8.21301 17.805C7.929 18.0784 7.929 18.5216 8.21301 18.795C8.49703 19.0683 8.95751 19.0683 9.24153 18.795L15.787 12.495C16.071 12.2216 16.071 11.7784 15.787 11.505L9.24153 5.20503C8.95751 4.93166 8.49703 4.93166 8.21301 5.20503Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_2584_8370"
        x="-2"
        y="-2"
        width="26"
        height="26"
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
        <feOffset dx="-2" dy="-2" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.500696 0 0 0 0 0.321406 0 0 0 0 0.779167 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_2584_8370"
        />
      </filter>
    </defs>
  </svg>
);
export default ArrowRightIconPagi;
