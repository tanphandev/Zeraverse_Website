import ArrowLeftIcon from "@/asset/icons/ArrowLeftIcon";
import ClearIcon from "@/asset/icons/ClearIcon";
import LogoIcon from "@/asset/icons/LogoIcon";
import SeachIcon from "@/asset/icons/SearchIcon";
import Spinner from "@/asset/icons/SpinnerIcon";
import { useModalContext } from "@/contexts/ModalContextProvider";
type Props = {
  isLoading: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchResult: React.Dispatch<React.SetStateAction<any>>;
};
function SearchInput({
  isLoading,
  searchValue,
  setSearchValue,
  setSearchResult,
}: Props) {
  const { closeModalWithAnimation } = useModalContext();
  const handleOnChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };
  //close search Modal
  const closeSearchModal = () => {
    closeModalWithAnimation(500);
  };

  return (
    <>
      <button onClick={closeSearchModal}>
        <ArrowLeftIcon
          className="absolute top-[46px] right-0 translate-x-1/2 cursor-pointer"
          width="64px"
          height="64px"
        />
      </button>
      <div className="relative mt-[46px] inline-block mr-[60px]">
        <LogoIcon
          className="absolute top-1/2 left-3 -translate-y-1/2 "
          width="42px"
          height="37px"
        />
        <input
          spellCheck="false"
          value={searchValue}
          onChange={handleOnChangeSearchInput}
          className="w-[602px] h-[64px] rounded-[15px] text-main-violet-5b bg-main-whileColor text-[22px] placeholder-main-violet-c4 font-bold font-nunito pl-20 pr-[62px] outline-none"
          placeholder="What are you playing today?"
        />
        <div className="absolute top-1/2 right-[7px] -translate-y-1/2">
          {!!searchValue === true ? (
            isLoading ? (
              <Spinner
                width="20px"
                height="20px"
                className="animate-spin mr-[13px]"
              />
            ) : (
              <ClearIcon
                onClick={() => {
                  setSearchValue("");
                  setSearchResult(null);
                }}
                width="30px"
                height="30px"
                className="mr-2"
              />
            )
          ) : (
            <SeachIcon
              className="text-main-violet-8b"
              width="42px"
              height="42px"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SearchInput;
