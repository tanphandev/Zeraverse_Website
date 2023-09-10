import Image from "next/image";
import NoDataImage from "@/../public/asset/image/NoData.png";
function NoData() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Image src={NoDataImage} alt="No Data" width={100} height={100} />
      <h2 className="text-xl font-bold font-nunito text-main-whileColor">
        No Data
      </h2>
    </div>
  );
}

export default NoData;
