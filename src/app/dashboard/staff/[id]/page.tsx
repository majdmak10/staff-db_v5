import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import Image from "next/image";
import Link from "next/link";
import FormSectionTitle from "@/components/shared/form/FormSectionTitle";
import ProfileInfo from "@/components/shared/profile/ProfileInfo";
import StaffProfileMap from "@/components/shared/profile/StaffProfileMap";
import { getStaffById } from "@/lib/data";
import { deleteStaff } from "@/lib/actions";
import { convertToDMS } from "@/utils/convertToDMS";

const StaffProfile = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const staff = await getStaffById(id);

  if (!staff) {
    return <div>Staff not found</div>;
  }

  const latitude = staff.address?.latitude
    ? parseFloat(staff.address.latitude)
    : null;
  const longitude = staff.address?.longitude
    ? parseFloat(staff.address.longitude)
    : null;

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Staff", href: "/dashboard/staff" },
          {
            label: `${staff.fullName}`,
            href: `/dashboard/staff/${staff.id}`,
          },
        ]}
      />
      <div className="flex flex-col bg-white rounded-lg w-full p-4">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <FormSectionTitle
              title="General Information"
              className="text-mBlue"
            />
            <div className="flex justify-end pr-4 gap-3">
              <Link href={`/dashboard/staff/${staff.id}/edit`}>
                <Image
                  src="/table_icons/edit.png"
                  alt="Edit"
                  width={20}
                  height={20}
                />
              </Link>
              <DeleteButton
                id={staff.id}
                type="staff"
                deleteAction={deleteStaff}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="flex flex-col justify-center items-center gap-2 p-4 w-full border-r-[1px] border-[#eaeaea] md:col-span-1">
              <Image
                src={
                  staff.profilePicture ||
                  (staff.sex === "Male"
                    ? "/avatars/noProfilePicture_m.png"
                    : "/avatars/noProfilePicture_f.png")
                }
                alt={`${staff.fullName}'s Profile Picture`}
                width={140}
                height={140}
                className="rounded-3xl object-fill border-2 border-[#eaeaea]"
              />
              <h3 className="text-md font-bold">{staff.fullName}</h3>
              <span className="font-normal text-sm">{staff.position}</span>
              <span className="font-normal text-sm">{staff.unit}</span>
            </div>

            <div className="flex flex-col gap-2 p-4 w-full md:col-span-2">
              <ProfileInfo
                spanTitle="Date of Birth:"
                spanInfo={
                  staff.dateOfBirth
                    ? staff.dateOfBirth.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A" // Optional: Fallback in case `dateOfBirth` is undefined
                }
              />
              <ProfileInfo spanTitle="Sex:" spanInfo={staff.sex ?? "N/A"} />
              <ProfileInfo
                spanTitle="Nationality:"
                spanInfo={staff.nationality ?? "N/A"}
              />
              <ProfileInfo
                spanTitle="Employment Type:"
                spanInfo={staff.employmentType ?? "N/A"}
              />
              <ProfileInfo
                spanTitle="Position:"
                spanInfo={staff.position ?? "N/A"}
              />
              <ProfileInfo spanTitle="Unit: " spanInfo={staff.unit ?? "N/A"} />
              <ProfileInfo
                spanTitle="Blood Type:"
                spanInfo={staff.bloodType ?? "N/A"}
              />
              <ProfileInfo
                spanTitle="Dependents:"
                spanInfo={staff.dependents ?? "N/A"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col bg-white rounded-lg w-full p-4 gap-2">
          <FormSectionTitle
            title="Contact Information"
            className="text-mRed mb-3"
          />
          <ProfileInfo
            spanTitle="UNHCR Email:"
            spanInfo={staff.unhcrEmail ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Private Email:"
            spanInfo={staff.privateEmail ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Mobile (Syriatel):"
            spanInfo={staff.mobileSyriatel ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Mobile (MTN):"
            spanInfo={staff.mobileMtn ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Home Phone:"
            spanInfo={staff.homePhone ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Office Extension:"
            spanInfo={staff.extension ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Radio Call:"
            spanInfo={staff.radio ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Emergency Contact:"
            spanInfo={
              staff.emergencyContact
                ? `${staff.emergencyContact.fullName}, ${staff.emergencyContact.relationship}, ${staff.emergencyContact.mobile}`
                : "N/A"
            }
          />
        </div>
        <div className="flex flex-col bg-white rounded-lg w-full p-4 gap-2">
          <FormSectionTitle
            title="Official Documents Information"
            className="text-mGreen mb-3"
          />
          <ProfileInfo
            spanTitle="Contract Type:"
            spanInfo={staff.contractType ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Contract Start Date:"
            spanInfo={
              staff.contractStartDate
                ? staff.contractStartDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"
            }
          />
          <ProfileInfo
            spanTitle="Contract End Date:"
            spanInfo={
              staff.contractEndDate
                ? staff.contractEndDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"
            }
          />
          <ProfileInfo
            spanTitle="National ID Number:"
            spanInfo={staff.nationalIdNumber ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="National Passport Number:"
            spanInfo={staff.passportNumber ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="National Passport Expiry Date:"
            spanInfo={
              staff.passportExpiryDate
                ? staff.passportExpiryDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"
            }
          />
          <ProfileInfo
            spanTitle="UNLP Number:"
            spanInfo={staff.unlpNumber ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="UNLP Expiry Date:"
            spanInfo={
              staff.unlpExpiryDate
                ? staff.unlpExpiryDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"
            }
          />
        </div>
        <div className="flex flex-col bg-white rounded-lg w-full p-4 gap-2">
          <FormSectionTitle
            title="Other Information"
            className="text-mBorderWarning mb-3"
          />
          <ProfileInfo
            spanTitle="Critical Staff:"
            spanInfo={
              typeof staff.criticalStaff === "boolean"
                ? staff.criticalStaff
                  ? "Yes"
                  : "No"
                : staff.criticalStaff ?? "N/A"
            }
          />
          <ProfileInfo spanTitle="Warden:" spanInfo={staff.warden ?? "N/A"} />
          <ProfileInfo
            spanTitle="Floor Marshal:"
            spanInfo={staff.floorMarshal ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="ETB:"
            spanInfo={
              typeof staff.etb === "boolean"
                ? staff.etb
                  ? "Yes"
                  : "No"
                : staff.etb ?? "N/A"
            }
          />
          <ProfileInfo
            spanTitle="IFAK:"
            spanInfo={
              typeof staff.ifak === "boolean"
                ? staff.ifak
                  ? "Yes"
                  : "No"
                : staff.ifak ?? "N/A"
            }
          />
          <ProfileInfo
            spanTitle="Advanced Driving:"
            spanInfo={
              typeof staff.advancedDriving === "boolean"
                ? staff.advancedDriving
                  ? "Yes"
                  : "No"
                : staff.advancedDriving ?? "N/A"
            }
          />
          <ProfileInfo
            spanTitle="Inside DS:"
            spanInfo={
              typeof staff.insideDs === "boolean"
                ? staff.insideDs
                  ? "Yes"
                  : "No"
                : staff.insideDs ?? "N/A"
            }
          />
          <ProfileInfo
            spanTitle="Outside DS:"
            spanInfo={
              typeof staff.outsideDs === "boolean"
                ? staff.outsideDs
                  ? "Yes"
                  : "No"
                : staff.outsideDs ?? "N/A"
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white rounded-lg w-full p-4">
        <div>
          <FormSectionTitle
            title="Address Information"
            className="text-mPurple mb-3"
          />

          <ProfileInfo
            spanTitle="Neighborhood:"
            spanInfo={staff.address?.neighborhood ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Street:"
            spanInfo={staff.address?.street ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Building:"
            spanInfo={staff.address?.building ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Floor:"
            spanInfo={staff.address?.floor ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Apartment:"
            spanInfo={staff.address?.apartment ?? "N/A"}
          />
          <ProfileInfo
            spanTitle="Latitude:"
            spanInfo={latitude !== null ? convertToDMS(latitude, true) : "N/A"}
          />
          <ProfileInfo
            spanTitle="Longitude:"
            spanInfo={
              longitude !== null ? convertToDMS(longitude, false) : "N/A"
            }
          />
        </div>
        <div className="w-full md:col-span-2">
          <StaffProfileMap latitude={latitude} longitude={longitude} />
        </div>
      </div>
    </main>
  );
};

export default StaffProfile;
