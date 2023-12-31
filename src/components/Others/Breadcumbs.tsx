import Link from "next/link";
import { Fragment } from "react";
export type CrumbItem = {
  label: React.ReactNode;
  path: string;
};
export type BreadcrumbsProps = {
  items: CrumbItem[];
  className?: string;
};
function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <div
      className={`${className} flex gap-2 items-center text-sm font-bold font-lato`}
    >
      {items.map((crumb, i) => {
        const isLastItem = i === items.length - 1;
        if (!isLastItem) {
          return (
            <Fragment key={i}>
              <Link
                href={crumb.path}
                className="text-main-whileColor hover:text-main-pink-ec hover:underline line-clamp-1"
              >
                {crumb.label}
              </Link>
              {/* separator */}
              <span>/</span>
            </Fragment>
          );
        } else {
          return (
            <p className="text-main-whileColor line-clamp-1" key={i}>
              {crumb.label}
            </p>
          );
        }
      })}
    </div>
  );
}
export default Breadcrumbs;
