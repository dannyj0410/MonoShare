import dotenv from "dotenv";
dotenv.config();
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not set");
}
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { secretsRoute } from "./routers/secret.router";
import { authRouter } from "./routers/auth.router";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  }),
);

// app.use(express.static("public"));
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Website served on http://localhost:" + PORT);
});

app.use("/api/secrets", secretsRoute);
