"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: "/menu_icons/home.png?v=1.0",
          hoverIcon: "/menu_icons/home_h.png?v=1.0",
          label: "Home",
          href: "/dashboard",
        },
        {
          icon: "/menu_icons/admin.png",
          hoverIcon: "/menu_icons/admin_h.png",
          label: "Admins",
          href: "/dashboard/admins",
        },
        {
          icon: "/menu_icons/staff.png?v=1.0",
          hoverIcon: "/menu_icons/staff_h.png?v=1.0",
          label: "Staff",
          href: "/dashboard/staff",
        },
        {
          icon: "/menu_icons/critical_staff.png?v=1.0",
          hoverIcon: "/menu_icons/critical_staff_h.png?v=1.0",
          label: "Critical Staff",
          href: "/dashboard/critical-staff",
        },
        {
          icon: "/menu_icons/warden.png?v=1.0",
          hoverIcon: "/menu_icons/warden_h.png?v=1.0",
          label: "Wardens",
          href: "/dashboard/wardens",
        },
        {
          icon: "/menu_icons/floor_marshal.png?v=1.0",
          hoverIcon: "/menu_icons/floor_marshal_h.png?v=1.0",
          label: "Floor Marshals",
          href: "/dashboard/floor-marshals",
        },
        {
          icon: "/menu_icons/etb.png?v=1.0",
          hoverIcon: "/menu_icons/etb_h.png?v=1.0",
          label: "ETB",
          href: "/dashboard/etb",
        },
        {
          icon: "/menu_icons/ifak.png?v=1.0",
          hoverIcon: "/menu_icons/ifak_h.png?v=1.0",
          label: "IFAK",
          href: "/dashboard/ifak",
        },
        {
          icon: "/menu_icons/advanced_driving.png?v=1.0",
          hoverIcon: "/menu_icons/advanced_driving_h.png?v=1.0",
          label: "Advanced Driving",
          href: "/dashboard/advanced-driving",
        },
        {
          icon: "/menu_icons/inside_ds.png?v=1.0",
          hoverIcon: "/menu_icons/inside_ds_h.png?v=1.0",
          label: "Inside DS",
          href: "/dashboard/inside-ds",
        },
        {
          icon: "/menu_icons/outside_ds.png?v=1.0",
          hoverIcon: "/menu_icons/outside_ds_h.png?v=1.0",
          label: "Outside DS",
          href: "/dashboard/outside-ds",
        },
        {
          icon: "/menu_icons/conops.png?v=1.0",
          hoverIcon: "/menu_icons/conops_h.png?v=1.0",
          label: "ConOps",
          href: "/dashboard/conops",
        },
      ],
    },
    {
      title: "PROFILE",
      items: [
        {
          icon: "/menu_icons/profile.png?v=1.0",
          hoverIcon: "/menu_icons/profile_h.png?v=1.0",
          label: "Profile",
          href: "/profile",
        },
        {
          icon: "/menu_icons/settings.png?v=1.0",
          hoverIcon: "/menu_icons/settings_h.png?v=1.0",
          label: "Settings",
          href: "/settings",
        },
        {
          icon: "/menu_icons/help.png?v=1.0",
          hoverIcon: "/menu_icons/help_h.png?v=1.0",
          label: "Help",
          href: "/help",
        },
        {
          icon: "/menu_icons/logout.png?v=1.0",
          hoverIcon: "/menu_icons/logout_h.png?v=1.0",
          label: "Logout",
          href: "#",
        },
      ],
    },
  ];

  return (
    <div className="text-sm min-h-screen">
      {menuItems.map((i, sectionIndex) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light mt-4">
            {i.title}
          </span>
          {i.items.map((item, itemIndex) => {
            const uniqueKey = `${sectionIndex}-${itemIndex}`;
            const isActive = pathname === item.href;

            return (
              <div
                key={item.label}
                className="relative flex flex-col items-center lg:items-start z-50"
                onMouseEnter={() => !isActive && setHoveredItem(uniqueKey)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center justify-center lg:justify-start gap-4 p-2 md:px-2 hover:text-mBlue rounded-lg hover:bg-mHover w-full ${
                    isActive
                      ? "text-mBlue rounded-lg bg-mHover"
                      : "mText hover:text-mBlue hover:rounded-lg hover:bg-mHover"
                  }`}
                >
                  <Image
                    src={
                      hoveredItem === uniqueKey || isActive
                        ? item.hoverIcon
                        : item.icon
                    }
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
                {/* Tooltip for small screens */}
                {hoveredItem === uniqueKey && (
                  <span className="lg:hidden absolute top-1.5 left-10 text-xs bg-mBlue text-white px-2 py-1 rounded shadow-md whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}

          {sectionIndex === 0 && (
            <div className="divider my-4 h-[1px] bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
