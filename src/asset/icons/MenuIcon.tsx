const MenuIcon = ({
  width = "42px",
  height = "42px",
  className,
}: {
  width: string;
  height: string;
  className?: string;
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.25 33.25C5.25 34.2165 6.0335 35 7 35L35 35C35.9665 35 36.75 34.2165 36.75 33.25C36.75 32.2835 35.9665 31.5 35 31.5L7 31.5C6.0335 31.5 5.25 32.2835 5.25 33.25ZM5.25 21C5.25 21.9665 6.0335 22.75 7 22.75H19.67C20.6365 22.75 21.42 21.9665 21.42 21C21.42 20.0335 20.6365 19.25 19.67 19.25H7C6.0335 19.25 5.25 20.0335 5.25 21ZM5.25 8.75C5.25 9.7165 6.0335 10.5 7 10.5L35 10.5C35.9665 10.5 36.75 9.7165 36.75 8.75C36.75 7.7835 35.9665 7 35 7L7 7C6.0335 7 5.25 7.7835 5.25 8.75Z"
      fill="#C4B5FD"
    />
    <path
      d="M25.2002 23.52L29.8202 18.48L34.4402 23.52L25.2002 23.52Z"
      fill="#C4B5FD"
    />
  </svg>
);
export default MenuIcon;
