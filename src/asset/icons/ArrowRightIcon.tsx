const ArrowRightIcon = ({
  width = "20px",
  height = "20px",
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
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.1665 9.99996H15.8332M15.8332 9.99996L12.4998 13.3333M15.8332 9.99996L12.4998 6.66663"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default ArrowRightIcon;
