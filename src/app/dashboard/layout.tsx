import Footer from "@/components/layout/Footer";
import Menu from "@/components/layout/Menu";
import MetadataWatcher from "@/components/layout/MetadataWatcher";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: {
    template: "%s",
    default: "Admin Dashboard",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-white">
        {/* LOGO */}
        {/* Large logo for large screens */}
        <Link
          href="/"
          className="flex justify-center items-center lg:justify-start mb-2"
        >
          <Image
            src="/logos/logo_lg.png"
            alt="logo"
            width={150}
            height={50}
            className="hidden lg:block"
          />

          {/* Small logo for small screens */}
          <Image
            src="/logos/logo_sm.png"
            alt="logo small"
            width={50}
            height={50}
            className="block lg:hidden"
          />
        </Link>
        {/* MENU */}
        <Menu />
      </div>

      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] p-3 flex flex-col overflow-auto hide-scrollbar gap-3">
        <Navbar />
        {children}
        <Footer />
      </div>
      <MetadataWatcher eventName="dashboardMetadataChange" />
    </div>
  );
}
