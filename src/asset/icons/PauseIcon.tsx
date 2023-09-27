import { forwardRef } from "react";

const PauseIcon = forwardRef<
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
      ref={ref}
      onClick={onClick}
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="13.5" stroke="#DDD6FE" />
      <path
        d="M20 23C19.45 23 18.979 22.804 18.587 22.412C18.195 22.02 17.9993 21.5493 18 21V11C18 10.45 18.196 9.979 18.588 9.587C18.98 9.195 19.4507 8.99934 20 9C20.55 9 21.021 9.196 21.413 9.588C21.805 9.98 22.0007 10.4507 22 11V21C22 21.55 21.804 22.021 21.412 22.413C21.02 22.805 20.5493 23.0007 20 23ZM12 23C11.45 23 10.979 22.804 10.587 22.412C10.195 22.02 9.99934 21.5493 10 21V11C10 10.45 10.196 9.979 10.588 9.587C10.98 9.195 11.4507 8.99934 12 9C12.55 9 13.021 9.196 13.413 9.588C13.805 9.98 14.0007 10.4507 14 11V21C14 21.55 13.804 22.021 13.412 22.413C13.02 22.805 12.5493 23.0007 12 23Z"
        fill="#DDD6FE"
      />
    </svg>
  );
});

export default PauseIcon;
