"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, Search, ShoppingCart, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);
  const { isDarkMode } = useTheme();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  // Beauty Category Specific Design matching exact image
  if (category === "beauty") {
    return (
      <div className="relative min-h-screen w-full">
        {/* Full-page black background layer */}
        <div
          style={{
            backgroundColor: "#141414",
            minHeight: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
        {/* Search Bar */}
        <div className="flex justify-center px-4 mt-10 mb-4 relative z-10">
          <div
            className="bg-gray-600/80 backdrop-blur-sm rounded-3xl px-4 py-3 flex items-center"
            style={{ width: "500px" }}
          >
            <Search className="w-5 h-5 text-gray-300 mr-3" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-white placeholder-gray-300 outline-none text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        {/* Beauty & Wellness Title with Back Arrow */}
        <div className="flex items-center px-6 py-3 bg-gray-700/80 backdrop-blur-sm mx-6 rounded-2xl mb-6">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <h1
            className="text-white text-2xl font-normal"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Beauty & Wellness
          </h1>
        </div>

        {/* Hero Image Banners */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="relative h-48 rounded-3xl overflow-hidden">
              <Image
                src="/figma-images/hero-banner-1.jpg"
                alt="Beauty service banner 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-3xl overflow-hidden">
              <Image
                src="/figma-images/hero-banner-2.jpg"
                alt="Beauty service banner 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 rounded-3xl overflow-hidden">
              <Image
                src="/figma-images/hero-banner-3.jpg"
                alt="Beauty service banner 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Top Picks Section */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between">
            <h2
              className="text-white text-xl font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Top Picks For You
            </h2>
            <button
              className="text-white text-sm font-bold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Sort
            </button>
          </div>
        </div>

        {/* White Divider Line */}
        <div className="px-6 mb-8">
          <div className="w-full h-px bg-white/30"></div>
        </div>

        {/* Beauty At Home Section */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-start mb-6">
            <h3
              className="text-white text-xl font-normal"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Beauty At Home
            </h3>
          </div>

          {/* Beauty Salon Cards Grid - First Row */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Diksha Headmaster Salon */}
            <div className="relative">
              <Link href="/services/diksha-headmaster/book">
                <div className="relative h-60 bg-gray-200/10 backdrop-blur-sm rounded-2xl border-2 border-gray-300 p-3 hover:bg-gray-200/20 transition-all duration-300">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-200">
                    <Image
                      src="/figma-images/salon-diksha.jpg"
                      alt="Diksha Headmaster Salon"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center px-1">
                    <h4
                      className="text-white font-medium text-base leading-tight"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Diksha Headmater
                      <br />
                      Sallon
                    </h4>
                  </div>
                </div>
              </Link>
            </div>

            {/* Lakme Salon */}
            <div className="relative">
              <Link href="/services/lakme/book">
                <div className="relative h-60 bg-gray-200/10 backdrop-blur-sm rounded-2xl border-2 border-gray-300 p-3 hover:bg-gray-200/20 transition-all duration-300">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-200">
                    <Image
                      src="/figma-images/salon-lakme.jpg"
                      alt="Lakme Salon"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center px-1">
                    <h4
                      className="text-white font-medium text-base leading-tight"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Lakme Salon
                    </h4>
                  </div>
                </div>
              </Link>
            </div>

            {/* Looks Salon */}
            <div className="relative">
              <Link href="/services/looks/book">
                <div className="relative h-60 bg-gray-200/10 backdrop-blur-sm rounded-2xl border-2 border-gray-300 p-3 hover:bg-gray-200/20 transition-all duration-300">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-200">
                    <Image
                      src="/figma-images/salon-looks.jpg"
                      alt="Looks Salon"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center px-1">
                    <h4
                      className="text-white font-medium text-base leading-tight"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Looks Salon
                    </h4>
                  </div>
                </div>
              </Link>
            </div>

            {/* Hair's Inn Bridal Studio */}
            <div className="relative">
              <Link href="/bookings">
                <div className="relative h-60 bg-gray-200/10 backdrop-blur-sm rounded-2xl border-2 border-gray-300 p-3 hover:bg-gray-200/20 transition-all duration-300">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-200">
                    <Image
                      src="/figma-images/salon-hairs-inn.jpg"
                      alt="Hair's Inn Bridal Studio"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center px-1">
                    <h4
                      className="text-white font-medium text-base leading-tight"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Hair&apos;s Inn Bridal
                      <br />
                      Studio & salon
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Beauty Salon Cards Grid - Second Row */}
          <div className="grid grid-cols-4 gap-4">
            {/* Hair's Inn Bridal Studio (Second) */}
            <div className="relative">
              <Link href="/bookings">
                <div className="relative h-60 bg-gray-200/10 backdrop-blur-sm rounded-2xl border-2 border-gray-300 p-3 hover:bg-gray-200/20 transition-all duration-300">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-200">
                    <Image
                      src="/figma-images/salon-looks.jpg"
                      alt="Hair's Inn Bridal Studio"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center px-1">
                    <h4
                      className="text-white font-medium text-base leading-tight"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Hair&apos;s Inn Bridal
                      <br />
                      Studio & salon
                    </h4>
                  </div>
                </div>
              </Link>
            </div>

            {/* Glamor Inn Bridal Studio */}
            <div className="relative">
              <Link href="/bookings">
                <div className="relative h-60 bg-gray-200/10 backdrop-blur-sm rounded-2xl border-2 border-gray-300 p-3 hover:bg-gray-200/20 transition-all duration-300">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-200">
                    <Image
                      src="/figma-images/salon-glamor.jpg"
                      alt="Glamor Inn Bridal Studio"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center px-1">
                    <h4
                      className="text-white font-medium text-base leading-tight"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Glamor Inn Bridal
                      <br />
                      Studio
                    </h4>
                  </div>
                </div>
              </Link>
            </div>

            {/* Annie Beauty Parlor */}
            <div className="relative">
              <Link href="/bookings">
                <div className="relative h-60 bg-gray-200/10 backdrop-blur-sm rounded-2xl border-2 border-gray-300 p-3 hover:bg-gray-200/20 transition-all duration-300">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-200">
                    <Image
                      src="/figma-images/salon-annie.jpg"
                      alt="Annie Beauty Parlor"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center px-1">
                    <h4
                      className="text-white font-medium text-base leading-tight"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Annie Beauty Parlor
                    </h4>
                  </div>
                </div>
              </Link>
            </div>

            {/* Empty fourth slot */}
            <div className="relative opacity-0">
              <div className="relative h-60"></div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Space */}
        <div className="h-20"></div>
      </div>
    );
  }

  // Default Products Page for other categories
  const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
      {children}
    </div>
  );

  const ProductReel = ({ query, title, subtitle }: any) => (
    <div className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="text-center py-20">
        <p className="text-gray-600">Services will be displayed here</p>
      </div>
    </div>
  );

  return (
    <MaxWidthWrapper>
      <ProductReel
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
        title={label ?? "Browse all house services"}
        subtitle="Discover a wide range of services for your home."
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
