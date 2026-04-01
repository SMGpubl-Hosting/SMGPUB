import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id: String,
  price: Number,
  type: String,
  audio: String
});

export default mongoose.model("Product", ProductSchema);
