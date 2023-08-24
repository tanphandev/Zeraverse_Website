const LogoutIcon = ({
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
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.383 1.384A1.31 1.31 0 0 1 3.31 1h3.792a1.31 1.31 0 0 1 1.31 1.31v.458a.393.393 0 0 1-.786 0V2.31a.524.524 0 0 0-.524-.524H3.31a.524.524 0 0 0-.523.524v6.416a.524.524 0 0 0 .523.524h3.792a.524.524 0 0 0 .524-.524v-.458a.393.393 0 1 1 .786 0v.458a1.31 1.31 0 0 1-1.31 1.31H3.31A1.31 1.31 0 0 1 2 8.726V2.31c0-.348.139-.68.384-.926Zm4.88 2.634a.393.393 0 0 1 .556 0l1.375 1.375a.393.393 0 0 1 0 .555L7.82 7.323a.393.393 0 1 1-.555-.555l.704-.705h-2.26a.393.393 0 0 1 0-.785h2.26l-.704-.705a.393.393 0 0 1 0-.555Z"
      fill="currentColor"
    ></path>
  </svg>
);
export default LogoutIcon;
