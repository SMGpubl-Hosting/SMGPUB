import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "../database/connect.js";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import stripeRoutes from "./routes/stripe.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stripe", stripeRoutes);

app.get("/", (req,res)=>res.send("SMGPUB API RUNNING"));

app.listen(process.env.PORT, ()=>{
  console.log("Server running on port", process.env.PORT);
});
