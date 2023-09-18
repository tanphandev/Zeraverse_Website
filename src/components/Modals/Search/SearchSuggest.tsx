type Props = {
  suggestList: any[];
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};
function SearchSuggest({ suggestList, setSearchValue }: Props) {
  return (
    <ul className="w-[644px] overflow-x-scroll no-scrollbar flex mb-[27px]">
      {suggestList?.map((item, index) => {
        return (
          <li
            className="px-5 py-2 bg-main-whileColor rounded-[20px] inline-block mr-[11px]"
            key={index}
          >
            <p
              className="text-xs font-bold font-nunito text-main-blackColor whitespace-nowrap cursor-pointer"
              onClick={() => {
                setSearchValue(item?.label);
              }}
            >
              {item?.label?.toUpperCase()}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchSuggest;
