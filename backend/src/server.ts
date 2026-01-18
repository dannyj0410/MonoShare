import dotenv from "dotenv";
dotenv.config();
// import path from "path";
import express from "express";
import cors from "cors";
import { secretsRoute } from "./routers/secret.router";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Website served on http://localhost:" + PORT);
});

app.use("/api/secrets", secretsRoute);
