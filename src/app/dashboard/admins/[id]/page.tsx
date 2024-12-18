import { getUserById } from "@/lib/data";

interface UserProfileProps {
  params: { id: string };
}
const AdminProfile: React.FC<UserProfileProps> = async ({ params }) => {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return <div>Admin not found</div>;
  }

  return (
    <div>
      <h1>{user.fullName}</h1>
      <p>{user.role}</p>
    </div>
  );
};

export default AdminProfile;
