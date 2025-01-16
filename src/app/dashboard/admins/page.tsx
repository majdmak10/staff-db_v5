export const dynamic = "force-dynamic";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/shared/buttons/AddButton";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import Image from "next/image";
import Link from "next/link";
import { getUsers } from "@/lib/data";
import { deleteUser } from "@/lib/actions";
import Table from "@/components/shared/table/Table";
import { Suspense } from "react";

const AdminPage = async () => {
  const user = await getUsers();

  const columns = [
    {
      key: "checkbox",
      label: <input type="checkbox" aria-label="Select all rows" />,
      width: "50px",
    },
    { key: "profilePicture", label: "Picture", width: "100px" },
    { key: "fullName", label: "Full Name", width: "200px" },
    { key: "position", label: "Position", width: "200px" },
    { key: "email", label: "Email", width: "250px" },
    { key: "role", label: "Role", width: "150px" },
    { key: "actions", label: "Actions", width: "150px" },
  ];

  const data = user.map((user) => ({
    id: user.id,
    checkbox: <input type="checkbox" aria-label="Select row" />, // Row checkbox
    profilePicture: (
      <Link href={`/dashboard/admins/${user.id}`}>
        <Image
          src={
            user.profilePicture ||
            (user.sex === "male"
              ? "/avatars/noProfilePicture_m.png"
              : "/avatars/noProfilePicture_f.png")
          }
          alt={`${user.fullName}'s Profile Picture`}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-fill"
        />
      </Link>
    ),
    fullName: (
      <Link href={`/dashboard/admins/${user.id}`}>{user.fullName}</Link>
    ),
    position: user.position || "N/A",
    email: user.email,
    role: user.role,
    actions: (
      <div className="flex gap-2 justify-start items-center">
        <Link href={`/dashboard/admins/${user.id}`}>
          <Image
            src="/table_icons/view.png"
            alt="View"
            width={20}
            height={20}
          />
        </Link>
        <Link href={`/dashboard/admins/${user.id}/edit`}>
          <Image
            src="/table_icons/edit.png"
            alt="Edit"
            width={20}
            height={20}
          />
        </Link>
        <DeleteButton id={user.id} type="user" deleteAction={deleteUser} />
      </div>
    ),
  }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <Table
            columns={columns}
            data={data}
            deleteAction={deleteUser}
            type="user"
          />
        </div>
      </div>
    </Suspense>
  );
};

export default AdminPage;
