import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/shared/add/AddButton";
import Image from "next/image";
import Link from "next/link";
import { getStaff } from "@/lib/data";
import DeleteButton from "@/components/staff/DeleteStaff/DeleteButton";
import { deleteStaff } from "@/lib/actions";

const StaffPage = async () => {
  const staff = await getStaff();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between bg-white rounded-lg p-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Staff", href: "/dashboard/staff" },
          ]}
        />
        <AddButton />
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Picture</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Sex</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Critical Staff</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staff) => (
              <tr key={staff.id}>
                <td className="border px-4 py-2">
                  <Image
                    src={
                      staff.picture ||
                      "/profile_pictures/noProfilePicture_m.png"
                    }
                    alt="Picture"
                    width={50}
                    height={50}
                  />
                </td>
                <td className="border px-4 py-2">{staff.fullName}</td>
                <td className="border px-4 py-2">{staff.sex}</td>
                <td className="border px-4 py-2">{staff.email}</td>
                <td className="border px-4 py-2">
                  {staff.criticalStaff ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2">
                  <Link href={`/dashboard/staff/${staff.id}/edit`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs mr-2">
                      Edit
                    </button>
                  </Link>
                  <DeleteButton staffId={staff.id} deleteStaff={deleteStaff} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;
