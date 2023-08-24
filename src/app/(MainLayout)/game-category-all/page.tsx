import CategoryGame from "@/components/CategoryGame";

function AllCategoryPage() {
  return (
    <>
      <div className="grid grid-cols-11">
        <div className="col-span-10 ">
          <div className="grid grid-cols-5 gap-4">
            <h2 className="col-span-2 text-[28px] text-center font-bold font-nunito text-main-whileColor py-7 rounded-[10px] bg-gradient-to-b from-[#979BFF] via-[#ef75f5] to-[#EF36C6] mb-4">
              All Category
            </h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-11">
        <CategoryGame colSpan="col-span-10" />
      </div>
      <div className="mb-[100px]"></div>
    </>
  );
}

export default AllCategoryPage;
