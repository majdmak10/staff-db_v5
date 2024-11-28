import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/shared/add/AddButton";
// import Image from "next/image";
import Link from "next/link";
import { getAdmins } from "@/lib/data";
import DeleteButton from "@/components/staff/DeleteStaff/DeleteButton";
import { deleteAdmin } from "@/lib/actions";

const AdminsPage = async () => {
  const admins = await getAdmins();

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
            {admins.map((admin) => (
              <tr key={admin.id}>
                {/* <td className="border px-4 py-2">
                  <Image
                    src={
                      admin.picture ||
                      "/profile_pictures/noProfilePicture_m.png"
                    }
                    alt="Picture"
                    width={50}
                    height={50}
                  />
                </td> */}
                <td className="border px-4 py-2">{admin.fullName}</td>
                <td className="border px-4 py-2">{admin.username}</td>
                {/* <td className="border px-4 py-2">{admin.email}</td>
                <td className="border px-4 py-2">
                  {admin.criticalStaff ? "Yes" : "No"}
                </td> */}
                <td className="border px-4 py-2">
                  <Link href={`/dashboard/staff/${admin.id}/edit`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs mr-2">
                      Edit
                    </button>
                  </Link>
                  <DeleteButton staffId={admin.id} deleteStaff={deleteAdmin} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminsPage;
