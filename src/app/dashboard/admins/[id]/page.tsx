import { getAdminById } from "@/lib/data";

interface AdminProfileProps {
  params: { id: string };
}
const AdminProfile: React.FC<AdminProfileProps> = async ({ params }) => {
  const { id } = await params;
  const admin = await getAdminById(id);

  if (!admin) {
    return <div>Admin not found</div>;
  }

  return (
    <div>
      <h1>{admin.fullName}</h1>
      <p>{admin.role}</p>
    </div>
  );
};

export default AdminProfile;
