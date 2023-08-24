export const ArrowDown = ({
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
      d="M4.8335 8.08317L10.0002 13.3332L15.1668 8.08317C15.3335 7.9165 15.4168 7.6665 15.4168 7.49984C15.4168 7.33317 15.3335 7.08317 15.1668 6.9165C15.0002 6.74984 14.8335 6.6665 14.5835 6.6665H5.41683C5.16683 6.6665 5.00016 6.74984 4.8335 6.9165C4.66683 7.08317 4.5835 7.24984 4.5835 7.49984C4.5835 7.74984 4.66683 7.9165 4.8335 8.08317Z"
      fill="#FBCFE8"
    />
  </svg>
);
export default ArrowDown;
