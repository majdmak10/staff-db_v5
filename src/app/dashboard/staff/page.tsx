import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/shared/buttons/AddButton";
import Table from "@/components/shared/table/Table";
import { getStaff } from "@/lib/data";
import { deleteStaff } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import staffColumns from "@/constants/columns/staffColumns";
import {
  formatBoolean,
  formatDate,
  getProfilePicture,
  formatAddress,
} from "@/utils/staffUtils";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import { convertToDMS } from "@/utils/convertToDMS";

const StaffPage = async () => {
  const staff = await getStaff();

  const data = staff.map((member) => ({
    id: member.id,
    checkbox: (
      <input
        type="checkbox"
        aria-label="Select row"
        className="w-4 h-4 accent-mBlue mt-1"
      />
    ), // Row checkbox
    profilePicture: (
      <Link href={`/dashboard/staff/${member.id}`}>
        <Image
          src={getProfilePicture(member.profilePicture, member.sex)}
          alt={`${member.fullName}'s Profile Picture`}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-fill"
        />
      </Link>
    ),
    fullName: (
      <Link href={`/dashboard/staff/${member.id}`}>{member.fullName}</Link>
    ),
    dateOfBirth: formatDate(member.dateOfBirth),
    sex: member.sex || "N/A",
    nationality: member.nationality || "N/A",
    employmentType: member.employmentType || "N/A",
    position: member.position || "N/A",
    unit: member.unit || "N/A",
    bloodType: member.bloodType || "N/A",
    dependents: member.dependents || "N/A",
    unhcrEmail: member.unhcrEmail || "N/A",
    privateEmail: member.privateEmail || "N/A",
    mobileSyriatel: member.mobileSyriatel || "N/A",
    mobileMtn: member.mobileMtn || "N/A",
    homePhone: member.homePhone || "N/A",
    extension: member.extension || "N/A",
    radio: member.radio || "N/A",
    emergencyContact: member.emergencyContact
      ? `${member.emergencyContact.fullName} (${member.emergencyContact.relationship}) - ${member.emergencyContact.mobile}`
      : "N/A",
    contractType: member.contractType || "N/A",
    contractStartDate: formatDate(member.contractStartDate),
    contractEndDate: formatDate(member.contractEndDate),
    nationalIdNumber: member.nationalIdNumber || "N/A",
    passportNumber: member.passportNumber || "N/A",
    passportExpiryDate: formatDate(member.passportExpiryDate),
    unlpNumber: member.unlpNumber || "N/A",
    unlpExpiryDate: formatDate(member.unlpExpiryDate),
    criticalStaff: formatBoolean(member.criticalStaff),
    warden: member.warden || "N/A",
    floorMarshal: member.floorMarshal || "N/A",
    etb: formatBoolean(member.etb),
    ifak: formatBoolean(member.ifak),
    advancedDriving: formatBoolean(member.advancedDriving),
    insideDs: formatBoolean(member.insideDs),
    outsideDs: formatBoolean(member.outsideDs),
    address: formatAddress(member.address),
    latitude: member.address?.latitude
      ? convertToDMS(parseFloat(member.address.latitude), true)
      : "N/A",
    longitude: member.address?.longitude
      ? convertToDMS(parseFloat(member.address.longitude), false)
      : "N/A",
    actions: (
      <div className="flex gap-2 justify-start items-center">
        <Link href={`/dashboard/staff/${member.id}`}>
          <Image
            src="/table_icons/view.png"
            alt="View"
            width={20}
            height={20}
          />
        </Link>
        <Link href={`/dashboard/staff/${member.id}/edit`}>
          <Image
            src="/table_icons/edit.png"
            alt="Edit"
            width={20}
            height={20}
          />
        </Link>
        <DeleteButton id={member.id} type="staff" deleteAction={deleteStaff} />
      </div>
    ),
  }));

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between bg-white rounded-lg p-4 mb-3">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Staff", href: "/dashboard/staff" },
          ]}
        />
        <AddButton href="/dashboard/staff/add" />
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 w-full">
        <Table
          columns={staffColumns}
          data={data}
          deleteAction={deleteStaff}
          type="staff"
        />
      </div>
    </div>
  );
};

export default StaffPage;
