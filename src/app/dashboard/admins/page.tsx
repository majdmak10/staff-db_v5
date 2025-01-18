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
import adminsColumns from "@/constants/columns/adminsColumns";
import { getProfilePicture } from "@/utils/adminUtils";

const AdminPage = async () => {
  const user = await getUsers();

  const data = user.map((user) => ({
    id: user.id,
    checkbox: (
      <input
        type="checkbox"
        aria-label="Select row"
        className="w-4 h-4 accent-mBlue mt-1"
      />
    ), // Row checkbox
    profilePicture: (
      <Link href={`/dashboard/admins/${user.id}`}>
        <Image
          src={getProfilePicture(user.profilePicture, user.sex)}
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
            columns={adminsColumns}
            data={data}
            deleteAction={deleteUser}
            type="user"
            placeholder="Search for an admin"
          />
        </div>
      </div>
    </Suspense>
  );
};

export default AdminPage;
