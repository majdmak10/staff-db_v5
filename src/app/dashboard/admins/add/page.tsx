import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/shared/add/InputField";
import SelectField from "@/components/shared/add/SelectField";
import UploadPicture from "@/components/shared/add/UploadPicture";
import { addAdmin } from "@/lib/actions";

const AddAdmin: React.FC = () => {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between bg-white rounded-lg p-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Admins", href: "/dashboard/admins" },
            { label: "Add New Admin", href: "/dashboard/admins/add" },
          ]}
        />
      </div>

      <div className="flex items-center bg-white rounded-lg p-4">
        <form action={addAdmin} className="flex flex-col gap-4 w-full">
          <h1 className="font-semibold">Add New Admin</h1>

          <div className="flex flex-col gap-4 w-full">
            <fieldset className="gap-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-4">
                <InputField
                  label="Full Name"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter full name"
                />
                <InputField
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  type="email"
                />
                <InputField
                  label="Password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                />
                <InputField
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                  type="password"
                />
                <SelectField
                  label="Role"
                  id="role"
                  name="role"
                  placeholder="Select role"
                  options={[
                    { value: "Super-Admin", label: "Super-Admin" },
                    { value: "Admin", label: "Admin" },
                    { value: "Guest", label: "Guest" },
                  ]}
                />
                <UploadPicture name="profilePicture" />{" "}
              </div>
            </fieldset>
          </div>

          {/* Submit Buttons Section */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              className="bg-mBlue text-sm text-white p-2 rounded-md w-16"
              type="submit"
            >
              Add
            </button>
            <button
              className="bg-mRed text-sm text-white p-2 rounded-md w-16"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddAdmin;
