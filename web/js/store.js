/* =========================
   PRODUCT STORE SYSTEM
========================= */

let products = [];

// LOAD PRODUCTS
async function loadProducts() {
  products = await get("/products");
  renderProducts(products);
}

// RENDER PRODUCTS
function renderProducts(list) {
  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = list.map(p => `
    <div class="card">
      <h3>${p.id}</h3>

      ${p.audio ? `<audio controls src="${p.audio}"></audio>` : ""}

      <p class="price">$${p.price}</p>

      <button onclick="buy('${p.id}')">Buy</button>
    </div>
  `).join('');
}

// FILTER PRODUCTS
function filterProducts(type) {
  const filtered = products.filter(p => p.type === type);
  renderProducts(filtered);
}
