/* =========================
   STRIPE CHECKOUT SYSTEM
========================= */

// BUY PRODUCT
async function buy(productId) {
  try {
    const res = await post("/stripe/create-checkout", {
      productId
    });

    if (res.url) {
      window.location.href = res.url;
    } else {
      alert("Checkout failed");
    }

  } catch (err) {
    console.error(err);
    alert("Payment error");
  }
}

// SUBSCRIBE PLAN
async function subscribe(plan) {
  try {
    const res = await post("/stripe/subscribe", {
      plan
    });

    if (res.url) {
      window.location.href = res.url;
    } else {
      alert("Subscription failed");
    }

  } catch (err) {
    console.error(err);
    alert("Subscription error");
  }
}
