/* =========================
   SERVICES SYSTEM
========================= */

let services = [];

// LOAD SERVICES
async function loadServices() {
  services = await get("/services");
  renderServices(services);
}

// RENDER SERVICES
function renderServices(list) {
  const container = document.getElementById("servicesList");

  if (!container) return;

  container.innerHTML = list.map(s => `
    <div class="card">
      <h3>${s.name}</h3>
      <p class="price">$${s.price}</p>
      <button onclick="subscribe('${s.name}')">Subscribe</button>
    </div>
  `).join('');
}
