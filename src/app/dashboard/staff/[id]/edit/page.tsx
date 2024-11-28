import Image from "next/image";
import { getStaffById } from "@/lib/data";
import { updateStaff } from "@/lib/actions";

interface EditStaffProps {
  params: { id: string };
}

const EditStaff: React.FC<EditStaffProps> = async ({ params }) => {
  const { id } = await params;
  const staffMember = await getStaffById(id);

  if (!staffMember) {
    return <div>Staff member not found</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Edit Staff Member</h2>
      <form action={updateStaff} method="post">
        <input type="hidden" name="id" value={staffMember.id} />
        <div>
          <Image
            src={
              staffMember.picture || "/profile_pictures/noProfilePicture_m.png"
            }
            alt="Picture"
            width={50}
            height={50}
          />
          <div>
            <input
              type="text"
              name="fullName"
              defaultValue={staffMember.fullName}
              placeholder={staffMember.fullName}
            />
          </div>
          <div>
            <select name="sex" defaultValue={String(staffMember.sex)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="email"
              defaultValue={staffMember.email}
              placeholder={staffMember.email}
            />
          </div>
          <div>
            <label>Critical?</label>
            <select
              name="criticalStaff"
              defaultValue={String(staffMember.criticalStaff)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <button>Save</button>
            <button>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStaff;
