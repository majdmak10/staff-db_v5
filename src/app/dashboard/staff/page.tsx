import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/shared/buttons/AddButton";
import Table from "@/components/shared/table/Table";
import { getStaff } from "@/lib/data";
import { deleteStaff } from "@/lib/actions";
import staffColumns from "@/constants/columns/staffColumns";
import { mapStaffData } from "@/utils/staffDataUtils";

const StaffPage = async () => {
  const staff = await getStaff();
  const data = mapStaffData(staff); // Cleaned-up data mapping

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between bg-white rounded-lg p-4 mb-3">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Staff", href: "/dashboard/staff" },
          ]}
        />
        <AddButton href="/dashboard/staff/add" />
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 w-full">
        <Table
          columns={staffColumns}
          data={data}
          deleteAction={deleteStaff}
          type="staff"
        />
      </div>
    </div>
  );
};

export default StaffPage;
