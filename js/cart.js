// =========================================================
// ORÈVA — Cart (persisted client-side; keeps guests shopping
// without forcing sign-in, per spec section 8)
// =========================================================
const KEY = "oreva_cart_v1";

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}
function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("oreva:cart-changed"));
}

export function getCart() {
  return read();
}

export function getCartCount() {
  return read().reduce((sum, i) => sum + i.qty, 0);
}

// item: { id, name, image, price, size, stock, shippingCharge }
export function addToCart(item, qty = 1) {
  const items = read();
  const idx = items.findIndex((i) => i.id === item.id && i.size === item.size);
  if (idx > -1) {
    items[idx].qty = Math.min(items[idx].qty + qty, item.stock ?? 99);
  } else {
    items.push({ ...item, qty: Math.min(qty, item.stock ?? 99) });
  }
  write(items);
}

export function updateQty(id, size, qty) {
  const items = read();
  const idx = items.findIndex((i) => i.id === id && i.size === size);
  if (idx === -1) return;
  if (qty <= 0) {
    items.splice(idx, 1);
  } else {
    items[idx].qty = qty;
  }
  write(items);
}

export function removeFromCart(id, size) {
  const items = read().filter((i) => !(i.id === id && i.size === size));
  write(items);
}

export function clearCart() {
  write([]);
}

export function cartTotals(items = read()) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  // Highest product-level shipping charge among items with a charge > 0 (0 = free shipping for that item).
  // If ANY item has non-zero shipping, apply the max such charge once per order (simple, predictable rule).
  const shippingCharges = items.map((i) => Number(i.shippingCharge) || 0).filter((c) => c > 0);
  const shippingCharge = shippingCharges.length ? Math.max(...shippingCharges) : 0;
  const totalAmount = subtotal + shippingCharge;
  return { subtotal, shippingCharge, totalAmount };
}
