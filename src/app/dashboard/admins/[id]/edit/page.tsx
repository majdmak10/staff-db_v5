import Image from "next/image";
import { getAdminById } from "@/lib/data";
import { updateAdmin } from "@/lib/actions";

interface EditAdminProps {
  params: { id: string };
}

const EditAdmin: React.FC<EditAdminProps> = async ({ params }) => {
  const { id } = await params;
  const admin = await getAdminById(id);

  if (!admin) {
    return <div>Admin not found</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Edit Admin</h2>
      <form action={updateAdmin} method="post">
        <input type="hidden" name="id" value={admin.id} />
        <div>
          <Image
            src={admin.picture || "/profile_pictures/noProfilePicture_m.png"}
            alt="Picture"
            width={50}
            height={50}
          />
          <div>
            <input
              type="text"
              name="fullName"
              defaultValue={admin.fullName}
              placeholder={admin.fullName}
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select id="role" name="role" defaultValue={String(admin.role)}>
              <option value="Super-Admin">Super-Admin</option>
              <option value="Admin">Admin</option>
              <option value="Guest">Guest</option>
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

export default EditAdmin;
