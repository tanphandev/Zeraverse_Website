const ArrowLeftIconPagi = ({
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
    <g filter="url(#filter0_i_2584_8362)">
      <rect width="24" height="24" rx="5" fill="#4C1D95" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.787 5.20503C16.071 5.47839 16.071 5.92161 15.787 6.19497L9.75579 12L15.787 17.805C16.071 18.0784 16.071 18.5216 15.787 18.795C15.503 19.0683 15.0425 19.0683 14.7585 18.795L8.21301 12.495C7.929 12.2216 7.929 11.7784 8.21301 11.505L14.7585 5.20503C15.0425 4.93166 15.503 4.93166 15.787 5.20503Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_2584_8362"
        x="-2"
        y="-2"
        width="26"
        height="26"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
          result="effect1_innerShadow_2584_8362"
        />
      </filter>
    </defs>
  </svg>
);
export default ArrowLeftIconPagi;
