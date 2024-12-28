"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FormSectionTitle from "@/components/shared/form/FormSectionTitle";
import InputField from "@/components/shared/form/InputField";
import SelectField from "@/components/shared/form/SelectField";
import UploadPicture from "@/components/shared/form/UploadPicture";
import { addStaff } from "@/lib/actions";

const AddStaff = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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
      await addStaff(formData);
    } catch (error) {
      // Handle any submission errors
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to add staff. Please try again." });
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/staff");
  };

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Staff", href: "/dashboard/staff" },
          { label: "Add New Staff", href: "/dashboard/staff/add" },
        ]}
      />
      <form
        action={handleSubmit}
        className="flex flex-col gap-4 w-full bg-white rounded-lg p-4"
      >
        <h1 className="font-semibold">Add New Staff</h1>

        {errors.submit && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md">
            {errors.submit}
          </div>
        )}

        {/* General Information */}
        <FormSectionTitle title="General Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            placeholder="Enter full name"
            error={errors.fullName}
          />
          <InputField
            label="Date of Birth"
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
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
          <InputField
            label="Nationality"
            id="nationality"
            name="nationality"
            placeholder="Enter nationality"
          />
          <SelectField
            label="Employment Type"
            id="employmentType"
            name="employmentType"
            placeholder="Select employment type"
            options={[
              { value: "International", label: "International" },
              { value: "National", label: "National" },
            ]}
          />
          <InputField
            label="Position"
            id="position"
            name="position"
            placeholder="Enter position"
          />
          <SelectField
            label="Unit"
            id="unit"
            name="unit"
            placeholder="Select unit"
            options={[
              { value: "Admin", label: "Admin" },
              { value: "Communication", label: "Communication" },
              { value: "Field", label: "Field" },
              {
                value: "Information Management",
                label: "Information Management",
              },
              { value: "Livelihood", label: "Livelihood" },
              { value: "Management", label: "Management" },
              { value: "Programme", label: "Programme" },
              { value: "ProjectControl", label: "Project Control" },
              { value: "Protection", label: "Protection" },
              { value: "Security", label: "Security" },
              { value: "Shelter", label: "Shelter" },
              { value: "Supply", label: "Supply" },
              { value: "Transportation", label: "Transportation" },
            ]}
          />
          <SelectField
            label="Blood Type"
            id="bloodType"
            name="bloodType"
            placeholder="Select blood type"
            options={[
              { value: "A+", label: "A+" },
              { value: "B+", label: "B+" },
              { value: "AB+", label: "AB+" },
              { value: "O+", label: "O+" },
              { value: "A-", label: "A-" },
              { value: "B-", label: "B-" },
              { value: "AB-", label: "AB-" },
              { value: "O-", label: "O-" },
            ]}
          />
          <InputField
            label="Dependents"
            id="dependents"
            name="dependents"
            placeholder="Enter dependents"
          />
          <UploadPicture name="profilePicture" />
        </div>

        {/* Tailwind divider */}
        <div className="divider my-6 h-[1px] bg-gray-200"></div>

        {/* Contact Information */}
        <FormSectionTitle title="Contact Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <InputField
            label="UNHCR Email"
            id="unhcrEmail"
            name="unhcrEmail"
            placeholder="Enter UNHCR email"
            type="email"
          />
          <InputField
            label="Private Email"
            id="privateEmail"
            name="privateEmail"
            placeholder="Enter private email"
            type="email"
          />
          <InputField
            label="Mobile Syriatel"
            id="mobileSyriatel"
            name="mobileSyriatel"
            placeholder="Enter Syriatel mobile number"
          />
          <InputField
            label="Mobile MTN"
            id="mobileMtn"
            name="mobileMtn"
            placeholder="Enter MTN mobile number"
          />
          <InputField
            label="Home Phone"
            id="homePhone"
            name="homePhone"
            placeholder="Enter home phone number"
          />
          <InputField
            label="Extension"
            id="extension"
            name="extension"
            placeholder="Enter extension"
          />
          <InputField
            label="Radio Call"
            id="radio"
            name="radio"
            placeholder="Enter radio call"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500 font-semibold">
            Emergency Contact
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
            <InputField
              label={""}
              id="emergencyContactName"
              name="emergencyContactName"
              placeholder="Enter emergency contact name"
            />
            <InputField
              label={""}
              id="emergencyContactRelationship"
              name="emergencyContactRelationship"
              placeholder="Enter emergency contact relationship"
            />
            <InputField
              label={""}
              name="emergencyContactMobile"
              id="emergencyContactMobile"
              placeholder="Enter emergency contact mobile number"
            />
          </div>
        </div>
        {/* Tailwind divider */}
        <div className="divider my-6 h-[1px] bg-gray-200"></div>

        {/* Official Documents Information */}
        <FormSectionTitle title="Official Documents Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <SelectField
            label="Contract Type"
            id="contractType"
            name="contractType"
            placeholder="Select an option"
            options={[
              { value: "Fixed", label: "Fixed" },
              { value: "Temporary", label: "Temporary" },
            ]}
          />
          <InputField
            label="Contract Start Date"
            id="contractStartDate"
            name="contractStartDate"
            type="date"
          />
          <InputField
            label="Contract End Date"
            id="contractEndDate"
            name="contractEndDate"
            type="date"
          />
          <InputField
            label="National ID Number"
            id="nationalIdNumber"
            name="nationalIdNumber"
            placeholder="Enter national ID number"
          />
          <InputField
            label="Passport Number"
            id="passportNumber"
            name="passportNumber"
            placeholder="Enter passport number"
          />
          <InputField
            label="Passport Expiry Date"
            id="passportExpiryDate"
            name="passportExpiryDate"
            type="date"
          />
          <InputField
            label="UNLP Number"
            id="unlpNumber"
            name="unlpNumber"
            placeholder="Enter UNLP number"
          />
          <InputField
            label="UNLP Expiry Date"
            id="unlpExpiryDate"
            name="unlpExpiryDate"
            type="date"
          />
        </div>

        {/* Tailwind divider */}
        <div className="divider my-6 h-[1px] bg-gray-200"></div>

        {/* Other Information */}
        <FormSectionTitle title="Other Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <SelectField
            label="Critical Staff"
            id="criticalStaff"
            name="criticalStaff"
            placeholder="Select an option"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
            value={formData.criticalStaff || ""} // Bind value to state
            onChange={handleSelectChange} // Update state on change
          />
          {formData.criticalStaff === "" && (
            <p className="text-gray-500 text-sm mt-1">N/A</p>
          )}
          <SelectField
            label="Warden"
            id="warden"
            name="warden"
            placeholder="Select an option"
            options={[
              { value: "Warden", label: "Warden" },
              { value: "Deputy", label: "Deputy" },
              { value: "None", label: "None" },
            ]}
          />
          <SelectField
            label="Floor Marshal"
            id="floorMarshal"
            name="floorMarshal"
            placeholder="Select an option"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
          <SelectField
            label="ETB"
            id="etb"
            name="etb"
            placeholder="Select an option"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
          <SelectField
            label="IFAK"
            id="ifak"
            name="ifak"
            placeholder="Select an option"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
          <SelectField
            label="Advanced Driving"
            id="advancedDriving"
            name="advancedDriving"
            placeholder="Select an option"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
          <SelectField
            label="Inside DS"
            id="insideDs"
            name="insideDs"
            placeholder="Select an option"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
          <SelectField
            label="Outside DS"
            id="outsideDs"
            name="outsideDs"
            placeholder="Select an option"
            options={[
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ]}
          />
        </div>

        {/* Tailwind divider */}
        <div className="divider my-6 h-[1px] bg-gray-200"></div>

        {/* Address Information */}
        <FormSectionTitle title="Address Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <div className="flex flex-wrap justify-between gap-4">
            <InputField
              label="Neighborhood"
              id="neighborhood"
              name="addressNeighborhood"
              placeholder="Enter neighborhood"
            />
            <InputField
              label="Street"
              id="street"
              name="addressStreet"
              placeholder="Enter street"
            />
            <InputField
              label="Building"
              id="building"
              name="addressBuilding"
              placeholder="Enter building"
            />
            <InputField
              label="Floor"
              id="floor"
              name="addressFloor"
              placeholder="Enter floor"
            />
            <InputField
              label="Apartment"
              id="apartment"
              name="addressApartment"
              placeholder="Enter apartment"
            />
            <InputField
              label="Latitude"
              id="latitude"
              name="latitude"
              placeholder="Enter latitude"
            />
            <InputField
              label="Longitude"
              id="longitude"
              name="longitude"
              placeholder="Enter longitude"
            />
          </div>
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

export default AddStaff;
