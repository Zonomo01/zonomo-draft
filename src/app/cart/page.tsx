"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Check, Loader2, X, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Page = () => {
  const { items, removeItem } = useCart();

  const router = useRouter();

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const productIds = items.map(({ product }) => product.id);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const fee = 1;

  return (
    <div
      className="text-white min-h-screen"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Custom Header with Back Button - Using Gradient Theme */}
      <div className="zonomo-gradient px-4 py-6">
        <div className="flex items-center justify-center relative">
          <button
            onClick={() => router.push("/")}
            className="absolute left-0 flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="font-medium">Home</span>
          </button>
          <h1 className="text-xl font-bold text-white">Shopping Cart</h1>
        </div>
      </div>

      <div className="px-4 pt-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div
              className={cn("lg:col-span-7", {
                "rounded-lg border-2 border-dashed border-gray-600 p-12":
                  isMounted && items.length === 0,
              })}
            >
              <h2 className="sr-only">Items in your shopping cart</h2>

              {isMounted && items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-1">
                  <div
                    aria-hidden="true"
                    className="relative mb-4 h-40 w-40 text-gray-400"
                  >
                    <Image
                      src="/icons/zonomo-logo.png"
                      fill
                      loading="eager"
                      alt="empty shopping cart zonomo logo"
                    />
                  </div>
                  <h3 className="font-semibold text-2xl text-white">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-400 text-center">
                    Whoops! Nothing to show here yet.
                  </p>
                </div>
              ) : null}

              <ul
                className={cn({
                  "divide-y divide-gray-600 space-y-4":
                    isMounted && items.length > 0,
                })}
              >
                {isMounted &&
                  items.map(
                    ({
                      product,
                      selectedDate,
                      selectedTimeSlot,
                      selectedTimeFrame,
                    }) => {
                      const label = PRODUCT_CATEGORIES.find(
                        (c) => c.value === product.category
                      )?.label;

                      const { image } = product.images[0];

                      return (
                        <li
                          key={`${product.id}-${selectedDate}-${selectedTimeSlot}`}
                          className="review-card rounded-2xl p-4"
                        >
                          <div className="flex space-x-4">
                            <div className="flex-shrink-0">
                              <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                                {typeof image !== "string" && image.url ? (
                                  <Image
                                    fill
                                    src={image.url}
                                    alt="product image"
                                    className="h-full w-full object-cover object-center"
                                  />
                                ) : null}
                              </div>
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                              <div className="flex justify-between">
                                <div className="flex-1">
                                  <h3 className="text-white font-semibold">
                                    <Link
                                      href={`/product/${product.id}`}
                                      className="hover:text-gray-300"
                                    >
                                      {product.name}
                                    </Link>
                                  </h3>

                                  <p className="text-gray-400 text-sm mt-1">
                                    Category: {label}
                                  </p>

                                  <p className="text-white font-semibold mt-2">
                                    {formatPrice(product.price)}
                                  </p>

                                  {/* Booking Details Accordion */}
                                  <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full mt-3"
                                  >
                                    <AccordionItem
                                      value="booking-details"
                                      className="border-gray-600"
                                    >
                                      <AccordionTrigger className="py-2 text-sm text-gray-400 hover:text-white font-medium">
                                        Booking Details
                                      </AccordionTrigger>
                                      <AccordionContent className="pt-2 pb-2 text-sm text-gray-300 space-y-1">
                                        <p>
                                          <strong>Date:</strong> {selectedDate}
                                        </p>
                                        <p>
                                          <strong>Time Frame:</strong>{" "}
                                          {selectedTimeFrame}
                                        </p>
                                        <p>
                                          <strong>Time Slot:</strong>{" "}
                                          {selectedTimeSlot}
                                        </p>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>

                                  <div className="mt-4 flex items-center space-x-2 text-sm text-gray-300">
                                    <Check className="h-4 w-4 flex-shrink-0 text-green-400" />
                                    <span>Eligible for instant delivery</span>
                                  </div>
                                </div>

                                <div className="ml-4">
                                  <Button
                                    aria-label="remove product"
                                    onClick={() =>
                                      removeItem(
                                        product.id,
                                        selectedDate,
                                        selectedTimeSlot
                                      )
                                    }
                                    variant="ghost"
                                    className="text-gray-400 hover:text-red-400"
                                  >
                                    <X className="h-5 w-5" aria-hidden="true" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  )}
              </ul>
            </div>

            <section className="review-card rounded-2xl p-6 mt-16 lg:col-span-5 lg:mt-0">
              <h2 className="text-lg font-semibold text-white mb-6">
                Order summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">Subtotal</p>
                  <p className="text-white font-semibold">
                    {isMounted ? (
                      formatPrice(cartTotal, { currency: "INR" })
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-600 pt-4">
                  <div className="flex items-center text-gray-400">
                    <span>Flat Transaction Fee</span>
                  </div>
                  <div className="text-white font-semibold">
                    {isMounted ? (
                      formatPrice(fee, { currency: "INR" })
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-600 pt-4">
                  <div className="text-white font-semibold">Order Total</div>
                  <div className="text-white font-bold text-lg">
                    {isMounted ? (
                      formatPrice(cartTotal + fee, { currency: "INR" })
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                    )}
                  </div>
                </div>

                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl mt-6"
                  size="lg"
                  onClick={() =>
                    createCheckoutSession({
                      productIds: items.map(({ product }) => product.id),
                      bookingDetails: items.map(
                        ({
                          product,
                          selectedDate,
                          selectedTimeSlot,
                          selectedTimeFrame,
                        }) => ({
                          productId: product.id,
                          selectedDate,
                          selectedTimeSlot,
                          selectedTimeFrame,
                        })
                      ),
                    })
                  }
                  disabled={isLoading || items.length === 0}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Redirecting to payment...
                    </div>
                  ) : (
                    "Checkout"
                  )}
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
