const ArrowLeftVersion2 = ({
  width = "18px",
  height = "18px",
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
    viewBox="0 0 10 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.707.793a1 1 0 0 1 0 1.414L2.414 9.5l7.293 7.293a1 1 0 0 1-1.414 1.414l-8-8a1 1 0 0 1 0-1.414l8-8a1 1 0 0 1 1.414 0Z"
      fill="currentColor"
    ></path>
  </svg>
);
export default ArrowLeftVersion2;
