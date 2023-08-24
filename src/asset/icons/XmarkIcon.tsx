const XmarkICon = ({
  width = "15px",
  height = "15px",
  onClick,
  className,
}: {
  width: string;
  height: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  className?: string;
}) => (
  <svg
    onClick={onClick}
    className={className}
    width={width}
    height={height}
    viewBox="0 0 15 15"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5293 0.470721C13.9017 -0.156907 12.8841 -0.156907 12.2564 0.470721L7.5 5.22716L2.74356 0.470721C2.11594 -0.156907 1.09835 -0.156907 0.470721 0.470721C-0.156907 1.09835 -0.156907 2.11594 0.470721 2.74356L5.22716 7.5L0.470721 12.2564C-0.156907 12.8841 -0.156907 13.9017 0.470721 14.5293C1.09835 15.1569 2.11594 15.1569 2.74356 14.5293L7.5 9.77284L12.2564 14.5293C12.8841 15.1569 13.9017 15.1569 14.5293 14.5293C15.1569 13.9017 15.1569 12.8841 14.5293 12.2564L9.77284 7.5L14.5293 2.74356C15.1569 2.11594 15.1569 1.09835 14.5293 0.470721Z"
      fill="currentColor"
    />
  </svg>
);

export default XmarkICon;
