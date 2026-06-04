// ============================================================
//  DRESS BY DIYA — PRODUCTS LIST
//  To add a new dress:
//  1. Upload the photo to https://imgbb.com (free)
//  2. Copy the "Direct link" of the image
//  3. Copy one of the blocks below, paste it at the top of the array
//  4. Fill in the details and save
//  5. Push to GitHub — done!
// ============================================================

const WHATSAPP = "923350961005"; // ← Replace with actual WhatsApp number

const PRODUCTS = [

  // ── EXAMPLE PRODUCTS (replace with real ones) ──────────────

  {
    id: 1,
    name: "Emerald Formal Suit",
    category: "formal",
    price: 4500,
    description: "3-piece embroidered formal suit in deep emerald. Available in all sizes.",
    image: "https://i.ibb.co/Lh09MY7H/WUM36105-large.webp",
    available: true,
  },
  {
    id: 2,
    name: "Summer Lawn Suit",
    category: "lawn",
    price: 2200,
    description: "Light printed lawn 3-piece. Perfect for everyday wear.",
    image: "https://i.ibb.co/hJLjzjmD/download.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Casual Kurta Set",
    category: "casual",
    price: 1800,
    description: "Cotton kurta with straight trousers. Comfortable & stylish.",
    image: "https://i.ibb.co/twnW77pC/download1.jpg",
    available: true,
  },
  {
    id: 4,
    name: "Velvet Shawl Suit",
    category: "formal",
    price: 7500,
    description: "Luxurious velvet suit with embroidered shawl. Winter special.",
    image: "https://i.ibb.co/Qjnp52Hn/download2.jpg",
    available: true,
  },

];

// ============================================================
// ↓↓ Don't touch anything below this line ↓↓
// ============================================================

const grid = document.getElementById('products-grid');
const noResults = document.getElementById('no-results');
const filterBtns = document.querySelectorAll('.filter-btn');

let activeFilter = 'all';

function buildWhatsAppLink(product) {
  const msg = encodeURIComponent(
    `Hi! I'm interested in ordering the *${product.name}* (PKR ${product.price.toLocaleString()}). Please share more details.`
  );
  return `https://wa.me/${WHATSAPP}?text=${msg}`;
}

function placeholderSVG() {
  return `<div class="product-placeholder">
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6C24 6 14 12 14 22C14 27.523 18.477 32 24 32C29.523 32 34 27.523 34 22C34 12 24 6 24 6Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <path d="M18 32L14 44H34L30 32" stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>
    <span>Photo coming soon</span>
  </div>`;
}

function renderProducts(filter) {
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  grid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.style.display = 'flex';
    return;
  }
  noResults.style.display = 'none';

  filtered.forEach((product, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${i * 80}ms`;

    const categoryLabel = {
      formal: 'Formal', casual: 'Casual', lawn: 'Lawn'
    }[product.category] || product.category;

    const badgeClass = product.available ? '' : 'sold-out';
    const badgeText = product.available ? categoryLabel : 'Sold Out';

    const imgContent = product.image
      ? `<img src="${product.image}" alt="${product.name}" loading="lazy"/>`
      : placeholderSVG();

    const orderBtn = product.available
      ? `<a href="${buildWhatsAppLink(product)}" target="_blank" class="product-order-btn">Order Now</a>`
      : `<button class="product-order-btn unavailable" disabled>Sold Out</button>`;

    card.innerHTML = `
      <div class="product-img-wrap">
        ${imgContent}
        <div class="product-badge ${badgeClass}">${badgeText}</div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">PKR ${product.price.toLocaleString()}<span>onwards</span></div>
          ${orderBtn}
        </div>
      </div>`;

    grid.appendChild(card);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts(activeFilter);
  });
});

renderProducts('all');
