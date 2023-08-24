const UserIcon = ({
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
    viewBox="0 0 15 15"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.5 1.25c-3.45 0-6.25 2.8-6.25 6.25s2.8 6.25 6.25 6.25 6.25-2.8 6.25-6.25-2.8-6.25-6.25-6.25Zm0 2.5a2.19 2.19 0 0 1 2.188 2.188A2.19 2.19 0 0 1 7.5 8.124a2.19 2.19 0 0 1-2.188-2.188A2.19 2.19 0 0 1 7.5 3.75Zm0 8.75a5.005 5.005 0 0 1-3.837-1.8 6.217 6.217 0 0 1 7.675 0A5.005 5.005 0 0 1 7.5 12.5Z"></path>
  </svg>
);
export default UserIcon;
