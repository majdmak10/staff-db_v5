"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { jwtDecode } from "jwt-decode";

const Search = dynamic(() => import("./Search"), {
  ssr: false,
});

interface DecodedToken {
  id: string;
  fullName: string;
  role: string;
}

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState<string>("Admin");
  const [role, setRole] = useState<string>("Role");

  // Decode the JWT and set the username and role
  useEffect(() => {
    const fetchUser = () => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (cookie) {
        try {
          const decoded = jwtDecode<DecodedToken>(cookie);
          console.log("Decoded Token:", decoded); // Debugging line
          setFullName(decoded.fullName || "Full Name");
          // setUsername(decoded.username || "User");
          setRole(decoded.role || "Role");
        } catch (err) {
          console.error("Failed to decode token:", err);
        }
      }
    };

    fetchUser();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, avatarRef]);

  return (
    <div className="flex items-center justify-between p-4 bg-mBlue rounded-lg">
      {/* TITLE */}
      <div className="text-white font-bold">Welcome, {fullName}</div>

      {/* SEARCH BAR and USER */}
      <div className="flex md:gap-2 items-center">
        {/* SEARCH BAR */}
        <div>
          <Search />
        </div>

        {/* USER */}
        <div className="relative flex items-center md:gap-2 justify-end w-full">
          <div className="flex flex-col">
            <span className="hidden md:block text-xs font-bold text-white">
              {fullName}
            </span>
            <span className="hidden md:block text-[10px] text-white text-right">
              {role}
            </span>
          </div>

          {/* Avatar with Arrow Icon */}
          <div
            className="relative cursor-pointer w-9 h-9"
            ref={avatarRef}
            onClick={toggleDropdown}
          >
            <Image
              src="/navbar_icons/admin_avatars/majd_makdessi.jpg"
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full w-9 h-9"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full cursor-pointer">
              <Image
                src="/navbar_icons/dropdown_arrow.png"
                alt="Dropdown Arrow"
                width={11}
                height={11}
                className={`transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                } transition-transform`}
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 bottom-[-5px] transform translate-y-full w-32 bg-white shadow-lg rounded-lg p-2"
            >
              <div className="flex flex-col">
                <span className="md:hidden text-xs font-bold">{fullName}</span>
                <span className="md:hidden text-[10px]">{role}</span>
                <hr className="md:hidden my-2 border-[#d4d4d8]" />
              </div>
              <ul className="text-[14px] text-gray-700">
                <li className="flex py-2 pr-2 pl-1 hover:bg-[#d8d8d8] cursor-pointer rounded-lg gap-2">
                  <Image
                    src="/navbar_icons/settings.svg"
                    alt="Settings"
                    width={16}
                    height={16}
                  />
                  Settings
                </li>
                <li className="flex py-2 pr-2 pl-1 hover:bg-[#d8d8d8] cursor-pointer rounded-lg gap-2">
                  <Image
                    src="/navbar_icons/help.svg"
                    alt="Help"
                    width={16}
                    height={16}
                  />
                  Help
                </li>
                <li className="flex py-2 pr-2 pl-1 hover:bg-[#d8d8d8] cursor-pointer rounded-lg gap-2">
                  <Image
                    src="/navbar_icons/logout.svg"
                    alt="Logout"
                    width={16}
                    height={16}
                  />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
