"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

interface BookServiceButtonProps {
  product: Product;
}

export default function BookServiceButton({ product }: BookServiceButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];

  const handleBookService = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    setIsLoading(true);

    try {
      // Add service to cart with booking details
      addItem(product, selectedDate, selectedTime, "MORNING");

      // Navigate to cart/checkout
      router.push("/cart");
    } catch (error) {
      console.error("Error booking service:", error);
      alert("Failed to book service. Please try again.");
    } finally {
      setIsLoading(false);
      setShowBookingModal(false);
    }
  };

  const openBookingModal = () => {
    setShowBookingModal(true);
  };

  // Get next 7 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  return (
    <>
      <button
        onClick={openBookingModal}
        className="w-full purple-button rounded-xl py-3 px-6 text-white font-medium hover:scale-105 transition-transform"
      >
        Book Now - ${product.price}/hr
      </button>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-white text-xl font-bold mb-6">
              Book {product.name}
            </h3>

            {/* Service Details */}
            <div className="review-card rounded-xl p-4 mb-6">
              <h4 className="text-white font-medium mb-2">{product.name}</h4>
              <p className="text-gray-400 text-sm mb-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-purple-400 font-semibold">
                  ${product.price}/hr
                </span>
                <span className="text-gray-400 text-sm">
                  {product.duration}h duration
                </span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="text-white font-medium mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Select Date
              </label>
              <div className="grid grid-cols-2 gap-2">
                {getAvailableDates().map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedDate === date
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label className="text-white font-medium mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedTime === time
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBookService}
                disabled={isLoading || !selectedDate || !selectedTime}
                className="flex-1 purple-button py-3 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
