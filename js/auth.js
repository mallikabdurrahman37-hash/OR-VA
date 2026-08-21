// =========================================================
// ORÈVA — Authentication
// Firestore `users/{uid}`: email, profileName, photoURL, createdAt, updatedAt
// =========================================================
import {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "./firebase-config.js";

async function ensureUserDoc(user, extra = {}) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email || "",
      profileName: extra.profileName || user.displayName || "",
      photoURL: user.photoURL || "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else if (extra.profileName) {
    await setDoc(
      ref,
      { profileName: extra.profileName, updatedAt: serverTimestamp() },
      { merge: true }
    );
  }
}

export async function registerWithEmail(email, password, profileName) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (profileName) {
    await updateProfile(cred.user, { displayName: profileName });
  }
  await ensureUserDoc(cred.user, { profileName });
  return cred.user;
}

export async function loginWithEmail(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  await ensureUserDoc(cred.user);
  return cred.user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await ensureUserDoc(cred.user);
  return cred.user;
}

export async function continueAsGuest() {
  const cred = await signInAnonymously(auth);
  return cred.user;
}

export function friendlyAuthError(err) {
  const code = err?.code || "";
  const map = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/email-already-in-use": "An account already exists with this email.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Please check your connection.",
  };
  return map[code] || "Something went wrong. Please try again.";
}
