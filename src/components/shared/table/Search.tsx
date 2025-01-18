import { useState } from "react";
import Image from "next/image";

type Props = {
  onSearch: (value: string) => void;
};

const TableSearch = ({ onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image
        src="/table_icons/search.png"
        alt="Search Icon"
        width={14}
        height={14}
      />
      <input
        type="text"
        value={searchValue}
        placeholder="Search for a staff"
        className="w-[200px] flex-none p-2 bg-transparent outline-none"
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={handleClear}
        className={`text-gray-500 hover:text-gray-700 focus:outline-none ${
          searchValue ? "visible" : "invisible"
        }`}
      >
        <span className="text-md font-bold py-1 px-2 rounded-full bg-gray-200 border border-gray-400">
          X
        </span>
      </button>
    </div>
  );
};

export default TableSearch;
