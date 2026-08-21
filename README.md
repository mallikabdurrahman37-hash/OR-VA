# ORÈVA — Customer Storefront

Plain HTML/CSS/JS e-commerce storefront built against the master spec, using
Firebase (Auth + Firestore) and Cloudinary, on project `eddy-s-portfolio`.

## Structure

```
index.html                 Home
shop.html                  All products (filters/sort)
category.html              Category view (?name=)
search.html                Search results (?q=)
product.html                Product details (?id=)
cart.html                  Cart
checkout.html               Checkout (COD only)
order-confirmation.html    Post-order confirmation (?id=)
track-order.html           Public order tracking (?id=)
account.html                Sign in / sign up / dashboard entry
my-orders.html               Order history (signed-in)
order-details.html          Full order + cancel (?id=)
wishlist.html               Saved products
about.html / contact.html / faq.html
shipping-policy.html / cancellation-policy.html / return-policy.html
privacy-policy.html / terms.html

css/style.css               Full design system (palette, type, components)
js/firebase-config.js       Firebase init (exact config from spec — do not change)
js/app.js                   Header/footer, nav, drawer, toasts, contact links, formatting
js/auth.js                  Email/password, Google, anonymous auth
js/cart.js                  Cart (localStorage)
js/wishlist.js               Wishlist (localStorage)
js/products.js              Firestore product reads + card rendering
js/orders.js                 Order placement, tracking-stage logic, cancellation

firestore.rules              Reference rules extending the existing baseline —
                              merge into the Firebase console (see file header).
```

## Before you deploy

1. **Add real assets.** Drop your actual files into `assets/`:
   - `assets/logo.png` — used in the header and footer. If it's missing/fails
     to load, the site falls back to a plain "ORÈVA" wordmark automatically —
     no broken-image icon.
   - `assets/bg.png` — optional site background. If missing/fails, the site
     falls back to the solid paper (`#EFEDE6`) background automatically.
2. **Add products** through the admin panel (same Firebase project) — the
   storefront reads live from the `products` collection and needs at least
   one active, in-stock product to show anything beyond empty states.
3. **Merge `firestore.rules`** into your Firestore security rules in the
   Firebase console, next to whatever the admin panel already defines. It
   preserves the existing `projects` / `users` / `visitor_ids` baseline and
   adds rules for `products`, `settings`, and `orders` — including the
   server-enforced pre-shipment-only cancellation rule.
4. **Host category images.** The homepage currently uses a few Unsplash stock
   photos as category placeholders (`index.html`, `about.html`) since no
   category imagery was supplied — swap these for real product photography
   whenever you're ready.

## Notes on implementation choices

- **Cart & wishlist** are stored in `localStorage` so guests can shop freely
  without being forced to sign in (per spec §8), and survive refreshes. They
  are not currently synced to Firestore per-user; say the word if you'd like
  that added.
- **Shipping charge rule**: if items in the cart carry different non-zero
  `shippingCharge` values, checkout applies the single highest one once per
  order (simple and predictable). If you'd prefer to sum them, this is a
  one-line change in `js/cart.js` (`cartTotals`).
- **Order Status strings** the storefront understands for tracker staging
  (`js/orders.js → stageIndexForStatus`): anything containing "confirm",
  "ship", "out for", or "deliver" (case-insensitive) advances the tracker.
  Keep the admin panel's status field consistent with these words, or tell me
  the exact status strings it writes and I'll match them exactly.
- **Return/Refund policy** intentionally shows an "under development" notice
  per spec §10, not a full workflow.

## Testing

Open `index.html` in a local server (not `file://`, since ES modules and
Firebase need `http(s)://`). Quickest options:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then check desktop, tablet, and a few phone widths (320 / 360 / 390 / 430px)
in dev tools before deploying.
