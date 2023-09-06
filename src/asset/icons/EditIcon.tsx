const EditIcon = ({
  width = "30px",
  height = "30px",
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
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.25 29.625a2.408 2.408 0 0 1-1.766-.735 2.406 2.406 0 0 1-.734-1.765v-17.5c0-.688.245-1.276.734-1.766a2.41 2.41 0 0 1 1.766-.734h11.156l-2.5 2.5H6.25v17.5h17.5v-8.688l2.5-2.5v11.188c0 .688-.245 1.276-.734 1.765-.49.49-1.078.735-1.766.735H6.25ZM20.219 7.844 22 9.594l-8.25 8.25v1.781h1.75l8.281-8.281 1.782 1.75-9 9.031H11.25v-5.313l8.969-8.968Zm5.343 5.25-5.343-5.25 3.125-3.125c.5-.5 1.099-.75 1.797-.75s1.286.25 1.765.75l1.75 1.781c.48.48.719 1.063.719 1.75 0 .688-.24 1.27-.719 1.75l-3.093 3.094Z"
      fill="#EC4899"
    ></path>
  </svg>
);

export default EditIcon;
