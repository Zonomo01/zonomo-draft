"use client";

import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isBeautyPage =
    pathname === "/products" && searchParams.get("category") === "beauty";
  return (
    <main className="relative flex flex-col min-h-screen">
      <Providers>
        {!isBeautyPage && <Navbar />}
        <div className="flex-grow flex-1">{children}</div>
      </Providers>
    </main>
  );
}
