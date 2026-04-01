import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req,res)=>{
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password,10);

  const user = await User.create({ email, password: hashed });

  res.json({ success:true });
});

// LOGIN
router.post("/login", async (req,res)=>{
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user) return res.json({ token:null });

  const valid = await bcrypt.compare(password, user.password);

  if(!valid) return res.json({ token:null });

  const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

export default router;
