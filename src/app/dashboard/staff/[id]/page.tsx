import { getStaffById } from "@/lib/data";

interface StaffProfileProps {
  params: { id: string };
}
const StaffProfile: React.FC<StaffProfileProps> = async ({ params }) => {
  const { id } = await params;
  const staffMember = await getStaffById(id);

  if (!staffMember) {
    return <div>Staff member not found</div>;
  }

  return (
    <div>
      <h1>{staffMember.fullName}</h1>
      <p>{staffMember.email}</p>
    </div>
  );
};

export default StaffProfile;
