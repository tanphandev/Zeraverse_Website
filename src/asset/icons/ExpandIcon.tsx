const ExpandIcon = ({
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
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2613_220)">
      <path
        d="M16 14.1146L20.8762 9.2384L17.4284 9.23934L17.4274 6.57213L25.4281 6.57213V14.5728L22.7609 14.5719L22.7618 11.124L17.8856 16.0002L22.7618 20.8764L22.7609 17.4286L25.4281 17.4276L25.4281 25.4283H17.4274L17.4284 22.7611L20.8762 22.7621L16 17.8858L11.1238 22.7621L14.5716 22.7611L14.5726 25.4283H6.57191L6.57191 17.4276L9.23912 17.4286L9.23817 20.8764L14.1144 16.0002L9.23817 11.124L9.23912 14.5719L6.57191 14.5728V6.57213L14.5726 6.57213L14.5716 9.23934L11.1238 9.2384L16 14.1146Z"
        fill="#929292"
      />
    </g>
    <defs>
      <clipPath id="clip0_2613_220">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default ExpandIcon;
