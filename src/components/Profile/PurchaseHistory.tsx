import IPurchaseHistory from "@/interface/user/IPurchaseHistory";
import NoData from "../Others/NoData";
import Image from "next/image";
type Props = {
  data: IPurchaseHistory;
  title: string;
  onClick: ({ title, payload }: { title: string; payload?: any }) => void;
};
function PurchaseHistory({ onClick, data, title }: Props) {
  const isAvatarData = data.avatar && data.avatar.length > 0;
  const isCoverData = data.cover && data.cover.length > 0;
  return (
    <div className="mb-[43px]">
      <div className="flex justify-between text-main-whileColor mb-4">
        <h1 className="text-2xl font-bold font-nunito">{title}</h1>
        <button
          onClick={() => {
            onClick({ title });
          }}
          className="text-sx font-medium font-lato hover:text-main-pink-db"
        >
          View all {">"}
        </button>
      </div>
      {isAvatarData || isCoverData ? (
        <div className="w-full overflow-x-scroll no-scrollbar">
          <div className="flex space-x-4 py-3">
            {data?.avatar.map((item, index) => (
              <div className="flex-shrink-0" key={index}>
                <Image
                  className="w-[94px] h-[94px] rounded-[10px] object-cover"
                  src={item?.item_info?.url}
                  alt="avatar"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-4 py-3">
            {data?.cover.map((item, index) => (
              <div className="flex-shrink-0" key={index}>
                <Image
                  className="rounded-[10px] w-[204px] h-[94px] object-cover"
                  src={item?.item_info?.url}
                  alt="cover"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default PurchaseHistory;
