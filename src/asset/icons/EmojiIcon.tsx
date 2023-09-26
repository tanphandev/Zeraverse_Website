function EmojiIcon({
  width = "18px",
  height = "18px",
  className,
  onClick,
}: {
  width: string;
  height: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <svg
      className={className}
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 123 123"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50.781 49.25a7.655 7.655 0 1 0-15.304-.434 7.655 7.655 0 0 0 15.304.434Zm36.75 0a7.655 7.655 0 1 0-15.304-.434 7.655 7.655 0 0 0 15.304.434ZM50.083 80.524a4.594 4.594 0 0 0-4.728 7.877c4.697 2.818 10.535 4.104 16.145 4.104 5.61 0 11.454-1.286 16.145-4.104a4.593 4.593 0 1 0-4.728-7.877c-2.958 1.776-7.068 2.793-11.417 2.793s-8.453-1.016-11.417-2.793ZM122.762 61.5C122.762 27.666 95.335.238 61.5.238 27.666.238.25 27.666.25 61.5c-.006 33.828 27.416 61.25 61.25 61.25 33.835 0 61.262-27.428 61.262-61.256v.006Zm-113.33 0a52.074 52.074 0 1 1 104.14-1.13A52.074 52.074 0 0 1 9.433 61.5Z"
        fill="#ffffff"
      ></path>
    </svg>
  );
}

export default EmojiIcon;
