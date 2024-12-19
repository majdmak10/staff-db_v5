import { getUserById } from "@/lib/data";
import Image from "next/image";

const AdminProfile = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-lg">
      <Image
        src={user.profilePicture || "/avatars/noAvatar.png"}
        alt={`${user.fullName}'s Profile Picture`}
        width={180}
        height={200}
        className="rounded-3xl object-fill border-2 border-[#eaeaea]"
      />
      <h1 className="text-xl font-semibold">{user.fullName}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default AdminProfile;
