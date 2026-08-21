// =========================================================
// ORÈVA — Products data layer (Firestore `products` collection)
// Schema (authoritative, from database.zip): name, description,
// category, price, compareAtPrice, images[1-5], featured, bestSeller,
// stock, sizes[], isActive, createdAt, shippingCharge
// =========================================================
import { db, collection, getDocs, doc, getDoc, query, where, orderBy } from "./firebase-config.js";
import { formatINR, ICONS } from "./app.js";
import { isWishlisted, toggleWishlist } from "./wishlist.js";

let _cache = null;

export async function fetchAllProducts() {
  if (_cache) return _cache;
  try {
    const snap = await getDocs(collection(db, "products"));
    _cache = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((p) => p.isActive !== false);
  } catch (err) {
    console.error("Failed to load products:", err);
    _cache = [];
  }
  return _cache;
}

export async function fetchProductById(id) {
  try {
    const snap = await getDoc(doc(db, "products", id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error("Failed to load product:", err);
    return null;
  }
}

export async function fetchByCategory(category) {
  const all = await fetchAllProducts();
  return all.filter((p) => (p.category || "").toLowerCase() === category.toLowerCase());
}

export async function fetchFeatured() {
  const all = await fetchAllProducts();
  return all.filter((p) => p.featured);
}

export async function fetchBestSellers() {
  const all = await fetchAllProducts();
  return all.filter((p) => p.bestSeller);
}

export async function searchProducts(term) {
  const all = await fetchAllProducts();
  const t = term.trim().toLowerCase();
  if (!t) return [];
  return all.filter(
    (p) =>
      (p.name || "").toLowerCase().includes(t) ||
      (p.description || "").toLowerCase().includes(t) ||
      (p.category || "").toLowerCase().includes(t)
  );
}

export async function fetchCategories() {
  const all = await fetchAllProducts();
  return [...new Set(all.map((p) => p.category).filter(Boolean))];
}

export async function fetchRelated(product, count = 4) {
  const all = await fetchAllProducts();
  return all
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);
}

// --- Rendering helpers ---
export function productCardHTML(p) {
  const img = (p.images && p.images[0]) || "";
  const outOfStock = (p.stock ?? 0) <= 0;
  const wished = isWishlisted(p.id);
  return `
    <article class="product-card" data-id="${p.id}">
      <a href="product.html?id=${p.id}" class="product-card__media">
        ${p.bestSeller ? `<span class="product-card__tag">Best Seller</span>` : outOfStock ? `<span class="product-card__tag product-card__tag--out">Sold Out</span>` : ""}
        <button class="product-card__wish ${wished ? "is-active" : ""}" data-wish="${p.id}" aria-label="Toggle wishlist" type="button">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.35-9.5-8.5C.7 8 2 4.5 5.5 4A5 5 0 0112 7a5 5 0 016.5-3c3.5.5 4.8 4 3 7.5C19 15.65 12 20 12 20z"/></svg>
        </button>
        ${img ? `<img src="${img}" alt="${p.name || ""}" loading="lazy">` : `<div class="skeleton" style="width:100%;height:100%;"></div>`}
      </a>
      <div class="product-card__body">
        <span class="product-card__cat">${p.category || ""}</span>
        <a href="product.html?id=${p.id}"><h3 class="product-card__name">${p.name || "Untitled"}</h3></a>
        <div class="product-card__price">
          <span class="price">${formatINR(p.price)}</span>
          ${p.compareAtPrice && p.compareAtPrice > p.price ? `<span class="price--compare">${formatINR(p.compareAtPrice)}</span>` : ""}
        </div>
        ${Number(p.shippingCharge) === 0 ? `<span class="price--free-ship">Free shipping</span>` : ""}
      </div>
    </article>
  `;
}

export function bindWishButtons(root = document) {
  root.querySelectorAll("[data-wish]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute("data-wish");
      const active = toggleWishlist(id);
      btn.classList.toggle("is-active", active);
      import("./app.js").then((m) => {
        m.refreshHeaderCounts();
        m.toast(active ? "Added to wishlist" : "Removed from wishlist");
      });
    });
  });
}

export function skeletonGrid(n = 8) {
  return Array.from({ length: n })
    .map(
      () => `
      <div class="product-card">
        <div class="skeleton" style="aspect-ratio:3/4;"></div>
        <div class="skeleton" style="height:14px;width:60%;"></div>
        <div class="skeleton" style="height:14px;width:35%;"></div>
      </div>`
    )
    .join("");
}

export function emptyStateHTML(message = "No products found.") {
  return `
    <div class="empty-state">
      ${ICONS.bag}
      <p>${message}</p>
      <a href="shop.html" class="btn btn--outline btn--sm">Browse all products</a>
    </div>
  `;
}
