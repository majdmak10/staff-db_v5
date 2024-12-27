import { getUserById } from "@/lib/data";
import { deleteUser } from "@/lib/actions";
import Image from "next/image";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import Link from "next/link";

const AdminProfile = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Admins", href: "/dashboard/admins" },
          { label: "Add New Admin", href: `/dashboard/admins/${user.id}` },
        ]}
      />
      <div className="flex flex-col gap-3 bg-white rounded-lg w-full p-4">
        <div className="flex justify-end p-4 gap-3">
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
        <div className="flex flex-col justify-center items-center gap-4 w-full bg-white rounded-lg p-4">
          <Image
            src={
              user.profilePicture ||
              (user.sex === "male"
                ? "/avatars/noProfilePicture_m.png"
                : "/avatars/noProfilePicture_f.png")
            }
            alt={`${user.fullName}'s Profile Picture`}
            width={200}
            height={200}
            className="rounded-full border-2 border-[#eaeaea] object-fill"
          />
          <h1 className="text-xl font-semibold">{user.fullName}</h1>
          <p className="font-semibold">
            Position: <span className="font-normal">{user.position}</span>
          </p>
          <p className="font-semibold">
            Email: <span className="font-normal">{user.email}</span>
          </p>
          <p className="font-semibold">
            Role: <span className="font-normal">{user.role}</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default AdminProfile;
