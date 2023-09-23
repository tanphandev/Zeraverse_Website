import { forwardRef } from "react";

const ReportIcon = forwardRef<
  any,
  {
    width: string;
    height: string;
    className?: string;
    onClick: () => void;
  }
>(function Component(
  { width = "32px", height = "32px", className, onClick },
  ref
) {
  return (
    <svg
      onClick={onClick}
      ref={ref}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 22.6667C16.3778 22.6667 16.6947 22.5387 16.9507 22.2827C17.2058 22.0276 17.3333 21.7111 17.3333 21.3333C17.3333 20.9556 17.2058 20.6387 16.9507 20.3827C16.6947 20.1276 16.3778 20 16 20C15.6222 20 15.3058 20.1276 15.0507 20.3827C14.7947 20.6387 14.6667 20.9556 14.6667 21.3333C14.6667 21.7111 14.7947 22.0276 15.0507 22.2827C15.3058 22.5387 15.6222 22.6667 16 22.6667ZM14.6667 17.3333H17.3333V9.33333H14.6667V17.3333ZM11 28L4 21V11L11 4H21L28 11V21L21 28H11ZM12.1333 25.3333H19.8667L25.3333 19.8667V12.1333L19.8667 6.66667H12.1333L6.66667 12.1333V19.8667L12.1333 25.3333Z"
        fill="#929292"
      />
    </svg>
  );
});
export default ReportIcon;
