import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/shared/add/AddButton";
import DeleteButton from "@/components/shared/delete/DeleteButton";
import Image from "next/image";
import Link from "next/link";
import { getUsers } from "@/lib/data";
import { deleteUser } from "@/lib/actions";
import Table from "@/components/shared/table/Table";

const AdminPage = async () => {
  const user = await getUsers();

  // Define columns for the Table component
  const columns = [
    { key: "profilePicture", label: "Picture" },
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "actions", label: "Actions" },
  ];

  // Transform user data to match the Table component's format
  const data = user.map((user) => ({
    profilePicture: (
      <Image
        src={user.profilePicture || "/profile_pictures/noProfilePicture_m.png"}
        alt="Picture"
        width={50}
        height={50}
        className="rounded-full"
      />
    ),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    actions: (
      <div>
        <Link href={`/dashboard/admins/${user.id}/edit`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs mr-2">
            Edit
          </button>
        </Link>
        <DeleteButton id={user.id} type="user" deleteAction={deleteUser} />
      </div>
    ),
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
        <AddButton href="/dashboard/admins/add" />
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminPage;
