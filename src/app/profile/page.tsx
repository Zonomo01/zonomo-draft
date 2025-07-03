"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Settings,
  HelpCircle,
  CreditCard,
  Bell,
  Shield,
  Users,
  FileText,
  LogOut,
  Edit,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ProfilePage() {
  const { isDarkMode } = useTheme();
  const [user] = useState({
    name: "USERNAME",
    email: "user@example.com",
    phone: "+91 9876543210",
    avatar: "/placeholder-avatar.jpg",
  });

  const menuItems = [
    {
      icon: MapPin,
      title: "Manage Address",
      href: "/profile/address",
      color: "text-purple-400",
    },
    {
      icon: Settings,
      title: "Settings",
      href: "/settings",
      color: "text-purple-400",
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      href: "/help-support",
      color: "text-purple-400",
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      href: "/profile/payment",
      color: "text-purple-400",
    },
  ];

  const settingsItems = [
    {
      icon: Bell,
      title: "Notifications",
      hasToggle: true,
      enabled: true,
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      hasToggle: false,
    },
    {
      icon: Users,
      title: "Refer Friends",
      hasToggle: false,
    },
    {
      icon: FileText,
      title: "Terms & Conditions",
      hasToggle: false,
    },
  ];

  return (
    <div
      className={`transition-colors duration-300 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      <div className="px-4 pt-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Link href="/" className="mr-4">
              <ArrowLeft
                className={`w-6 h-6 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              />
            </Link>
            <h1
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Profile
            </h1>
          </div>

          {/* User Profile Card */}
          <div
            className="rounded-2xl p-6 mb-6"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "#f9fafb",
              border: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.2)" : "#e5e7eb"
              }`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2
                    className={`text-lg font-semibold ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {user.name}
                  </h2>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {user.email}
                  </p>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {user.phone}
                  </p>
                </div>
              </div>
              <button className="p-2">
                <Edit className="w-5 h-5 text-purple-400" />
              </button>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <div
                  className="rounded-2xl p-4 transition-colors"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "#f9fafb",
                    border: `1px solid ${
                      isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e5e7eb"
                    }`,
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-200"
                      }`}
                    >
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Settings List */}
          <div className="space-y-1 mb-6">
            {settingsItems.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-4"
                style={{
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "#f9fafb",
                  border: `1px solid ${
                    isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e5e7eb"
                  }`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-purple-400" />
                    <span
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  {item.hasToggle ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={item.enabled}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-300"
                        }`}
                      ></div>
                    </label>
                  ) : (
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isDarkMode ? "bg-gray-600" : "bg-gray-400"
                      }`}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <button
            className="w-full rounded-2xl p-4 transition-colors hover:bg-red-600/20"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.05)"
                : "#f9fafb",
              border: `1px solid ${
                isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#e5e7eb"
              }`,
            }}
          >
            <div className="flex items-center justify-center space-x-3">
              <LogOut className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
