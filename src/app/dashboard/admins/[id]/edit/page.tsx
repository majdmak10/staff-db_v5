import Image from "next/image";
import { getUserById } from "@/lib/data";
import { updateUser } from "@/lib/actions";

interface EditAdminProps {
  params: { id: string };
}

const EditAdmin: React.FC<EditAdminProps> = async ({ params }) => {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return <div>Admin not found</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Edit Admin</h2>
      <form action={updateUser}>
        <input type="hidden" name="id" value={user.id} />
        <div>
          <Image
            src={
              user.profilePicture || "/profile_pictures/noProfilePicture_m.png"
            }
            alt="Picture"
            width={50}
            height={50}
          />
          <div>
            <input
              type="text"
              name="fullName"
              defaultValue={user.fullName}
              placeholder={user.fullName}
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select id="role" name="role" defaultValue={String(user.role)}>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
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
