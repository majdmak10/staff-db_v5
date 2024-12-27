import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/shared/buttons/AddButton";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import Image from "next/image";
import Link from "next/link";
import { getStaff } from "@/lib/data";
import { deleteStaff } from "@/lib/actions";
import Table from "@/components/shared/table/Table";

const StaffPage = async () => {
  const staff = await getStaff();

  const columns = [
    {
      key: "checkbox",
      label: <input type="checkbox" aria-label="Select all rows" />,
      width: "50px",
    },
    { key: "profilePicture", label: "Picture", width: "100px" },
    { key: "fullName", label: "Full Name", width: "250px" },
    { key: "dateOfBirth", label: "Date of Birth", width: "120px" },
    { key: "sex", label: "Sex", width: "100px" },
    { key: "nationality", label: "Nationality", width: "140px" },
    { key: "employmentType", label: "Employment Type", width: "160px" },
    { key: "position", label: "Position", width: "250px" },
    { key: "unit", label: "Unit", width: "200px" },
    { key: "bloodType", label: "Blood Type", width: "120px" },
    { key: "dependents", label: "Dependents", width: "100px" },
    { key: "unhcrEmail", label: "UNHCR Email", width: "250px" },
    { key: "privateEmail", label: "Private Email", width: "250px" },
    { key: "mobileSyriatel", label: "Mobile (Syriatel)", width: "160px" },
    { key: "mobileMtn", label: "Mobile (MTN)", width: "160px" },
    { key: "homePhone", label: "Home Phone", width: "160px" },
    { key: "extension", label: "Extension", width: "100px" },
    { key: "radio", label: "Radio", width: "100px" },
    { key: "emergencyContact", label: "Emergency Contact", width: "200px" },
    { key: "contractType", label: "Contract Type", width: "140px" },
    { key: "contractStartDate", label: "Contract Start Date", width: "170px" },
    { key: "contractEndDate", label: "Contract End Date", width: "170px" },
    { key: "nationalIdNumber", label: "National ID Number", width: "170px" },
    { key: "passportNumber", label: "Passport Number", width: "170px" },
    {
      key: "passportExpiryDate",
      label: "Passport Expiry Date",
      width: "180px",
    },
    { key: "unlpNumber", label: "UNLP Number", width: "170px" },
    { key: "unlpExpiryDate", label: "UNLP Expiry Date", width: "170px" },
    { key: "criticalStaff", label: "Critical Staff", width: "120px" },
    { key: "warden", label: "Warden", width: "120px" },
    { key: "floorMarshal", label: "Floor Marshal", width: "140px" },
    { key: "etb", label: "ETB", width: "100px" },
    { key: "ifak", label: "IFAK", width: "100px" },
    { key: "advancedDriving", label: "Advanced Driving", width: "170px" },
    { key: "insideDs", label: "Inside DS", width: "120px" },
    { key: "outsideDs", label: "Outside DS", width: "120px" },
    { key: "address", label: "Address", width: "250px" },
    { key: "actions", label: "Actions", width: "120px" },
  ];

  const data = staff.map((staff) => ({
    checkbox: <input type="checkbox" aria-label="Select row" />, // Row checkbox
    profilePicture: (
      <Link href={`/dashboard/staff/${staff.id}`}>
        <Image
          src={
            staff.profilePicture ||
            (staff.sex === "male"
              ? "/avatars/noProfilePicture_m.png"
              : "/avatars/noProfilePicture_f.png")
          }
          alt={`${staff.fullName}'s Profile Picture`}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-fill"
        />
      </Link>
    ),
    fullName: (
      <Link href={`/dashboard/staff/${staff.id}`}>{staff.fullName}</Link>
    ),
    dateOfBirth: staff.dateOfBirth
      ? new Date(staff.dateOfBirth).toLocaleDateString("en-US")
      : "N/A", // Ensure it's a string
    sex: staff.sex || "N/A",
    nationality: staff.nationality || "N/A",
    employmentType: staff.employmentType || "N/A",
    position: staff.position || "N/A",
    unit: staff.unit || "N/A",
    bloodType: staff.bloodType || "N/A",
    dependents: staff.dependents || "N/A",
    unhcrEmail: staff.unhcrEmail || "N/A",
    privateEmail: staff.privateEmail || "N/A",
    mobileSyriatel: staff.mobileSyriatel || "N/A",
    mobileMtn: staff.mobileMtn || "N/A",
    homePhone: staff.homePhone || "N/A",
    extension: staff.extension || "N/A",
    radio: staff.radio || "N/A",
    emergencyContact: staff.emergencyContact
      ? `${staff.emergencyContact.fullName} (${staff.emergencyContact.relationship}) - ${staff.emergencyContact.mobile}`
      : "N/A", // Convert to string
    contractType: staff.contractType || "N/A",
    contractStartDate: staff.contractStartDate
      ? new Date(staff.contractStartDate).toLocaleDateString("en-US")
      : "N/A", // Ensure it's a string
    contractEndDate: staff.contractEndDate
      ? new Date(staff.contractEndDate).toLocaleDateString("en-US")
      : "N/A", // Ensure it's a string
    nationalIdNumber: staff.nationalIdNumber || "N/A",
    passportNumber: staff.passportNumber || "N/A",
    passportExpiryDate: staff.passportExpiryDate
      ? new Date(staff.passportExpiryDate).toLocaleDateString("en-US")
      : "N/A", // Ensure it's a string
    unlpNumber: staff.unlpNumber || "N/A",
    unlpExpiryDate: staff.unlpExpiryDate
      ? new Date(staff.unlpExpiryDate).toLocaleDateString("en-US")
      : "N/A", // Ensure it's a string
    criticalStaff: staff.criticalStaff ? "Yes" : "No",
    warden: staff.warden || "N/A",
    floorMarshal: staff.floorMarshal ? "Yes" : "No",
    etb: staff.etb ? "Yes" : "No",
    ifak: staff.ifak ? "Yes" : "No",
    advancedDriving: staff.advancedDriving ? "Yes" : "No",
    insideDs: staff.insideDs ? "Yes" : "No",
    outsideDs: staff.outsideDs ? "Yes" : "No",
    address: staff.address
      ? `${staff.address.neighborhood}, ${staff.address.street}, ${staff.address.building}, ${staff.address.floor}, ${staff.address.apartment}`
      : "N/A",
    actions: (
      <div className="flex gap-2 justify-start items-center">
        <Link href={`/dashboard/staff/${staff.id}`}>
          <Image
            src="/table_icons/view.png"
            alt="View"
            width={20}
            height={20}
          />
        </Link>
        <Link href={`/dashboard/staff/${staff.id}/edit`}>
          <Image
            src="/table_icons/edit.png"
            alt="Edit"
            width={20}
            height={20}
          />
        </Link>
        <DeleteButton id={staff.id} type="staff" deleteAction={deleteStaff} />
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between bg-white rounded-lg p-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Staff", href: "/dashboard/staff" },
          ]}
        />
        <AddButton href="/dashboard/staff/add" />
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 w-full">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default StaffPage;
