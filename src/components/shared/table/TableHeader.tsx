import TableControls from "./TableControls";
import TableSearch from "./TableSearch";

const TableHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 w-full md:w-auto relative">
      <div>
        <TableControls />
      </div>
      <div>
        <TableSearch />
      </div>
    </div>
  );
};

export default TableHeader;
