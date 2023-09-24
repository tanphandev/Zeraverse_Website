const SendIcon = ({
  width = "14px",
  height = "14px",
  className,
  onClick,
}: {
  width: string;
  height: string;
  className?: string;
  onClick: () => void;
}) => (
  <svg
    onClick={onClick}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.119902 11.9469C0.120677 12.6868 0.896959 13.1697 1.56103 12.8433L14.4683 6.4988L1.56089 0.154257C0.896848 -0.172146 0.120598 0.31064 0.119756 1.05056L0.115775 4.54974C0.115191 5.06321 0.503577 5.49368 1.0144 5.54573L10.3673 6.4988L1.06486 6.97276C0.532635 6.99988 0.115184 7.4396 0.115742 7.97251L0.119902 11.9469Z"
      fill="#BD1ECB"
    />
  </svg>
);
export default SendIcon;
