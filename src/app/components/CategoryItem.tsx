import Image, { StaticImageData } from "next/image";

function CategoryItem({
  src,
  name,
  onClick,
}: {
  src: StaticImageData;
  name: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className=" w-full flex items-center text-center bg-main-whileColor rounded-[10px]"
    >
      <div className="w-full">
        <Image
          className="w-full rounded-[10px]"
          src={src}
          alt="category image"
        />
      </div>
      <h3 className=" text-center flex-1 text-lg font-semibold text-main-violet-4c px-3 py-1 ">
        {name}
      </h3>
    </div>
  );
}

export default CategoryItem;
