// =========================================================
// ORÈVA — Wishlist (persisted client-side)
// =========================================================
const KEY = "oreva_wishlist_v1";

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}
function write(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("oreva:wishlist-changed"));
}

export function getWishlist() {
  return read();
}
export function isWishlisted(id) {
  return read().includes(id);
}
export function toggleWishlist(id) {
  const ids = read();
  const idx = ids.indexOf(id);
  if (idx > -1) {
    ids.splice(idx, 1);
  } else {
    ids.push(id);
  }
  write(ids);
  return ids.includes(id);
}
