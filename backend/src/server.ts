import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is not set");
}
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not set");
}

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { secretRouter } from "./routers/secret.router.js";
import { authRouter } from "./routers/auth.router.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";

const app = express();
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:9000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);
app.use(express.json({ limit: "100kb" }));

const privateRoutes = [
  "/secret/",
  "/details/",
  "/my-secrets",
  "/sign-in",
  "/create-account",

  "/api/auth",
  "/api/secret",
];

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  );

  // no index private routes
  if (privateRoutes.some((route) => req.path.startsWith(route))) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  next();
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/secret", secretRouter);
app.all("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "public");

  app.use(
    express.static(publicPath, {
      // long cache for immutable assets, short for SEO files
      setHeaders(res, filePath) {
        if (
          filePath.endsWith("robots.txt") ||
          filePath.endsWith("sitemap.xml") ||
          filePath.endsWith("site.webmanifest")
        ) {
          res.setHeader("Cache-Control", "public, max-age=86400"); // max age 1 day
        } else if (filePath.includes("/assets/")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    }),
  );

  // SEO files with explicit Cache-Control
  app.get("/robots.txt", (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.sendFile(path.join(publicPath, "robots.txt"));
  });

  app.get("/sitemap.xml", (req, res) => {
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.sendFile(path.join(publicPath, "sitemap.xml"));
  });

  app.get("/site.webmanifest", (req, res) => {
    res.setHeader("Content-Type", "application/manifest+json");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.sendFile(path.join(publicPath, "site.webmanifest"));
  });

  app.get("*", (req, res) => {
    const frontendRoutes = ["/", "/sign-in", "/create-account", "/my-secrets"];
    const isDynamicRoute =
      req.path.startsWith("/secret/") || req.path.startsWith("/details/");

    if (frontendRoutes.includes(req.path) || isDynamicRoute) {
      res.sendFile(path.join(publicPath, "index.html"));
    } else {
      res.status(404).sendFile(path.join(publicPath, "index.html"));
    }
  });
}

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Website served on http://localhost:" + PORT);
});
