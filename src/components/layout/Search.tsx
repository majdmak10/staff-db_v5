import { useState } from "react";
import Image from "next/image";

const Search = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleSearchClick = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseClick = () => {
    setIsOverlayVisible(false);
  };

  return (
    <>
      <div className="flex items-center justify-center bg-mBlue md:bg-white text-xs rounded-full md:h-[32px] md:w-auto md:px-2">
        {/* Search icon, always visible */}
        <button onClick={handleSearchClick} className="flex items-center">
          {/* Image for small screens (white icon) */}
          <Image
            src="/navbar_icons/search_white.svg"
            alt="Search"
            width={52}
            height={52}
            className="block md:hidden"
          />
          {/* Image for medium and larger screens (default icon) */}
          <Image
            src="/navbar_icons/search.svg"
            alt="Search"
            width={26}
            height={26}
            className="hidden md:block"
          />
        </button>

        {/* Input field, hidden on medium and smaller screens */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block w-[220px] p-2 bg-transparent outline-none"
        />
      </div>

      {/* Overlay Search Box for small screens */}
      {isOverlayVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50">
          <div className="relative bg-white w-full max-w-[400px] mx-auto p-6 rounded-lg top-5">
            {/* Close button */}
            <button
              className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseClick}
            >
              ✖
            </button>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 bg-gray-100 rounded-lg outline-none text-sm"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
