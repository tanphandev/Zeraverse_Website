const FacebookIcon = ({
  width = "30px",
  height = "30px",
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
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 2.55005C8.125 2.55005 2.5 8.18509 2.5 15.1254C2.5 21.4005 7.075 26.6088 13.05 27.55V18.7649H9.875V15.1254H13.05V12.3518C13.05 9.20166 14.9125 7.46973 17.775 7.46973C19.1375 7.46973 20.5625 7.70818 20.5625 7.70818V10.8081H18.9875C17.4375 10.8081 16.95 11.7744 16.95 12.7659V15.1254H20.425L19.8625 18.7649H16.95V27.55C19.8956 27.083 22.5778 25.574 24.5124 23.2956C26.4471 21.0172 27.5067 18.1194 27.5 15.1254C27.5 8.18509 21.875 2.55005 15 2.55005Z"
      fill="white"
    />
  </svg>
);

export default FacebookIcon;
