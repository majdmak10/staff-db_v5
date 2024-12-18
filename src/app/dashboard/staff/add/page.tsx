import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/shared/add/InputField";
import FormSectionTitle from "@/components/staff/AddStaff/FormSectionTitle";
import SelectField from "@/components/shared/add/SelectField";
import UploadPicture from "@/components/shared/add/UploadPicture";
import { addStaff } from "@/lib/actions";

const AddStaff: React.FC = () => {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between bg-white rounded-lg p-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Staff", href: "/dashboard/staff" },
            { label: "Add New Staff", href: "/dashboard/staff/add" },
          ]}
        />
      </div>

      <div className="flex items-center bg-white rounded-lg p-4">
        <form action={addStaff} className="flex flex-col gap-4 w-full">
          <h1 className="font-semibold">Add New Staff</h1>

          {/* General Information Section */}
          <div className="flex flex-col gap-4 w-full">
            <FormSectionTitle title="General Information" />

            <fieldset className="gap-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-4">
                <InputField
                  label="Full Name"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter full name"
                />
                <SelectField
                  label="Sex"
                  id="sex"
                  name="sex"
                  placeholder="Select Sex"
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ]}
                />
                <InputField
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                />
                <SelectField
                  label="Critical Staff"
                  id="criticalStaff"
                  name="criticalStaff"
                  placeholder="Select an option"
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
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

export default AddStaff;
