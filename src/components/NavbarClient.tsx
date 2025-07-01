"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, Bell, MapPin, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavbarClientProps {
  user?: {
    email: string;
  } | null;
}

const NavbarClient = ({ user }: NavbarClientProps) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (pathname === "/") setActiveTab("Home");
    else if (pathname.includes("/bookings")) setActiveTab("Bookings");
    else if (pathname.includes("/profile")) setActiveTab("Profile");
    else if (pathname.includes("/settings")) setActiveTab("Settings");
  }, [pathname, isMounted]);

  // Don't render navbar on cart page
  if (pathname === "/cart") {
    return null;
  }

  const navigationTabs = [
    { name: "Home", href: "/" },
    { name: "Bookings", href: "/bookings" },
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
  ];

  // Get page title based on current path
  const getPageTitle = () => {
    if (pathname.includes("/bookings")) return "Bookings";
    if (pathname.includes("/profile")) return "Profile";
    if (pathname.includes("/settings")) return "Settings";
    return "Home";
  };

  return (
    <div className="relative">
      {/* Main Header */}
      <div className="zonomo-gradient px-4 py-6 w-full">
        {/* Show full header only on home page */}
        {pathname === "/" && (
          <>
            {/* Top row with logo on left, icons on right - No container constraint */}
            <div className="flex items-center justify-between mb-4 w-full">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-white">ZONOMO</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/cart" className="relative">
                  <ShoppingCart className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                </Link>
                <Bell className="w-6 h-6 text-white hover:text-gray-300 transition-colors cursor-pointer" />
              </div>
            </div>

            {/* User greeting and location - Constrained container */}
            <div className="max-w-4xl mx-auto">
              <div className="text-white mb-4">
                <h2 className="text-lg font-medium">
                  Hi, {user?.email?.split("@")[0]?.toUpperCase() || "USERNAME"}
                </h2>
                <div className="flex items-center mt-1 text-sm opacity-80">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>DHAHNA MOBILE</span>
                </div>
              </div>

              {/* Search bar - Constrained container */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white z-10" />
                <input
                  type="text"
                  placeholder="Search for services..."
                  className="w-full search-bar rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20 relative z-0"
                />
              </div>
            </div>
          </>
        )}

        {/* Header for non-home pages */}
        {pathname !== "/" && (
          <div className="flex items-center justify-center mb-6 relative">
            <Link href="/" className="absolute left-0">
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-xl font-bold text-white">{getPageTitle()}</h1>
          </div>
        )}

        {/* Navigation tabs - always show - centered with container */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-1 bg-black/20 rounded-xl p-1">
            {navigationTabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`nav-tab flex-1 text-center py-2 px-4 rounded-lg text-sm font-medium ${
                  activeTab === tab.name
                    ? "active bg-white/20 text-white"
                    : "text-white/70 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarClient;
