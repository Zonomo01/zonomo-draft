"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Star, Phone } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function BookingsPage() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to format date consistently
  const formatDate = (dateString: string) => {
    if (!isMounted) {
      // Return a simple format for server-side rendering
      return dateString;
    }

    // Client-side formatting
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const bookings = [
    {
      id: 1,
      serviceName: "House Cleaning",
      provider: "John Doe",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "upcoming",
      address: "123 Main St, City",
      price: "₹ 1200",
      rating: 4.8,
      category: "Cleaning",
    },
    {
      id: 2,
      serviceName: "AC Repair",
      provider: "Tech Solutions",
      date: "2024-01-12",
      time: "2:00 PM",
      status: "completed",
      address: "456 Oak Ave, City",
      price: "₹ 1500",
      rating: 5.0,
      category: "Repair",
    },
    {
      id: 3,
      serviceName: "Facial Treatment",
      provider: "Beauty Expert",
      date: "2024-01-10",
      time: "11:00 AM",
      status: "completed",
      address: "789 Pine St, City",
      price: "₹ 800",
      rating: 4.9,
      category: "Beauty",
    },
  ];

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "upcoming"
  );
  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  );

  return (
    <div
      className={`transition-colors duration-300 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      <div className="px-4 pt-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1
            className={`text-2xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Your Bookings
          </h1>

          {/* Tabs */}
          <div
            className={`flex rounded-xl p-1 mb-6 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "upcoming"
                  ? "bg-purple-600 text-white"
                  : isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Upcoming ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "completed"
                  ? "bg-purple-600 text-white"
                  : isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Completed ({completedBookings.length})
            </button>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {(activeTab === "upcoming"
              ? upcomingBookings
              : completedBookings
            ).map((booking) => (
              <div
                key={booking.id}
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
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {booking.serviceName}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {booking.provider}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "upcoming"
                        ? "bg-green-600 text-green-100"
                        : "bg-gray-600 text-gray-100"
                    }`}
                  >
                    {booking.status === "upcoming" ? "Upcoming" : "Completed"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div
                    className={`flex items-center text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{booking.time}</span>
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{booking.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {booking.price}
                    </span>
                    {booking.status === "completed" && (
                      <div className="flex items-center ml-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {booking.rating}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {booking.status === "upcoming" && (
                      <>
                        <button className="text-purple-400 text-sm">
                          Reschedule
                        </button>
                        <button className="text-red-400 text-sm">Cancel</button>
                      </>
                    )}
                    {booking.status === "completed" && (
                      <button className="purple-button px-4 py-1 rounded-full text-white text-sm">
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {(activeTab === "upcoming" ? upcomingBookings : completedBookings)
            .length === 0 && (
            <div className="text-center py-12">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
              >
                <Calendar
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
              </div>
              <h3
                className={`font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                No {activeTab} bookings
              </h3>
              <p
                className={`text-sm mb-6 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {activeTab === "upcoming"
                  ? "You don't have any upcoming bookings"
                  : "You haven't completed any bookings yet"}
              </p>
              <button className="purple-button px-6 py-2 rounded-full text-white font-medium">
                Book a Service
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
