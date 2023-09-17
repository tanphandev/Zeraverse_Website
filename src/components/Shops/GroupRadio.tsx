"use client";
import { RadioOption } from "./AvatarShop";
type Props = {
  selectedOption: RadioOption;
  setSelectedOption: React.Dispatch<React.SetStateAction<RadioOption>>;
};

function GroupRadio({ selectedOption, setSelectedOption }: Props) {
  return (
    <div className="flex justify-end mb-[27px]">
      <div className="flex justify-center items-center">
        <input
          className="relative h-[18px] w-[18px] appearance-none rounded-full border-2 border-solid border-[#F9A8D4] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-[#F9A8D4] checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:bg-main-pink-fb checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer focus:shadow-none focus:outline-none focus:ring-0 checked:focus:border-[#F9A8D4] dark:border-neutral-600 dark:checked:border-[#F9A8D4] dark:checked:after:border-primary dark:checked:after:bg-primary dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
          name="shop-radio"
          type="radio"
          id={RadioOption.All}
          checked={selectedOption === RadioOption.All ? true : false}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedOption(event.target.id as RadioOption);
          }}
        />
        <label
          className="text-sm font-medium font-lato text-main-whileColor inline-block pl-[3px] hover:cursor-pointer"
          htmlFor={RadioOption.All}
        >
          All
        </label>
      </div>
      <div className="flex justify-center items-center mx-4">
        <input
          className="relative h-[18px] w-[18px] appearance-none rounded-full border-2 border-solid border-[#F9A8D4] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-[#F9A8D4] checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:bg-main-pink-fb checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer focus:shadow-none focus:outline-none focus:ring-0 checked:focus:border-[#F9A8D4] dark:border-neutral-600 dark:checked:border-[#F9A8D4] dark:checked:after:border-primary dark:checked:after:bg-primary dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
          name="shop-radio"
          type="radio"
          id={RadioOption.Buy}
          checked={selectedOption === RadioOption.Buy ? true : false}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedOption(event.target.id as RadioOption);
          }}
        />
        <label
          className="text-sm font-medium font-lato text-main-whileColor inline-block pl-[3px] hover:cursor-pointer"
          htmlFor={RadioOption.Buy}
        >
          Buy
        </label>
      </div>
      <div className="flex justify-center items-center">
        <input
          className="relative h-[18px] w-[18px] appearance-none rounded-full border-2 border-solid border-[#F9A8D4] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-[#F9A8D4] checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:bg-main-pink-fb checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer focus:shadow-none focus:outline-none focus:ring-0 checked:focus:border-[#F9A8D4] dark:border-neutral-600 dark:checked:border-[#F9A8D4] dark:checked:after:border-primary dark:checked:after:bg-primary dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
          name="shop-radio"
          type="radio"
          id={RadioOption.Owned}
          checked={selectedOption === RadioOption.Owned ? true : false}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSelectedOption(event.target.id as RadioOption);
          }}
        />
        <label
          className="text-sm font-medium font-lato text-main-whileColor inline-block pl-[3px] hover:cursor-pointer"
          htmlFor={RadioOption.Owned}
        >
          Owned
        </label>
      </div>
    </div>
  );
}

export default GroupRadio;
