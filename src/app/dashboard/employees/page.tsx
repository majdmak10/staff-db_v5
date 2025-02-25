import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/shared/buttons/AddButton";
import { getEmployees } from "@/lib/dataTest";
import Table from "@/components/shared/table/Table";

const EmployeesPage = async () => {
  const employee = await getEmployees();

  const columns = [
    { key: "fullName", label: "Full Name", width: "200px" },
    { key: "sex", label: "Sex", width: "200px" },
    { key: "isActive", label: "Active", width: "150px" }, // Add new column
  ];

  const data = employee.map((employee) => ({
    fullName: employee.fullName || "N/A",
    sex: employee.sex || "N/A",
    isActive:
      employee.isActive === true
        ? "Yes"
        : employee.isActive === false
        ? "No"
        : "N/A", // Handle null or undefined
  }));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between bg-white rounded-lg p-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Employees", href: "/dashboard/employees" },
          ]}
        />
        <AddButton href="/dashboard/employees/add" />
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default EmployeesPage;
