'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, ArrowRight, ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductReel from '@/components/ProductReel';
import ServiceCategories from '@/components/ServiceCategories';
import { Button, buttonVariants } from '@/components/ui/button';
import VapiWidget from '@/components/VapiWidget';

const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY!;
const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;

const perks = [
  {
    name: 'Quick & Easy Booking',
    Icon: ArrowDownToLine,
    description: 'Find and book the perfect service provider in minutes.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every service provider on our platform is verified to ensure the highest quality standards. Not happy? We offer a satisfaction guarantee.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

export default function Home() {
  const { isDarkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMounted]);

  const heroBanners = [
    {
      title: "Don't miss out !",
      subtitle: "Up to 25% offer",
      description: "On all mobile services",
      buttonText: "Book Now",
      image: "/checkout-thank-you.jpg",
    },
    {
      title: "Special Weekend Deal",
      subtitle: "Up to 40% off",
      description: "On home cleaning services",
      buttonText: "Book Now",
      image: "/nav/ui-kits/purple.jpg",
    },
  ];

  const topPicksServices = [
    {
      title: "Deep clean with foam-jet AC service",
      subtitle: "AC service & repair",
      price: "Book now",
      bgColor: "bg-gray-100",
      textColor: "text-black",
      image: "/nav/ui-kits/purple.jpg",
      href: "/products?category=ac-service",
    },
    {
      title: "Kitchen cleaning starting at ₹399 only",
      subtitle: "",
      price: "Book now",
      bgColor: "bg-green-600",
      textColor: "text-white",
      image: "/nav/ui-kits/blue.jpg",
      href: "/products?category=kitchen-cleaning",
    },
    {
      title: "Transform your space with wall panels",
      subtitle: "Starting at ₹6,999 only",
      price: "Book now",
      bgColor: "bg-amber-800",
      textColor: "text-white",
      image: "/nav/ui-kits/mixed.jpg",
      href: "/products?category=wall-panels",
    },
  ];

  const serviceCategories = [
    {
      name: "Beauty At Home",
      price: "From ₹499",
      image: "/nav/ui-kits/purple.jpg",
      href: "/products?category=beauty",
    },
    {
      name: "Appliance Service & Repair",
      price: "From ₹499",
      image: "/nav/ui-kits/blue.jpg",
      href: "/products?category=appliance",
    },
    {
      name: "Home Projects & Decor",
      price: "From ₹499",
      image: "/nav/ui-kits/mixed.jpg",
      href: "/products?category=home-decor",
    },
    {
      name: "Kitchen Service",
      price: "From ₹499",
      image: "/nav/icons/picks.jpg",
      href: "/products?category=kitchen",
    },
    {
      name: "Beauty At Home",
      price: "From ₹499",
      image: "/nav/icons/new.jpg",
      href: "/products?category=beauty-2",
    },
    {
      name: "Appliance Service & Repair",
      price: "From ₹499",
      image: "/nav/icons/bestsellers.jpg",
      href: "/products?category=appliance-2",
    },
    {
      name: "Home Projects & Decor",
      price: "From ₹499",
      image: "/nav/ui-kits/purple.jpg",
      href: "/products?category=home-decor-2",
    },
    {
      name: "Kitchen Service",
      price: "From ₹499",
      image: "/nav/ui-kits/blue.jpg",
      href: "/products?category=kitchen-2",
    },
  ];

  const extraServiceCategories = [
    {
      name: "Laundry Service",
      price: "From ₹299",
      image: "/nav/icons/picks.jpg",
      href: "/products?category=laundry",
    },
    {
      name: "Medical Checkup",
      price: "From ₹999",
      image: "/nav/icons/new.jpg",
      href: "/products?category=medical",
    },
    {
      name: "AC Repair",
      price: "From ₹699",
      image: "/nav/icons/bestsellers.jpg",
      href: "/products?category=ac-repair",
    },
    {
      name: "Pest Control",
      price: "From ₹599",
      image: "/nav/ui-kits/mixed.jpg",
      href: "/products?category=pest-control",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Excellent service, highly professional and timely.",
      avatar: "/placeholder-avatar.jpg",
      initials: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 5,
      comment: "Very professional and good service quality.",
      avatar: "/placeholder-avatar.jpg",
      initials: "JS",
    },
    {
      id: 3,
      name: "Raj Patel",
      rating: 5,
      comment: "Amazing experience! Will definitely book again.",
      avatar: "/placeholder-avatar.jpg",
      initials: "RP",
    },
    {
      id: 4,
      name: "Priya Singh",
      rating: 5,
      comment: "Quick response and excellent service. Highly recommend.",
      avatar: "/placeholder-avatar.jpg",
      initials: "PS",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className={`text-4xl font-bold tracking-tight sm:text-6xl ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Your marketplace for high-quality{' '}
            <span className={isDarkMode ? "text-blue-400" : "text-black"}>house services</span>.
          </h1>
          <p className={`mt-6 text-lg max-w-prose ${
            isDarkMode ? "text-gray-300" : "text-muted-foreground"
          }`}>
            Welcome to Zonomo. Every service provider on our
            platform is carefully vetted to ensure the highest quality standards.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link href='/products' className={buttonVariants()}>
              Browse Services
            </Link>
            <Button variant='ghost'>
              Our quality promise &rarr;
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Hero Banner Carousel */}
      <div className="px-4 pt-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <div
            className={`relative rounded-2xl overflow-hidden p-6 mb-8 border-2 ${
              isDarkMode ? "border-white/70 hover:border-white" : "border-gray-200 hover:border-gray-300"
            } transition-all duration-300`}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: isDarkMode 
                ? `0 0 10px rgba(255, 255, 255, 0.5)` 
                : `0 0 10px rgba(0, 0, 0, 0.1)`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {heroBanners[currentSlide].title}
                </h2>
                <p className="text-white/80 mb-1">
                  {heroBanners[currentSlide].subtitle}
                </p>
                <p className="text-white/80 text-sm mb-4">
                  {heroBanners[currentSlide].description}
                </p>
                <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-medium hover:bg-white/30 transition-colors">
                  {heroBanners[currentSlide].buttonText}
                </button>
              </div>
              <div className="w-24 h-24 relative">
                <Image
                  src={heroBanners[currentSlide].image}
                  alt="Hero banner"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {heroBanners.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Perks Section */}
      <section className={`border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"} bg-gray-50 ${isDarkMode ? "bg-gray-900" : ""}`}>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className={`text-base font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {perk.name}
                  </h3>
                  <p className={`mt-3 text-sm ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Top Picks For You Section */}
      <div className="px-4 mb-8">
        <h3 className={`text-xl font-medium mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Top Picks For You
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {topPicksServices.map((service, index) => (
            <Link key={index} href={service.href}>
              <div
                className={`relative rounded-3xl overflow-hidden p-6 min-w-[280px] h-40 ${service.bgColor} flex items-center justify-between border-2 ${
                  isDarkMode ? "border-white/70 hover:border-white" : "border-gray-200 hover:border-gray-300"
                } transition-all duration-300`}
                style={{
                  boxShadow: isDarkMode 
                    ? `0 0 10px rgba(255, 255, 255, 0.5)` 
                    : `0 0 10px rgba(0, 0, 0, 0.1)`,
                }}
              >
                <div className="flex-1">
                  <h4
                    className={`font-bold text-lg mb-2 ${service.textColor} leading-tight`}
                  >
                    {service.title}
                  </h4>
                  {service.subtitle && (
                    <p
                      className={`text-sm mb-3 ${service.textColor} opacity-80`}
                    >
                      {service.subtitle}
                    </p>
                  )}
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      service.bgColor === "bg-gray-100"
                        ? "bg-black text-white"
                        : "bg-white/20 text-white backdrop-blur-sm"
                    }`}
                  >
                    {service.price}
                  </button>
                </div>
                <div className="w-20 h-20 relative ml-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Horizontal Line Separator */}
      <div className="px-4 mb-8">
        <div className={`w-full h-px ${isDarkMode ? "bg-white/20" : "bg-gray-200"}`}></div>
      </div>

      {/* All Category Section */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            All Category
          </h3>
          <Link href="/products" className="text-sm font-bold text-blue-600">
            SEE ALL
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {serviceCategories.map((category, index) => (
            <Link key={index} href={category.href}>
              <div
                className={`relative rounded-2xl overflow-hidden p-2 h-44 ${
                  isDarkMode ? "bg-gray-800/20" : "bg-white"
                } backdrop-blur-sm border-2 ${
                  isDarkMode ? "border-white/70 hover:border-white" : "border-gray-200 hover:border-gray-300"
                } shadow-sm transition-all duration-300`}
                style={{
                  boxShadow: isDarkMode 
                    ? `0 0 10px rgba(255, 255, 255, 0.5)` 
                    : `0 0 10px rgba(0, 0, 0, 0.1)`,
                }}
              >
                <div className="relative w-full h-28 mb-2 rounded-xl overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center px-1">
                  <h4 className={`font-medium text-xs mb-1 leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {category.name}
                  </h4>
                  <p className="text-xs font-bold text-blue-600">
                    {category.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Extra Service Categories */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            More Services
          </h3>
          <Link href="/products" className="text-sm font-bold text-blue-600">
            VIEW ALL
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {extraServiceCategories.map((category, index) => (
            <Link key={index} href={category.href}>
              <div
                className={`relative rounded-2xl overflow-hidden p-2 h-44 ${
                  isDarkMode ? "bg-gray-800/20" : "bg-white"
                } backdrop-blur-sm border-2 ${
                  isDarkMode ? "border-white/70 hover:border-white" : "border-gray-200 hover:border-gray-300"
                } shadow-sm transition-all duration-300`}
                style={{
                  boxShadow: isDarkMode 
                    ? `0 0 10px rgba(255, 255, 255, 0.5)` 
                    : `0 0 10px rgba(0, 0, 0, 0.1)`,
                }}
              >
                <div className="relative w-full h-28 mb-2 rounded-xl overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center px-1">
                  <h4 className={`font-medium text-xs mb-1 leading-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {category.name}
                  </h4>
                  <p className="text-xs font-bold text-blue-600">
                    {category.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="px-4 mb-8">
        <h3 className={`text-xl font-medium mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Customer Reviews
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`rounded-2xl p-4 ${
                isDarkMode ? "bg-gray-800/20" : "bg-white"
              } border-2 ${
                isDarkMode ? "border-white/70 hover:border-white" : "border-gray-200 hover:border-gray-300"
              } transition-all duration-300`}
              style={{
                boxShadow: isDarkMode 
                  ? `0 0 10px rgba(255, 255, 255, 0.5)` 
                  : `0 0 10px rgba(0, 0, 0, 0.1)`,
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {review.initials}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className={`font-medium text-sm ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {review.name}
                    </h5>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Section */}
      <div className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-2xl p-6 text-center border-2 ${
              isDarkMode ? "border-white/70 hover:border-white" : "border-gray-200 hover:border-gray-300"
            } transition-all duration-300`}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: isDarkMode 
                ? `0 0 10px rgba(255, 255, 255, 0.5)` 
                : `0 0 10px rgba(0, 0, 0, 0.1)`,
            }}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Refer and get free services
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Invite your friends and earn rewards
            </p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Refer Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Reel and Service Categories */}
      <ProductReel
        query={{ sort: 'desc', limit: 4 }}
        href='/products?sort=recent'
        title='Brand new'
      />
      
      <ServiceCategories />
      
      <VapiWidget apiKey={apiKey} assistantId={assistantId} />
    </div>
  );
}