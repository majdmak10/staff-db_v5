import React from "react";
import Link from "next/link";

const UsefulLinks: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 text-sm p-5 bg-white rounded-lg">
        <h3 className="font-bold text-sm">UNHCR Links</h3>
        <Link
          href="https://wd3.myworkday.com/unhcr/d/home.htmld"
          className="hover:underline"
        >
          Workday
        </Link>
        <Link
          href="https://prv.unhcrsyria.org/Home/"
          className="hover:underline"
        >
          UNHCR Syria Portal
        </Link>
        <Link href="https://mip-portal.unhcr.org/" className="hover:underline">
          UNHCR Medical
        </Link>
      </div>
      <div className="flex flex-col gap-2 text-sm p-5 bg-white rounded-lg">
        <h3 className="font-bold text-sm">Useful Links</h3>
        <Link
          href="https://dss.un.org/TRIP/TRIP-My-Travel-Requests"
          className="hover:underline"
        >
          TRIP
        </Link>
        <Link href="https://unbooking.org/en/" className="hover:underline">
          UN Booking Hub
        </Link>
        <Link href="https://www.unfcu.org/" className="hover:underline">
          UNFCU
        </Link>
      </div>
    </div>
  );
};

export default UsefulLinks;
