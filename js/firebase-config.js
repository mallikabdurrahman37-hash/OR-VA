// =========================================================
// ORÈVA — Firebase initialization
// Project: eddy-s-portfolio (shared with admin panel — do not change)
// =========================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  linkWithCredential,
  EmailAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCa7OTJEyx4v90upw8xc9Y3aXWETfIMFts",
  authDomain: "eddy-s-portfolio.firebaseapp.com",
  projectId: "eddy-s-portfolio",
  storageBucket: "eddy-s-portfolio.firebasestorage.app",
  messagingSenderId: "363833751972",
  appId: "1:363833751972:web:c87f12a3446ffff5d42931",
  measurementId: "G-Q2E87TYZDW",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  linkWithCredential,
  EmailAuthProvider,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  serverTimestamp,
  Timestamp,
};

// --- Cloudinary (product images — admin uploads, storefront only reads URLs) ---
export const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dyt6fwvw0/image/upload";
export const CLOUDINARY_UPLOAD_PRESET = "Wb_mobile_products";
