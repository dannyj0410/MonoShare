import dotenv from "dotenv";
dotenv.config();
// import path from "path";
import express from "express";
import cors from "cors";

// Might need "type": "module", in package.json instead of "commonjs"

// import { dbConnect } from "./configs/database.config";
// dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(express.static("public"));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Website served on http://localhost:" + PORT);
});
