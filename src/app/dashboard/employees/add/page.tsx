"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/shared/form/InputField";
import { addEmployee } from "@/lib/actionsTest";
import SelectField from "@/components/shared/form/SelectFieldTest";

const AddEmployee = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = (formData: FormData) => {
    const fullName = formData.get("fullName") as string;
    const sex = formData.get("sex") as string;

    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!fullName || fullName.trim() === "") {
      newErrors.fullName = "Full Name is required";
    }

    // Sex validation
    if (!sex || sex === "") {
      newErrors.sex = "Sex is required";
    }

    return newErrors;
  };
  const handleSubmit = async (formData: FormData) => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear previous errors
    setErrors({});

    try {
      await addEmployee(formData);
    } catch (error) {
      // Handle any submission errors
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to add employee. Please try again." });
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/employees");
  };

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Employees", href: "/dashboard/employee" },
          { label: "Add New Employee", href: "/dashboard/employee/add" },
        ]}
      />
      <form
        action={handleSubmit}
        className="flex flex-col gap-4 w-full bg-white rounded-lg p-4"
      >
        <h1 className="font-semibold">Add New Employee</h1>

        {errors.submit && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            placeholder="Enter full name"
            error={errors.fullName}
          />
          <SelectField
            label="Sex"
            id="sex"
            name="sex"
            placeholder="Select sex"
            options={[
              { value: "Female", label: "Female" },
              { value: "Male", label: "Male" },
            ]}
            error={errors.sex}
          />
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-mBlue text-sm text-white p-2 rounded-md w-16"
            type="submit"
          >
            Add
          </button>
          <button
            className="bg-mRed text-sm text-white p-2 rounded-md w-16"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddEmployee;
