"use client";

import { useEffect, useState } from "react";
import StaffCard from "@/components/dashboard/StaffCard";
import UsefulLinks from "@/components/dashboard/UsefulLinks";
import { getStaffCounts } from "@/utils/getStaffActions";
import StaffPanel from "@/components/dashboard/StaffPanel";
import StaffInsidePanel from "@/components/dashboard/StaffInsidePanel";
import StaffOutsidePanel from "@/components/dashboard/StaffOutsidePanel";

// Define the type for our staff data
type StaffCounts = {
  totalStaff: number | null;
  staffInside: number | null;
  staffOutside: number | null;
};

const Dashboard = () => {
  const [staffData, setStaffData] = useState<StaffCounts>({
    totalStaff: null,
    staffInside: null,
    staffOutside: null,
  });

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const counts = await getStaffCounts();
        setStaffData(counts);
      } catch (error) {
        console.error("Failed to fetch staff data:", error);
        // Set to zeros in case of error
        setStaffData({
          totalStaff: 0,
          staffInside: 0,
          staffOutside: 0,
        });
      }
    };

    fetchStaffData();
  }, []);

  return (
    <div className="flex gap-3 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-4/5 flex flex-col gap-8">
        {/* STAFF CARDS */}
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
          <StaffCard
            iconSrc="/cards_icons/staff_total.png"
            altText="Total Staff Icon"
            title="Total Staff"
            number={staffData.totalStaff}
            link="/total-staff"
            textColor="text-uBlue"
          />
          <StaffCard
            iconSrc="/cards_icons/staff_inside.png"
            altText="Staff Inside Icon"
            title="Staff Inside Aleppo"
            number={staffData.staffInside}
            link="/staff-inside"
            textColor="text-mGreen"
          />
          <StaffCard
            iconSrc="/cards_icons/staff_outside.png"
            altText="Staff Outside Icon"
            title="Staff Outside Aleppo"
            number={staffData.staffOutside}
            link="/staff-outside"
            textColor="text-mRed"
          />
        </div>
        <div>
          <StaffPanel />
        </div>
        <div>
          <StaffInsidePanel />
        </div>
        <div>
          <StaffOutsidePanel />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/5 flex flex-col">
        <UsefulLinks />
      </div>
    </div>
  );
};

export default Dashboard;
