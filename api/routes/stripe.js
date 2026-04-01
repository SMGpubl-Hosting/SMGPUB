import express from "express";
import Stripe from "stripe";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// CREATE CHECKOUT
router.post("/create-checkout", async (req,res)=>{

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: { name: "SMGPUB Product" },
        unit_amount: 5000
      },
      quantity: 1
    }],
    mode: "payment",
    success_url: "http://localhost:3000/download.html",
    cancel_url: "http://localhost:3000"
  });

  res.json({ url: session.url });
});

export default router;
