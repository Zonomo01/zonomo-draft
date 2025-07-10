import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";
import { Product } from "../payload-types";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
        bookingDetails: z.array(
          z.object({
            productId: z.string(),
            selectedDate: z.string(),
            selectedTimeSlot: z.string(),
            selectedTimeFrame: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      let { productIds, bookingDetails } = input;

      if (productIds.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const filteredProducts = (products as unknown as Product[]).filter(
        (prod) => typeof prod.priceId === "string" && prod.priceId.length > 0
      );

      if (filteredProducts.length === 0) {
        console.error("No products with valid price IDs found");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No products with valid price IDs found",
        });
      }

      let order;
      try {
        // Create order first
        order = await payload.create({
          collection: "orders",
          data: {
            _isPaid: false,
            products: filteredProducts.map((prod) => String(prod.id)),
            user: user.id,
            bookingDetails: bookingDetails,
          },
        });

        // Prepare line items for Stripe
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        // Add products to line items
        filteredProducts.forEach((product) => {
          if (product.priceId) {
            line_items.push({
              price: product.priceId,
              quantity: 1,
            });
          }
        });

        // Add transaction fee
        const feePrice = await stripe.prices.create({
          currency: "inr", // Change to INR for Indian Rupees
          unit_amount: 100, // ₹1.00
          product_data: {
            name: "Transaction Fee",
          },
        });

        line_items.push({
          price: feePrice.id,
          quantity: 1,
          adjustable_quantity: {
            enabled: false,
          },
        });

        // Create Stripe checkout session
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ["card"],
          mode: "payment",
          metadata: {
            userId: user.id,
            orderId: order.id,
            bookingDetails: JSON.stringify(bookingDetails),
          },
          line_items,
          currency: "inr", // Set currency to INR
          customer_email: user.email, // Pre-fill customer email
          payment_intent_data: {
            metadata: {
              orderId: order.id,
            },
          },
        });

        return { url: stripeSession.url };
      } catch (err) {
        console.error("Stripe checkout session creation failed:", err);

        // Delete the order if payment session creation fails
        if (order?.id) {
          try {
            await payload.delete({
              collection: "orders",
              id: order.id,
            });
          } catch (deleteErr) {
            console.error(
              "Failed to delete order after payment error:",
              deleteErr
            );
          }
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session. Please try again.",
        });
      }
    }),
  pollOrderStatus: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input;

      const payload = await getPayloadClient();

      const { docs: orders } = await payload.find({
        collection: "orders",
        where: {
          id: {
            equals: orderId,
          },
        },
      });

      if (!orders.length) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [order] = orders;

      return { isPaid: order._isPaid };
    }),
});
