import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/shared/buttons/AddButton";
import { getEmployees } from "@/lib/dataTest";
import Table from "@/components/shared/table/Table";

const EmployeesPage = async () => {
  const employee = await getEmployees();

  const columns = [
    { key: "fullName", label: "Full Name", width: "200px" },
    { key: "sex", label: "Sex", width: "200px" },
  ];

  const data = employee.map((employee) => ({
    fullName: employee.fullName || "N/A",
    sex: employee.sex || "N/A",
  }));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between bg-white rounded-lg p-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Admins", href: "/dashboard/admins" },
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
