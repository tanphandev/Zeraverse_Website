import { forwardRef } from "react";
const AddPlayListIcon = forwardRef<
  any,
  {
    width: string;
    height: string;
    className?: string;
    onClick?: () => void;
    fill?: string;
  }
>(function Component(
  { width = "32px", height = "32px", className, onClick, fill = "#929292" },
  ref
) {
  return (
    <svg
      ref={ref}
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.2857 17.7143H17.7143V26.2857C17.7143 26.7404 17.5337 27.1764 17.2122 27.4979C16.8907 27.8194 16.4547 28 16 28C15.5453 28 15.1093 27.8194 14.7878 27.4979C14.4663 27.1764 14.2857 26.7404 14.2857 26.2857V17.7143H5.71429C5.25963 17.7143 4.82359 17.5337 4.5021 17.2122C4.18061 16.8907 4 16.4547 4 16C4 15.5453 4.18061 15.1093 4.5021 14.7878C4.82359 14.4663 5.25963 14.2857 5.71429 14.2857H14.2857V5.71429C14.2857 5.25963 14.4663 4.82359 14.7878 4.5021C15.1093 4.18061 15.5453 4 16 4C16.4547 4 16.8907 4.18061 17.2122 4.5021C17.5337 4.82359 17.7143 5.25963 17.7143 5.71429V14.2857H26.2857C26.7404 14.2857 27.1764 14.4663 27.4979 14.7878C27.8194 15.1093 28 15.5453 28 16C28 16.4547 27.8194 16.8907 27.4979 17.2122C27.1764 17.5337 26.7404 17.7143 26.2857 17.7143Z"
        fill={fill}
      />
    </svg>
  );
});
export default AddPlayListIcon;
