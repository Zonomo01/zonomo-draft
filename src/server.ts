import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebhookHandler } from "./webhooks";
import nextBuild from "next/dist/build";
import path from "path";
import { PayloadRequest } from "payload/types";
import { parse } from "url";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;

export type WebhookRequest = IncomingMessage & {
  rawBody: Buffer;
};

const start = async () => {
  console.log("🚀 Starting Zonomo server...");

  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });

  app.post("/api/webhooks/stripe", webhookMiddleware, stripeWebhookHandler);

  console.log("⚙️ Initializing Payload CMS...");
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
        console.log("✅ Payload CMS initialized successfully");
      },
    },
  });

  console.log("📋 Setting up routes...");

  // Display URLs immediately after Payload is ready
  console.log("");
  console.log("🌐 Server URLs:");
  console.log(`📱 Main App:      http://localhost:${PORT}`);
  console.log("");

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("Next.js is building for production");

      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));

      process.exit();
    });

    return;
  }

  const cartRouter = express.Router();

  cartRouter.use(payload.authenticate);

  cartRouter.get("/", (req, res) => {
    const request = req as PayloadRequest;

    if (!request.user) return res.redirect("/sign-in?origin=cart");

    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;

    return nextApp.render(req, res, "/cart", query);
  });

  app.use("/cart", cartRouter);
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));

  console.log("⏳ Preparing Next.js...");

  nextApp
    .prepare()
    .then(() => {
      payload.logger.info("Next.js started");

      app.listen(PORT, async () => {
        console.log("");
        console.log("🚀 Zonomo Application Started!");
        console.log("");
        console.log(`📱 Main App:      http://localhost:${PORT}`);
        console.log("");
        payload.logger.info(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("❌ Error preparing Next.js:", error);
    });
};

start();
