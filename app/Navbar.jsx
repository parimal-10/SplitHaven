"use client"
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const links = [
    { label: "Friends", href: "/friends" },
    { label: "Trips", href: "/trips" },
  ];

  const [isMenuOpen, setMenuOpen] = useState(false);

  const currentPath = usePathname();

  function handleToggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  const [friendsSection, setFriendsSection] = useState(true);

  function handleFriendsSection() {
    setFriendsSection(true);
    setTripsSection(false);
  }

  const [tripsSection, setTripsSection] = useState(false);

  function handleTripsSection() {
    setTripsSection(true);
    setFriendsSection(false);
  }

  const shouldShowElement = window.innerWidth >= 640;

  return (
    <nav className="bg-neededPurple p-4">
      <div className="container mx-auto flex items-center left-2">
        <div
          className="hover:bg-neededBlue p-2 rounded-full cursor-pointer"
          onClick={handleToggleMenu}
        >
          <img
            src="/hamburger-icon.png"
            style={{ height: "25px" }}
            alt="Menu"
          />
        </div>

        {/* Logo */}
        <Link href="/">
          <div className="items-center space-x-4 ml-5 flex">
            {shouldShowElement && (
              <img src="logo.png" alt="Logo" className="h-8 w-8" />
            )}

            <span className="text-white text-xl font-bold">SplitHaven</span>
          </div>
        </Link>

        {/* Profile */}
        <div className="flex items-center space-x-4 ml-auto">
          <div className="relative">
            <img src="" alt="Profile" className="h-8 w-8 rounded-full" />
          </div>

          {shouldShowElement && (
            <span className="text-white hidden sm:block">Username</span>
          )}
        </div>

        {/* Responsive Menu */}
        {isMenuOpen && (
          <div className="fixed left-0 top-16 right-0 bottom-0 bg-black bg-opacity-50 z-50">
            <div className="absolute left-0 top-0 h-full bg-neededBlue w-64 text-center">
              {/* Menu content goes here */}
              {links.map((link) => (
                <Link
                  key={link.href}
                  className={`${link.href === currentPath ? "bg-neededCyan text-black" : "text-white"} m-4 rounded-lg block py-2 font-bold text-xl mt-4 hover:bg-neededCyan hover:text-black`}
                  href={link.href} 
                  onClick={handleFriendsSection}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
