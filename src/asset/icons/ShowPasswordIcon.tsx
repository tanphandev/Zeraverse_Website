const ShowPasswordIcon = ({
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
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
      fill="#A78BFA"
    ></path>
    <path
      d="M19.337 9.787A10.431 10.431 0 0 0 10 3.125 10.431 10.431 0 0 0 .662 9.787a.625.625 0 0 0 0 .425A10.43 10.43 0 0 0 10 16.876a10.43 10.43 0 0 0 9.337-6.662.626.626 0 0 0 0-.425ZM10 14.063A4.062 4.062 0 1 1 14.063 10 4.069 4.069 0 0 1 10 14.063Z"
      fill="#A78BFA"
    ></path>
  </svg>
);
export default ShowPasswordIcon;
