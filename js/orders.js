// =========================================================
// ORÈVA — Orders
// Firestore `orders/{autoId}` — schema per database.zip (section 9)
// Payment: COD only. Expected delivery = orderDate + 6 days.
// =========================================================
import {
  db,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "./firebase-config.js";
import { addDaysISO } from "./app.js";

export const TRACK_STAGES = ["Order Placed", "Order Confirmed", "Shipped", "Out for Delivery", "Delivered"];

// Maps an admin-set orderStatus string to a stage index (0-based) in TRACK_STAGES.
export function stageIndexForStatus(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("deliver")) return 4;
  if (s.includes("out for")) return 3;
  if (s.includes("ship")) return 2;
  if (s.includes("confirm")) return 1;
  return 0; // placed / pending / processing default
}

export async function placeOrder({ user, customerName, customerEmail, phone, shippingAddress, items, subtotal, shippingCharge, totalAmount }) {
  const now = new Date();
  const expected = addDaysISO(new Date(now), 6);
  const orderData = {
    userId: user ? user.uid : "guest",
    customerName,
    customerEmail,
    phone,
    shippingAddress,
    items,
    subtotal,
    shippingCharge,
    totalAmount,
    paymentMethod: "COD",
    orderStatus: "Order Placed",
    orderDate: serverTimestamp(),
    expectedDelivery: Timestamp.fromDate(expected),
    courierService: "",
    trackingId: "",
    delayNote: "",
    cancelled: false,
  };
  const ref = await addDoc(collection(db, "orders"), orderData);
  return { id: ref.id, ...orderData, orderDate: now };
}

export async function fetchOrdersForUser(uid) {
  if (!uid) return [];
  try {
    const q = query(collection(db, "orders"), where("userId", "==", uid));
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => {
      const ta = a.orderDate?.toMillis ? a.orderDate.toMillis() : 0;
      const tb = b.orderDate?.toMillis ? b.orderDate.toMillis() : 0;
      return tb - ta;
    });
    return list;
  } catch (err) {
    console.error("Failed to load orders:", err);
    return [];
  }
}

export async function fetchOrderById(orderId) {
  try {
    const snap = await getDoc(doc(db, "orders", orderId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error("Failed to load order:", err);
    return null;
  }
}

// Cancellation: always re-read the live order from Firestore before acting.
// A stale "Cancel" button must never succeed once the order has shipped —
// this check (plus Firestore security rules on the backend) is what enforces that,
// not the UI state alone.
export async function attemptCancelOrder(orderId) {
  const live = await fetchOrderById(orderId);
  if (!live) return { ok: false, reason: "Order not found." };
  if (live.cancelled) return { ok: false, reason: "This order is already cancelled." };
  const stage = stageIndexForStatus(live.orderStatus);
  if (stage >= 2) {
    return { ok: false, reason: "This order has already shipped and can no longer be cancelled." };
  }
  try {
    await updateDoc(doc(db, "orders", orderId), {
      cancelled: true,
      orderStatus: "Cancelled",
    });
    return { ok: true };
  } catch (err) {
    console.error("Cancel failed:", err);
    return { ok: false, reason: "Could not cancel the order right now. Please try again." };
  }
}

export function canShowCancel(order) {
  if (!order || order.cancelled) return false;
  return stageIndexForStatus(order.orderStatus) < 2;
}
