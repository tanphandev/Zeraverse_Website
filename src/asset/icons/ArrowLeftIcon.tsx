const ArrowLeftIcon = ({
  width = "42px",
  height = "37px",
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
    viewBox="0 0 74 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_2492_5366)">
      <circle cx="37" cy="32" r="32" fill="white" />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M40.1783 20.6689C40.8726 21.3632 40.8726 22.4888 40.1783 23.183L31.3613 32L40.1783 40.817C40.8726 41.5113 40.8726 42.6369 40.1783 43.3312C39.4841 44.0255 38.3584 44.0255 37.6642 43.3312L27.1711 32.8381C26.7082 32.3753 26.7082 31.6248 27.1711 31.162L37.6642 20.6689C38.3584 19.9746 39.4841 19.9746 40.1783 20.6689Z"
      fill="#4C1D95"
    />
    <defs>
      <filter
        id="filter0_d_2492_5366"
        x="0.259259"
        y="0"
        width="73.4815"
        height="73.4815"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4.74074" />
        <feGaussianBlur stdDeviation="2.37037" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2492_5366"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2492_5366"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default ArrowLeftIcon;
