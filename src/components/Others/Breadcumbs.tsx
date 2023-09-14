import Link from "next/link";
export type CrumbItem = {
  label: React.ReactNode;
  path: string;
};
export type BreadcrumbsProps = {
  items: CrumbItem[];
};
function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="flex gap-2 items-start text-sm font-bold font-lato">
      {items.map((crumb, i) => {
        const isLastItem = i === items.length - 1;
        if (!isLastItem) {
          return (
            <>
              <Link
                href={crumb.path}
                key={i}
                className="text-main-whileColor hover:text-main-pink-ec hover:underline"
              >
                {crumb.label}
              </Link>
              {/* separator */}
              <span>/</span>
            </>
          );
        } else {
          return crumb.label;
        }
      })}
    </div>
  );
}
export default Breadcrumbs;
