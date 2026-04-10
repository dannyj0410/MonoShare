import dotenv from "dotenv";
import path from "path";
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
import { secretRouter } from "./routers/secret.router";
import { authRouter } from "./routers/auth.router";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? "https://localhost:9000"
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
    "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'",
  );
  if (privateRoutes.some((route) => req.path.startsWith(route))) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/secret", secretRouter);

if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "public");

  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Website served on http://localhost:" + PORT);
});
