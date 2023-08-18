import Image from "next/image";

type Props = {
  data: Array<any>;
  title: string;
  onClick: (title: string) => void;
};
function SlipBar({ data, title, onClick }: Props) {
  return (
    <div className="mb-[43px]">
      <div className="flex justify-between text-main-whileColor mb-4">
        <h1 className="text-2xl font-bold font-nunito">{title}</h1>
        <button
          onClick={() => {
            onClick(title);
          }}
          className="text-sx font-medium font-lato"
        >
          View all {">"}
        </button>
      </div>
      <div className="w-full overflow-hidden overflow-x-scroll whitespace-nowrap no-scrollbar">
        {data.map((item, index) => (
          <div key={index} className="inline-block mr-4">
            <Image
              src={item.src}
              alt="Image"
              width={94}
              height={94}
              className="rounded-[10px] inline-block"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlipBar;
