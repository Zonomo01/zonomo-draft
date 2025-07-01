"use client";

import { useEffect, useState, useRef } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const checkIfInstalled = () => {
      if (typeof window !== "undefined") {
        if (
          window.matchMedia("(display-mode: standalone)").matches ||
          (window.navigator as any).standalone ||
          document.referrer.includes("android-app://")
        ) {
          setIsInstalled(true);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("beforeinstallprompt", handler);
      checkIfInstalled();
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeinstallprompt", handler);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for browsers that don't support PWA installation
      alert(
        "To install this app:\n\n1. On Chrome: Click the menu (⋮) → 'Install Zonomo'\n2. On Safari: Click Share → 'Add to Home Screen'\n3. On Edge: Click the menu (⋯) → 'Apps' → 'Install this site as an app'"
      );
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("User accepted the PWA install prompt.");
        setIsInstalled(true);
      } else {
        console.log("User dismissed the PWA install prompt.");
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error("Error during PWA installation:", error);
    }
  };

  const handleHide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHidden(true);
  };

  // Don't show if not mounted, already installed or user has hidden it
  if (!isMounted || isInstalled || isHidden) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        ref={buttonRef}
        onClick={handleInstallClick}
        className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-purple-500/25"
        title="Install Zonomo App"
      >
        <Download className="w-6 h-6" />

        {/* Close button */}
        <button
          onClick={handleHide}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-all duration-200 opacity-0 group-hover:opacity-100"
          title="Hide install button"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full left-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Install Zonomo App
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
