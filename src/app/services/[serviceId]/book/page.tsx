"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { Product } from "@/payload-types";

interface ServiceBookingPageProps {
  params: {
    serviceId: string;
  };
}

export default function ServiceBookingPage({
  params,
}: ServiceBookingPageProps) {
  const { isDarkMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  // Mock service data - replace with actual data fetch
  const service: Product = {
    id: params.serviceId,
    name: "Diksha Headmaster Salon",
    description: "Professional beauty services at your doorstep",
    price: 999,
    images: [
      {
        image: "/figma-images/salon-diksha.jpg",
      },
    ],
    category: "cleaning", // Using cleaning as a placeholder since beauty is not in the type
    serviceLocation: "home",
    serviceType: "one_time",
    duration: 60,
    availability: [
      {
        day: "monday",
        timeSlots: [
          {
            startTime: "09:00",
            endTime: "17:00",
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    priceId: "price_123",
    stripeId: "prod_123",
  };

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
      addItem(service, selectedDate, selectedTime, "MORNING");

      // Navigate to cart/checkout
      router.push("/cart");
    } catch (error) {
      console.error("Error booking service:", error);
      alert("Failed to book service. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen" style={{ backgroundColor: "#161616" }}>
      <div className="px-4 pt-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link href="/products?category=beauty" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-white text-2xl font-semibold">Book Service</h1>
          </div>

          {/* Service Details */}
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-6">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={service.images[0].image as string}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold mb-2">
                  {service.name}
                </h2>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <p className="text-white text-xl font-semibold">
                  ₹{service.price}
                </p>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <label className="text-white font-medium mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Select Date
            </label>
            <div className="grid grid-cols-4 gap-3">
              {getAvailableDates().map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-4 rounded-xl text-sm font-medium transition-colors ${
                    selectedDate === date
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <label className="text-white font-medium mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Select Time
            </label>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 rounded-xl text-sm font-medium transition-colors ${
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

          {/* Booking Button */}
          <button
            onClick={handleBookService}
            disabled={isLoading || !selectedDate || !selectedTime}
            className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
