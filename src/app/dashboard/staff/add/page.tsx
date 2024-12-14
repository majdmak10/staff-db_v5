"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/shared/add/InputField";
import FormSectionTitle from "@/components/staff/AddStaff/FormSectionTitle";
import SelectField from "@/components/shared/add/SelectField";
import UploadPicture from "@/components/shared/add/UploadPicture";
import { addStaff } from "@/lib/actions";
import { usePermissions } from "@/hooks/usePermissions";

const AddStaff: React.FC = () => {
  const router = useRouter();
  const permissions = usePermissions();
  const [error, setError] = useState<string | null>(null);

  // Check permissions on component mount
  useEffect(() => {
    if (permissions && !permissions.canAddStaff) {
      router.push("/dashboard");
    }
  }, [permissions, router]);

  // Handle form submission with token
  const handleSubmit = async (formData: FormData) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("authToken") ?? undefined; // Use fallback

      // Call addStaff with form data and token
      await addStaff(formData, token);
    } catch (err) {
      // Handle any errors during staff addition
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  // If permissions haven't loaded yet, show nothing
  if (!permissions) {
    return null;
  }

  // If user doesn't have permission, don't render the form
  if (!permissions.canAddStaff) {
    return (
      <main className="flex flex-col gap-3">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          You do not have permission to add staff.
        </div>
      </main>
    );
  }

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
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="flex flex-col gap-4 w-full">
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
                  required
                />
                <SelectField
                  label="Sex"
                  id="sex"
                  name="sex"
                  placeholder="Select Sex"
                  required
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
                  type="email"
                  required
                />
                <SelectField
                  label="Critical Staff"
                  id="criticalStaff"
                  name="criticalStaff"
                  placeholder="Select an option"
                  required
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                />
                <UploadPicture name="profilePicture" />
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
              onClick={() => router.push("/dashboard/staff")}
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
