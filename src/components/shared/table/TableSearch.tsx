// import { useState, useEffect } from "react";
// import Image from "next/image";

// const TableSearch = ({ onSearch }: { onSearch: (value: string) => void }) => {
//   // State to keep track of the search input value
//   const [searchValue, setSearchValue] = useState("");
//   const [isClient, setIsClient] = useState(false); // New state to check client-side rendering

//   useEffect(() => {
//     setIsClient(true); // Set to true when on the client side
//   }, []);

//   // Function to handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchValue(value);
//     onSearch(value); // Pass the value to the parent component
//   };

//   // Function to clear the input
//   const handleClear = () => {
//     setSearchValue(""); // Clear the local state
//     onSearch(""); // Notify the parent to clear the search
//   };

//   if (!isClient) return null; // Only render on client side

//   return (
//     <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full border border-gray-300 px-2">
//       <Image
//         src="/table_icons/search.png"
//         alt="Search Icon"
//         width={14}
//         height={14}
//       />
//       <input
//         type="text"
//         value={searchValue}
//         placeholder="Search for a staff"
//         className="w-[200px] flex-none p-2 bg-transparent outline-none"
//         onChange={handleInputChange}
//       />
//       {searchValue && (
//         <button
//           onClick={handleClear}
//           className="text-gray-500 focus:outline-none text-md font-bold py-1 px-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300"
//         >
//           X
//         </button>
//       )}
//     </div>
//   );
// };

// export default TableSearch;
