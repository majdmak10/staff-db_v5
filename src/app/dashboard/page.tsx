"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StaffCard from "@/components/dashboard/StaffCard";
// import StaffPanel from "@/components/StaffPanel";
import UsefulLinks from "@/components/dashboard/UsefulLinks";
import { getCurrentAdminRole } from "@/lib/actions";

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const staffInside = 10; // Replace with actual data
  const staffOutside = 5; // Replace with actual data
  const totalStaff = staffInside + staffOutside;

  useEffect(() => {
    const fetchRole = async () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
      const adminRole = await getCurrentAdminRole(cookie);
      setRole(adminRole);
    };

    fetchRole();
  }, [router]);

  if (role === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex gap-3 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-4/5 flex flex-col gap-8">
        {/* STAFF CARDS */}
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
          <StaffCard
            iconSrc="/cards_icons/staff_total.png" // Path to your image for total staff
            altText="Total Staff Icon"
            title="Total Staff"
            number={totalStaff}
            link="/total-staff"
            textColor="text-uBlue"
          />
          <StaffCard
            iconSrc="/cards_icons/staff_inside.png" // Path to your image for staff inside
            altText="Staff Inside Icon"
            title="Staff Inside Aleppo"
            number={staffInside}
            link="/staff-inside"
            textColor="text-mGreen"
          />
          <StaffCard
            iconSrc="/cards_icons/staff_outside.png" // Path to your image for staff outside
            altText="Staff Outside Icon"
            title="Staff Outside Aleppo"
            number={staffOutside}
            link="/staff-outside"
            textColor="text-mRed"
          />
        </div>
        <div>
          {/* <StaffPanel imageSrc="/" name="Majd Makdessi" phone="0944613809" /> */}
          Staff Panel
        </div>
        <div>Staff Inside Duty Station Panel</div>
        <div>Staff Outside Duty Station Panel</div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/5 flex flex-col">
        <UsefulLinks />
      </div>
    </div>
  );
};

export default Dashboard;
