import Image from "next/image";
function CategoryItem({
  src,
  name,
  onClick,
}: {
  src: string;
  name: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="w-full flex items-center text-center bg-main-whileColor rounded-[20px] transition-all hover:scale-105 duration-300"
    >
      <div className="h-full w-full">
        <Image
          className="w-full h-full min-w-[94px] rounded-[20px]"
          src={src}
          alt="category image"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
      <h3 className=" text-center flex-1 text-[13px] font-semibold text-main-violet-4c px-3 py-1 ">
        {name}
      </h3>
    </div>
  );
}

export default CategoryItem;
