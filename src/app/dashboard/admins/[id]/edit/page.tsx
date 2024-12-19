import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/shared/add/InputField";
import SelectField from "@/components/shared/add/SelectField";
import UploadPicture from "@/components/shared/add/UploadPicture";
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
    <div className="flex items-center bg-white rounded-lg p-4">
      <form action={updateUser}>
        <h1 className="font-semibold">Edit Admin</h1>
        <input type="hidden" name="id" value={user.id} />
        <div className="flex flex-col gap-4 w-full">
          <fieldset className="gap-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-5">
              <div>
                <InputField
                  label="Full Name"
                  id="fullName"
                  name="fullName"
                  placeholder={user.fullName}
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </form>

      {/* <form action={updateUser}>
        <input type="hidden" name="id" value={user.id} />
        <div>
          <Image
            src={user.profilePicture || "/avatars/noAvatar.png"}
            alt="Picture"
            width={50}
            height={50}
          />
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              defaultValue={user.fullName}
              placeholder={user.fullName}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              placeholder={user.email}
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
      </form> */}
    </div>
  );
};

export default EditAdmin;
