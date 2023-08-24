const TelegramIcon = ({
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
    <g clipPath="url(#clip0_234_2734)">
      <path
        d="M27.5646 2.6615L0.985973 12.9638C-0.0835971 13.4436 -0.445355 14.4043 0.727458 14.9258L7.54601 17.1039L24.0324 6.86227C24.9326 6.21932 25.8542 6.39076 25.0611 7.09805L10.9016 19.9849L10.4568 25.4385C10.8687 26.2806 11.6231 26.2845 12.1043 25.866L16.0217 22.1401L22.731 27.1901C24.2893 28.1174 25.1372 27.519 25.4725 25.8193L29.8732 4.87383C30.3301 2.78174 29.5509 1.85994 27.5646 2.6615Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_234_2734">
        <rect width="30" height="30" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default TelegramIcon;
