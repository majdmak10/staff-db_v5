import { getStaffById } from "@/lib/data";
import { deleteStaff } from "@/lib/actions";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import Image from "next/image";
import Link from "next/link";

const StaffProfile = async ({ params }: { params: { id: string } }) => {
  const staff = await getStaffById(params.id);

  if (!staff) {
    return <div>Staff not found</div>;
  }

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Staff", href: "/dashboard/staff" },
          { label: `${staff.fullName}`, href: `/dashboard/staff/${staff.id}` },
        ]}
      />
      <div className="flex flex-col bg-white rounded-lg w-full p-4">
        <div className="flex justify-end p-4 gap-3">
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
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="flex flex-col items-center gap-2 p-4 w-full border-r-[1px] border-[#eaeaea]">
            <Image
              src={
                staff.profilePicture ||
                (staff.sex === "male"
                  ? "/avatars/noProfilePicture_m.png"
                  : "/avatars/noProfilePicture_f.png")
              }
              alt={`${staff.fullName}'s Profile Picture`}
              width={180}
              height={200}
              className="rounded-3xl object-fill border-2 border-[#eaeaea]"
            />
            <h3 className="text-md font-bold">{staff.fullName}</h3>
            <span className="font-normal text-sm">{staff.position}</span>
            <span className="font-normal text-sm">{staff.unit}</span>
            <div>
              <>
                {staff.criticalStaff && (
                  <span className="py-1 px-2 rounded-lg text-[12px] text-white bg-mRed">
                    Critical
                  </span>
                )}
                {(staff.warden === "Warden" ||
                  staff.warden === "Deputy Warden") && (
                  <span className="py-1 px-2 rounded-lg text-[12px] text-white bg-mGreen">
                    {staff.warden === "Warden" ? "Warden" : "Deputy Warden"}
                  </span>
                )}
                {(staff.floorMarshal === "Floor Marshal" ||
                  staff.floorMarshal === "Deputy Floor Marshal") && (
                  <span className="py-1 px-2 rounded-lg text-[12px] text-white bg-mBlue">
                    {staff.floorMarshal === "Floor Marshal"
                      ? "Floor Marshal"
                      : "Deputy Floor Marshal"}
                  </span>
                )}
              </>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 w-full border-r-[1px] border-[#eaeaea]">
            <p>
              <span className="font-bold">Date of Birth: </span>
              <span className="font-normal">
                Date of Birth:{" "}
                {staff.dateOfBirth?.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
            <p>
              <span className="font-bold">Sex: </span>
              <span className="font-normal">{staff.sex}</span>
            </p>
            <p>
              <span className="font-bold">Nationality: </span>
              <span className="font-normal">{staff.nationality}</span>
            </p>
            <p>
              <span className="font-bold">Employment Type: </span>
              <span className="font-normal">{staff.employmentType}</span>
            </p>
            <p>
              <span className="font-bold">Blood Type: </span>
              <span className="font-normal">{staff.bloodType}</span>
            </p>
            <p>
              <span className="font-bold">Dependents: </span>
              <span className="font-normal">{staff.dependents}</span>
            </p>
            <p>
              <span className="font-bold">UNHCR Email: </span>
              <span className="font-normal">{staff.unhcrEmail}</span>
            </p>
            <p>
              <span className="font-bold">Private Email: </span>
              <span className="font-normal">{staff.privateEmail}</span>
            </p>
            <p>
              <span className="font-bold">Mobile (Syriatel): </span>
              <span className="font-normal">{staff.mobileSyriatel}</span>
            </p>
            <p>
              <span className="font-bold">Mobile (MTN): </span>
              <span className="font-normal">{staff.mobileMtn}</span>
            </p>
            <p>
              <span className="font-bold">Home Phone: </span>
              <span className="font-normal">{staff.homePhone}</span>
            </p>
            <p>
              <span className="font-bold">Office Extension: </span>
              <span className="font-normal">{staff.extension}</span>
            </p>
            <p>
              <span className="font-bold">Radio Sign: </span>
              <span className="font-normal">{staff.radio}</span>
            </p>
            <p>
              <span className="font-semibold">Emergency Contact: </span>
              <span className="font-normal">
                {staff.emergencyContact
                  ? staff.emergencyContact.fullName
                  : "N/A"}
                {", "}
                {staff.emergencyContact
                  ? staff.emergencyContact.relationship
                  : "N/A"}
                {", "}
                {staff.emergencyContact ? staff.emergencyContact.mobile : "N/A"}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 w-full border-r-[1px] border-[#eaeaea]">
            <span className="font-normal">
              Contract Type: {staff.contractType}
            </span>
            <span className="font-normal">
              Contract Start Date:{" "}
              {staff.contractStartDate?.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="font-normal">
              Contract End date:{" "}
              {staff.contractStartDate?.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="font-normal">
              National ID Number: {staff.nationalIdNumber}
            </span>
            <span className="font-normal">
              National Passport Number: {staff.passportNumber}
            </span>
            <span className="font-normal">
              Passport Expiry Date:{" "}
              {staff.contractStartDate?.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="font-normal">UNLP Number: {staff.unlpNumber}</span>
            <span className="font-normal">
              UNLP Expiry Date:{" "}
              {staff.contractStartDate?.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="font-normal">
              Critical Staff: {staff.criticalStaff ? "Yes" : "No"}
            </span>
            <span className="font-normal">Warden: {staff.warden}</span>
            <span className="font-normal">
              Floor Marshal: {staff.floorMarshal}
            </span>
            <span className="font-normal">ETB: {staff.etb ? "Yes" : "No"}</span>
            <span className="font-normal">
              IFAK: {staff.ifak ? "Yes" : "No"}
            </span>
            <span className="font-normal">
              Advanced Driving: {staff.advancedDriving ? "Yes" : "No"}
            </span>
            <span className="font-normal">
              Inside DS: {staff.insideDs ? "Yes" : "No"}
            </span>
            <span className="font-normal">
              Outside DS: {staff.outsideDs ? "Yes" : "No"}
            </span>
          </div>
        </div>
        <div>Address</div>
      </div>
    </main>
  );
};

export default StaffProfile;
