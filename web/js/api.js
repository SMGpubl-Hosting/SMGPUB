/* =========================
   SMGPUB API CORE
========================= */

const API = "/api";

// GET REQUEST
async function get(endpoint) {
  try {
    const res = await fetch(API + endpoint, {
      headers: {
        "Authorization": localStorage.getItem("token") || ""
      }
    });

    if (!res.ok) throw new Error("GET failed");

    return await res.json();

  } catch (err) {
    console.error("GET ERROR:", err);
    return [];
  }
}

// POST REQUEST
async function post(endpoint, data) {
  try {
    const res = await fetch(API + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") || ""
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("POST failed");

    return await res.json();

  } catch (err) {
    console.error("POST ERROR:", err);
    return {};
  }
}
