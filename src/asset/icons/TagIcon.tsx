const TagIcon = ({
  width = "32px",
  height = "32px",
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
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.66699 13.3333C9.73366 13.3333 10.667 12.3999 10.667 11.3333C10.667 10.2666 9.73366 9.33325 8.66699 9.33325C7.60033 9.33325 6.66699 10.2666 6.66699 11.3333C6.66699 12.3999 7.60033 13.3333 8.66699 13.3333ZM12.0003 7.99992L21.3337 17.3333L14.667 23.9999L5.33366 14.6666V7.99992H12.0003ZM12.0003 5.33325H5.33366C3.86699 5.33325 2.66699 6.53325 2.66699 7.99992V14.6666C2.66699 15.4666 2.93366 16.1333 3.46699 16.5333L12.8003 25.8666C13.2003 26.3999 13.867 26.6666 14.667 26.6666C15.467 26.6666 16.1337 26.3999 16.5337 25.8666L23.2003 19.1999C23.7337 18.6666 24.0003 17.9999 24.0003 17.3333C24.0003 16.5333 23.7337 15.8666 23.2003 15.4666L13.867 6.13325C13.467 5.59992 12.8003 5.33325 12.0003 5.33325ZM18.0003 7.59992L19.3337 6.26659L28.5337 15.4666C29.067 15.9999 29.3337 16.6666 29.3337 17.3333C29.3337 17.9999 29.067 18.7999 28.5337 19.1999L21.3337 26.3999L20.0003 25.0666L27.6003 17.3333L18.0003 7.59992Z"
      fill="currentColor"
    />
  </svg>
);
export default TagIcon;
