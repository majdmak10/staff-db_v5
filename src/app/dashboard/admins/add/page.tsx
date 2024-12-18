"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/shared/add/InputField";
import SelectField from "@/components/shared/add/SelectField";
import UploadPicture from "@/components/shared/add/UploadPicture";
import { addUser } from "@/lib/actions";

const AddAdmin: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = (formData: FormData) => {
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const role = formData.get("role") as string;

    const validatePassword = (password: string): string | null => {
      // Check if password is at least 8 characters long
      if (password.length < 8) {
        return "Password must be at least 8 characters long, contain at least one capital letter, one number, and one symbol (e.g., !@#$%^&*)";
      }

      // Check for at least one uppercase letter
      const hasUpperCase = /[A-Z]/.test(password);
      if (!hasUpperCase) {
        return "Password must be at least 8 characters long, contain at least one capital letter, one number, and one symbol (e.g., !@#$%^&*)";
      }

      // Check for at least one number
      const hasNumber = /[0-9]/.test(password);
      if (!hasNumber) {
        return "Password must be at least 8 characters long, contain at least one capital letter, one number, and one symbol (e.g., !@#$%^&*)";
      }

      // Check for at least one symbol
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
      if (!hasSymbol) {
        return "Password must be at least 8 characters long, contain at least one capital letter, one number, and one symbol (e.g., !@#$%^&*)";
      }

      // If all checks pass, return null (no error)
      return null;
    };

    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!fullName || fullName.trim() === "") {
      newErrors.fullName = "Full Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Valid email is required";
    }

    // Password validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role validation
    if (!role || role === "") {
      newErrors.role = "Role is required";
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
      await addUser(formData);
    } catch (error) {
      // Handle any submission errors
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to add admin. Please try again." });
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/admins");
  };

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
        <form action={handleSubmit} className="flex flex-col gap-4 w-full">
          <h1 className="font-semibold">Add New Admin</h1>

          {errors.submit && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md">
              {errors.submit}
            </div>
          )}

          <div className="flex flex-col gap-4 w-full">
            <fieldset className="gap-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-5">
                <div className="col-span-1">
                  <InputField
                    label="Full Name"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter full name"
                    error={errors.fullName}
                  />
                </div>
                <div className="col-span-1">
                  <InputField
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    type="email"
                    error={errors.email}
                  />
                </div>
                <div className="col-span-1">
                  <InputField
                    label="Password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    error={errors.password}
                  />
                </div>
                <div className="col-span-1">
                  <InputField
                    label="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Enter confirm password"
                    type="password"
                    error={errors.confirmPassword}
                  />
                </div>
                <div className="col-span-1">
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
                    error={errors.role}
                  />
                </div>
                <div className="col-span-1">
                  <UploadPicture name="profilePicture" />
                </div>
              </div>
            </fieldset>
          </div>

          {/* Submit Buttons Section */}
          <div className="flex justify-center items-center gap-4 mt-4 mb-4">
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
      </div>
    </main>
  );
};

export default AddAdmin;
