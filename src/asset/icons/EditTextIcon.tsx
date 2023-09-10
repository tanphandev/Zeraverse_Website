function EditTextIcon({
  width = "18px",
  height = "18px",
  className,
}: {
  width: string;
  height: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.475 6.69375L11.2875 3.54375L12.3375 2.49375C12.625 2.20625 12.9783 2.0625 13.3973 2.0625C13.8158 2.0625 14.1687 2.20625 14.4562 2.49375L15.5062 3.54375C15.7937 3.83125 15.9437 4.17825 15.9562 4.58475C15.9688 4.99075 15.8313 5.3375 15.5438 5.625L14.475 6.69375ZM13.3875 7.8L5.4375 15.75H2.25V12.5625L10.2 4.6125L13.3875 7.8Z"
        fill="black"
        fill-opacity="0.4"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 16.75C14 16.8881 13.8881 17 13.75 17H2.25C2.11193 17 2 16.8881 2 16.75C2 16.6119 2.11193 16.5 2.25 16.5H13.75C13.8881 16.5 14 16.6119 14 16.75Z"
        fill="black"
        fill-opacity="0.4"
      />
    </svg>
  );
}

export default EditTextIcon;
