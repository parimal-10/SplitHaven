"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import axios from "axios"

export default function Navbar() {
  const { data: session } = useSession({
    required: true,
  });

  const userEmail = session?.user?.email;
  const [avatar, setAvatar] = useState(null);
  let shouldShowElement;

  const links = [
    { label: "Friends", href: "/dashboard/friends" },
    { label: "Trips", href: "/dashboard/trips" },
  ];

  useEffect (() => {
    async function getAvatar() {
      try {

        const response = (await axios.post("/api/avatar"));
        setAvatar(response.data.avatar)

      } catch (err) { 
        console.log("Error getting avatar for navbar");
      }
    };
    
    getAvatar();
  }, []);

  useEffect(() => {

    shouldShowElement = window.innerWidth >= 640;

  }, [window.innerWidth]);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const currentPath = usePathname();

  function handleToggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

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
              <img src="/homepage.png" alt="Logo" className="h-8 w-8 rounded-full" />
            )}

            <span className="text-white text-xl font-bold">SplitHaven</span>
          </div>
        </Link>

        {/* Profile */}
        <div className="flex items-center space-x-4 ml-auto">
          <Link href="/dashboard">
            <div className="relative">
              <img src={`/avatar-${avatar}.jpg`} alt="Profile" className="h-8 w-8 rounded-full" />
            </div>
          </Link>
          <Link href="/dashboard">
            {shouldShowElement && (
              <span className="text-white hidden sm:block">{userEmail?.slice(0, userEmail.lastIndexOf("@"))}</span>
            )}
          </Link>
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
                  onClick={handleToggleMenu}
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
