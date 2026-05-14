// Firebase web app settings for Dinkins Land Management.
// Replace the placeholder values below with the Firebase Web App config from
// Firebase Console → Project settings → Your apps → Web app.
// The API key is safe to publish; security is enforced by Firestore/Storage rules.
export const firebaseConfig = {
  apiKey: "AIzaSyDtl82JalzxfVM5Xzw2OHuAo-kN23IsoiU",
  authDomain: "dinkins-7adf1.firebaseapp.com",
  projectId: "dinkins-7adf1",
  storageBucket: "dinkins-7adf1.firebasestorage.app",
  messagingSenderId: "7113023718",
  appId: "1:7113023718:web:240e3b6eb83607b46cdb27",
  measurementId: "G-PMM52DNM2L",
};

// Client-side convenience list for showing the admin UI after login. This is not
// the security boundary; keep the matching Firestore and Storage rules in place.
export const ownerEmails = ["dinkinslandmgmt@gmail.com", "qathom8991@gmail.com"];

export function isFirebaseConfigured() {
  return Object.values(firebaseConfig).every(
    (value) => typeof value === "string" && value && !value.startsWith("REPLACE_WITH"),
  );
}
