"use client";

import NavbarClient from "@/components/NavbarClient";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Determine if we should show the navbar
    const params = new URLSearchParams(window.location.search);
    const hasCategory = params.has("category");
    // Show navbar only on /products without category param
    setShowNavbar(pathname === "/products" && !hasCategory);
  }, [pathname]);

  return (
    <main className="relative flex flex-col min-h-screen">
      {showNavbar && <NavbarClient user={null} />}
      <div className="flex-grow flex-1">{children}</div>
    </main>
  );
}
