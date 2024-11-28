"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <div>
      <nav className="flex items-center justify-center text-sm">
        {items.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <span key={index} className="flex items-center">
              {isActive ? (
                <span className="text-gray-500">{item.label}</span>
              ) : (
                <Link href={item.href} legacyBehavior>
                  <a className="text-mBlue hover:underline">{item.label}</a>
                </Link>
              )}
              {index < items.length - 1 && <span className="mx-2">/</span>}
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
