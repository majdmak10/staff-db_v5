import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/shared/form/InputField";
import SelectField from "@/components/shared/form/SelectField";
import FormSectionTitle from "@/components/shared/form/FormSectionTitle";
import { getStaffById } from "@/lib/data";
import { updateStaff } from "@/lib/actions";
import CancelButton from "@/components/shared/buttons/CancelButton";
import MapEditor from "@/components/shared/form/MapEditorWrapper";
import UploadPicture from "@/components/shared/form/UploadPicture";
import Image from "next/image";
import DateInputField from "@/components/shared/form/DateInputField";

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
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Staff", href: "/dashboard/staff" },
          {
            label: "Edit Staff",
            href: `/dashboard/staff/${staffMember.id}/edit`,
          },
        ]}
      />
      <form
        action={updateStaff}
        className="flex flex-col gap-4 bg-white rounded-lg p-4"
      >
        <h1 className="font-semibold">Edit Staff</h1>
        <input type="hidden" name="id" value={staffMember.id} />

        {/* General Information */}
        <FormSectionTitle title="General Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            placeholder={staffMember.fullName}
          />
          <DateInputField
            name="dateOfBirth"
            label="Date of Birth"
            initialDate={
              staffMember.dateOfBirth
                ? new Date(staffMember.dateOfBirth).toISOString().split("T")[0]
                : undefined
            }
          />
          <SelectField
            label="Sex"
            id="sex"
            name="sex"
            placeholder={staffMember.sex}
            options={[
              { value: "Female", label: "Female" },
              { value: "Male", label: "Male" },
            ]}
          />
          <InputField
            label="Nationality"
            id="nationality"
            name="nationality"
            placeholder={staffMember.nationality}
          />
          <SelectField
            label="Employment Type"
            id="employmentType"
            name="employmentType"
            placeholder={staffMember.employmentType}
            options={[
              { value: "International", label: "International" },
              { value: "National", label: "National" },
            ]}
          />
          <InputField
            label="Position"
            id="position"
            name="position"
            placeholder={staffMember.position}
          />
          <SelectField
            label="Unit"
            id="unit"
            name="unit"
            placeholder={staffMember.unit}
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
            placeholder={staffMember.bloodType}
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
            placeholder={staffMember.dependents}
          />
          <UploadPicture />
          <Image
            src={
              staffMember.profilePicture ||
              (staffMember.sex === "Male"
                ? "/avatars/noProfilePicture_m.png"
                : "/avatars/noProfilePicture_f.png")
            }
            alt={`${staffMember.fullName}'s Profile Picture`}
            width={50}
            height={50}
            className="rounded-full w-[80px] h-[80px] object-fill"
          />
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
            placeholder={staffMember.unhcrEmail}
            type="email"
          />
          <InputField
            label="Private Email"
            id="privateEmail"
            name="privateEmail"
            placeholder={staffMember.privateEmail}
            type="email"
          />
          <InputField
            label="Mobile Syriatel"
            id="mobileSyriatel"
            name="mobileSyriatel"
            placeholder={staffMember.mobileSyriatel}
          />
          <InputField
            label="Mobile MTN"
            id="mobileMtn"
            name="mobileMtn"
            placeholder={staffMember.mobileMtn}
          />
          <InputField
            label="Home Phone"
            id="homePhone"
            name="homePhone"
            placeholder={staffMember.homePhone}
          />
          <InputField
            label="Office Extension"
            id="extension"
            name="extension"
            placeholder={staffMember.extension}
          />
          <InputField
            label="Radio Call"
            id="radio"
            name="radio"
            placeholder={staffMember.radio}
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
              placeholder={staffMember.emergencyContact?.fullName}
            />
            <InputField
              label={""}
              id="emergencyContactRelationship"
              name="emergencyContactRelationship"
              placeholder={staffMember.emergencyContact?.relationship}
            />
            <InputField
              label={""}
              name="emergencyContactMobile"
              id="emergencyContactMobile"
              placeholder={staffMember.emergencyContact?.mobile}
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
            placeholder={staffMember.contractType}
            options={[
              { value: "Fixed", label: "Fixed" },
              { value: "Temporary", label: "Temporary" },
            ]}
          />
          <DateInputField
            name="contractStartDate"
            label="Contract Start Date"
            initialDate={
              staffMember.contractStartDate
                ? new Date(staffMember.contractStartDate)
                    .toISOString()
                    .split("T")[0]
                : undefined
            }
          />
          <DateInputField
            name="contractEndDate"
            label="Contract End Date"
            initialDate={
              staffMember.contractEndDate
                ? new Date(staffMember.contractEndDate)
                    .toISOString()
                    .split("T")[0]
                : undefined
            }
          />
          <InputField
            label="National ID Number"
            id="nationalIdNumber"
            name="nationalIdNumber"
            placeholder={staffMember.nationalIdNumber}
          />
          <InputField
            label="Passport Number"
            id="passportNumber"
            name="passportNumber"
            placeholder={staffMember.passportNumber}
          />
          <DateInputField
            name="passportExpiryDate"
            label="Passport Expiry Date"
            initialDate={
              staffMember.passportExpiryDate
                ? new Date(staffMember.passportExpiryDate)
                    .toISOString()
                    .split("T")[0]
                : undefined
            }
          />
          <InputField
            label="UNLP Number"
            id="unlpNumber"
            name="unlpNumber"
            placeholder={staffMember.unlpNumber}
          />
          <DateInputField
            name="unlpExpiryDate"
            label="UNLP Expiry Date"
            initialDate={
              staffMember.unlpExpiryDate
                ? new Date(staffMember.unlpExpiryDate)
                    .toISOString()
                    .split("T")[0]
                : undefined
            }
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
            placeholder={
              staffMember.criticalStaff === true
                ? "Yes"
                : staffMember.criticalStaff === false
                ? "No"
                : "Select an option" // Default placeholder
            }
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
          <SelectField
            label="Warden"
            id="warden"
            name="warden"
            placeholder={staffMember.warden}
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
            placeholder={staffMember.floorMarshal}
            options={[
              { value: "Floor Marshal", label: "Floor Marshal" },
              { value: "Deputy Floor Marshal", label: "Deputy Floor Marshal" },
              { value: "None", label: "None" },
            ]}
          />
          <SelectField
            label="ETB"
            id="etb"
            name="etb"
            placeholder={
              staffMember.etb === true
                ? "Yes"
                : staffMember.etb === false
                ? "No"
                : "Select an option" // Default placeholder
            }
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
          <SelectField
            label="IFAK"
            id="ifak"
            name="ifak"
            placeholder={
              staffMember.ifak === true
                ? "Yes"
                : staffMember.ifak === false
                ? "No"
                : "Select an option" // Default placeholder
            }
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
          <SelectField
            label="Advanced Driving"
            id="advancedDriving"
            name="advancedDriving"
            placeholder={
              staffMember.advancedDriving === true
                ? "Yes"
                : staffMember.advancedDriving === false
                ? "No"
                : "Select an option" // Default placeholder
            }
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
          <SelectField
            label="Inside DS"
            id="insideDs"
            name="insideDs"
            placeholder={
              staffMember.insideDs === true
                ? "Yes"
                : staffMember.insideDs === false
                ? "No"
                : "Select an option" // Default placeholder
            }
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
          <SelectField
            label="Outside DS"
            id="outsideDs"
            name="outsideDs"
            placeholder={
              staffMember.outsideDs === true
                ? "Yes"
                : staffMember.outsideDs === false
                ? "No"
                : "Select an option" // Default placeholder
            }
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
          />
        </div>

        {/* Tailwind divider */}
        <div className="divider my-6 h-[1px] bg-gray-200"></div>

        {/* Address Information */}
        <FormSectionTitle title="Address Information" />
        <div className="w-full md:col-span-2">
          <MapEditor
            initialLatitude={staffMember.address?.latitude || "36.2021"}
            initialLongitude={staffMember.address?.longitude || "37.1343"}
            initialAddress={{
              neighborhood: staffMember.address?.neighborhood,
              street: staffMember.address?.street,
              building: staffMember.address?.building,
              floor: staffMember.address?.floor,
              apartment: staffMember.address?.apartment,
            }}
          />
        </div>

        {/* Submit Buttons Section */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-mBlue text-sm text-white p-2 rounded-md w-16"
          >
            Save
          </button>
          <CancelButton />
        </div>
      </form>
    </main>
  );
};

export default EditStaff;
