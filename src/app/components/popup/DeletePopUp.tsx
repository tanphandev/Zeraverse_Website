function DeletePopUp({
  content,
  onClickYes,
  onClickNo,
}: {
  content: string;
  onClickYes: () => void;
  onClickNo: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-main-whileColor-40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] text-main-whileColor font-lato flex flex-col items-center py-[10px] rounded-[10px] border-[2px] bg-main-pink-83 border-main-pink-ec ">
        <h2 className="font-bold mb-[10px]">{content}</h2>
        <p className="text-base font-bold mb-[17px]">Are you sure ?</p>
        <div className="flex">
          <button
            className="text-sm font-medium py-[5px] px-[25px] rounded-[30px] border-[1px] border-main-violet-f5 bg-main-violet-6d mr-[21px]"
            onClick={onClickNo}
          >
            No
          </button>
          <button
            className="text-sm font-medium py-[5px] px-[25px] rounded-[30px] border-[1px] border-main-violet-f5 bg-main-pink-9d"
            onClick={onClickYes}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopUp;
