const PlayIcon = ({
  width = "32px",
  height = "32px",
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
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.389 15.678c-.249.169-.5.179-.756.03-.255-.149-.382-.378-.383-.69V6.982c0-.31.128-.54.383-.69a.66.66 0 0 1 .756.03l6.087 4.018a.756.756 0 0 1 .336.66.756.756 0 0 1-.336.66L9.39 15.678Z"
      fill="#fff"
    ></path>
    <circle cx="11" cy="11" r="8.625" stroke="#fff" strokeWidth="2"></circle>
  </svg>
);

export default PlayIcon;
