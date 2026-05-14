// Firebase web app settings for Dinkins Land Management.
// Replace the placeholder values below with the Firebase Web App config from
// Firebase Console → Project settings → Your apps → Web app.
// The API key is safe to publish; security is enforced by Firestore/Storage rules.
export const firebaseConfig = {
  apiKey: "REPLACE_WITH_FIREBASE_API_KEY",
  authDomain: "dinkins-7adf1.firebaseapp.com",
  projectId: "dinkins-7adf1",
  storageBucket: "dinkins-7adf1.firebasestorage.app",
  messagingSenderId: "REPLACE_WITH_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_FIREBASE_APP_ID",
};

// Client-side convenience list for showing the admin UI after login. This is not
// the security boundary; keep the matching Firestore and Storage rules in place.
export const ownerEmails = ["dinkinslandmgmt@gmail.com"];

export function isFirebaseConfigured() {
  return Object.values(firebaseConfig).every(
    (value) => typeof value === "string" && value && !value.startsWith("REPLACE_WITH"),
  );
}
