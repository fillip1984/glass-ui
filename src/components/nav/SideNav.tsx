import React from "react";
import { FaHome, FaInfoCircle, FaPhone } from "react-icons/fa";

export default function SideNav() {
  const menuItems = [
    { name: "Home", icon: <FaHome />, href: "/" },
    { name: "About", icon: <FaInfoCircle />, href: "/about" },
    { name: "Contact", icon: <FaPhone />, href: "/contact" },
  ];
  return (
    <nav className="glass m-2 min-w-50 rounded-xl">
      <ul className="flex flex-col gap-2 p-4 text-xl font-bold">
        {menuItems.map((item) => (
          <li key={item.href} className="relative">
            <a
              href={item.href}
              className="group relative flex w-fit items-center gap-2"
            >
              {item.icon} {item.name}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
