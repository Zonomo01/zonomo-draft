import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn, constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Inder } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import AIButton from "@/components/AIButton";
import ClientOnly from "@/components/ClientOnly";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });
const inder = Inder({ subsets: ["latin"], weight: "400" });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current URL from headers
  const headersList = headers();
  const url = headersList.get("x-url") || "";
  let hideNavbar = false;
  try {
    const parsedUrl = new URL(url, "http://localhost");
    // Hide Navbar for all /products pages and their subroutes
    hideNavbar = parsedUrl.pathname.startsWith("/products");
  } catch {}

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <meta name="theme-color" content="#4CAF50" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Zonomo" />
      </head>
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <ThemeProvider>
          <main className="relative flex flex-col min-h-screen">
            <Providers>
              {!hideNavbar && <Navbar />}
              <div className="flex-grow flex-1">{children}</div>
            </Providers>
          </main>
          <Toaster position="top-center" richColors />
          <ClientOnly>
            <PWAInstallPrompt />
            <AIButton />
          </ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}
