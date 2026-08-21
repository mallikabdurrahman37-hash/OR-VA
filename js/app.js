// =========================================================
// ORÈVA — App shell: header, footer, nav, drawer, toast, icons
// =========================================================
import { auth, onAuthStateChanged, signOut } from "./firebase-config.js";
import { getCartCount } from "./cart.js";
import { getWishlist } from "./wishlist.js";

export const CONTACT = {
  name: "Abdur Rahman Mallik",
  email: "mallikabdurrahman37@gmail.com",
  phone: "+91 9239529167",
  whatsapp: "+91 9239529167",
  address: "Ashiana Complex near SM memorial school, Hooghly, WB 712701",
  instagramHandle: "@mallik.abdur",
  instagramUrl: "https://www.instagram.com/mallik.abdur?igsh=YXNwdm52OWxydnpz",
  youtubeName: "Ayat Serenity",
  youtubeUrl: "https://youtube.com/@ayatserenity-t4i?si=5ok6YzqJ8EmMzwir",
};

export function waLink() {
  const digits = CONTACT.whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}`;
}
export function telLink() {
  return `tel:${CONTACT.phone.replace(/\s+/g, "")}`;
}
export function mailLink(subject = "") {
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${CONTACT.email}${q}`;
}

export const ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.35-9.5-8.5C.7 8 2 4.5 5.5 4A5 5 0 0112 7a5 5 0 016.5-3c3.5.5 4.8 4 3 7.5C19 15.65 12 20 12 20z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 21c8 0 14-6 14-16C9 5 5 11 5 21z"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4v6h6M20 20v-6h-6"/><path d="M5 14a8 8 0 0014 3M19 10A8 8 0 005 7"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.42 5.14L2 22l5.1-1.53a9.87 9.87 0 004.94 1.33h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.5 2 12.04 2zm0 18.09a8.15 8.15 0 01-4.16-1.14l-.3-.18-3.02.9.9-2.93-.2-.3a8.13 8.13 0 01-1.25-4.34c0-4.5 3.66-8.16 8.17-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.5-3.66 8-8.3 8zm4.48-6.1c-.24-.12-1.44-.7-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s7-6.5 7-12a7 7 0 00-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="5.5" width="19" height="13" rx="3"/><path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12l5 5 9-11"/></svg>`,
};

const NAV_LINKS = [
  { href: "shop.html", label: "Shop" },
  { href: "about.html", label: "About" },
  { href: "contact.html", label: "Contact" },
  { href: "faq.html", label: "FAQ" },
];

function currentFile() {
  const p = window.location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}

function logoMarkup() {
  // Falls back to a wordmark if assets/logo.png hasn't been added yet.
  return `
    <img src="assets/logo.png" alt="ORÈVA" onerror="this.remove(); document.querySelector('.brand .wordmark').style.display='block';">
    <span class="wordmark" style="display:none;">ORÈVA<small>Est. Storefront</small></span>
  `;
}

export function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const file = currentFile();
  mount.innerHTML = `
    <div class="container header-inner">
      <a href="index.html" class="brand" aria-label="ORÈVA home">${logoMarkup()}</a>
      <nav class="main-nav" aria-label="Primary">
        <ul>
          ${NAV_LINKS.map(
            (l) =>
              `<li><a href="${l.href}" ${l.href === file ? 'aria-current="page"' : ""}>${l.label}</a></li>`
          ).join("")}
        </ul>
      </nav>
      <div class="header-actions">
        <form class="search-box" action="search.html" method="get" role="search">
          ${ICONS.search}
          <input type="search" name="q" placeholder="Search products" aria-label="Search products">
        </form>
        <a class="btn-icon icon-wrap" href="wishlist.html" aria-label="Wishlist">${ICONS.heart}<span class="badge-count" id="wishlist-count" hidden>0</span></a>
        <a class="btn-icon icon-wrap" href="cart.html" aria-label="Cart">${ICONS.bag}<span class="badge-count" id="cart-count" hidden>0</span></a>
        <a class="btn-icon" href="account.html" aria-label="Account">${ICONS.user}</a>
        <button class="btn-icon menu-toggle" id="menu-toggle" aria-label="Open menu">${ICONS.menu}</button>
      </div>
    </div>
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="mobile-drawer__backdrop" data-close-drawer></div>
      <div class="mobile-drawer__panel">
        <button class="btn-icon drawer-close" data-close-drawer aria-label="Close menu">${ICONS.close}</button>
        <form class="form-field" action="search.html" method="get" style="margin:0;">
          <input type="search" name="q" placeholder="Search products" aria-label="Search products">
        </form>
        <nav aria-label="Mobile">
          <ul>
            ${NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}
            <li><a href="wishlist.html">Wishlist</a></li>
            <li><a href="cart.html">Cart</a></li>
            <li><a href="account.html">Account</a></li>
            <li><a href="my-orders.html">My Orders</a></li>
            <li><a href="track-order.html">Track Order</a></li>
          </ul>
        </nav>
      </div>
    </div>
  `;

  const drawer = document.getElementById("mobile-drawer");
  document.getElementById("menu-toggle")?.addEventListener("click", () => {
    drawer.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });
  drawer?.querySelectorAll("[data-close-drawer]").forEach((el) =>
    el.addEventListener("click", () => {
      drawer.classList.remove("is-open");
      document.body.style.overflow = "";
    })
  );

  refreshHeaderCounts();
}

export function refreshHeaderCounts() {
  const cartEl = document.getElementById("cart-count");
  const wishEl = document.getElementById("wishlist-count");
  const cartN = getCartCount();
  const wishN = getWishlist().length;
  if (cartEl) {
    cartEl.textContent = cartN;
    cartEl.hidden = cartN === 0;
  }
  if (wishEl) {
    wishEl.textContent = wishN;
    wishEl.hidden = wishN === 0;
  }
}

export function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `
    <div class="container footer-top">
      <div class="footer-brand">
        <a href="index.html" class="brand">${logoMarkup()}</a>
        <p>Considered essentials, made to last. ORÈVA is a calm, modern storefront built around honest materials and quiet craft.</p>
        <div class="footer-social">
          <a href="${CONTACT.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
          <a href="${CONTACT.youtubeUrl}" target="_blank" rel="noopener" aria-label="YouTube">${ICONS.youtube}</a>
          <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.whatsapp}</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <ul>
          <li><a href="shop.html">All Products</a></li>
          <li><a href="shop.html?filter=featured">Featured</a></li>
          <li><a href="shop.html?filter=bestseller">Best Sellers</a></li>
          <li><a href="wishlist.html">Wishlist</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <ul>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="track-order.html">Track Order</a></li>
          <li><a href="shipping-policy.html">Shipping Policy</a></li>
          <li><a href="cancellation-policy.html">Cancellation Policy</a></li>
          <li><a href="return-policy.html">Return &amp; Refund</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="${mailLink()}">${CONTACT.email}</a></li>
          <li><a href="${telLink()}">${CONTACT.phone}</a></li>
          <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp us</a></li>
          <li><address>${CONTACT.address}</address></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; ${year} ORÈVA. All rights reserved.</span>
      <div class="legal-links">
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="terms.html">Terms &amp; Conditions</a>
        <a href="about.html">About</a>
      </div>
    </div>
  `;
}

// --- bg.png graceful fallback (spec section 2) ---
export function initBackgroundFallback() {
  const img = new Image();
  img.onload = () => document.body.classList.add("bg-loaded");
  img.onerror = () => document.body.classList.add("no-bg");
  img.src = "assets/bg.png";
}

// --- Toasts ---
export function toast(message, type = "default") {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const el = document.createElement("div");
  el.className = `toast ${type === "error" ? "toast--error" : type === "success" ? "toast--success" : ""}`;
  el.textContent = message;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .3s, transform .3s";
    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";
    setTimeout(() => el.remove(), 300);
  }, 2600);
}

// --- Formatting ---
export function formatINR(amount) {
  const n = Number(amount) || 0;
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function formatDate(dateLike) {
  let d = dateLike;
  if (d && typeof d.toDate === "function") d = d.toDate();
  if (!(d instanceof Date)) d = new Date(d);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function addDaysISO(dateLike, days) {
  let d = dateLike;
  if (d && typeof d.toDate === "function") d = d.toDate();
  if (!(d instanceof Date)) d = new Date(d);
  d.setDate(d.getDate() + days);
  return d;
}

// --- Auth state (shared) ---
let currentUser = null;
const authListeners = [];
export function onUserReady(cb) {
  authListeners.push(cb);
  if (currentUser !== null) cb(currentUser);
}
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  authListeners.forEach((cb) => cb(user));
});
export function getCurrentUser() {
  return currentUser;
}
export async function logout() {
  await signOut(auth);
  toast("Signed out");
  window.location.href = "index.html";
}

// --- Boot ---
export function bootShell() {
  initBackgroundFallback();
  renderHeader();
  renderFooter();
}

document.addEventListener("DOMContentLoaded", bootShell);
