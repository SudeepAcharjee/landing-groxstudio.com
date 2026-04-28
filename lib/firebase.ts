import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrYy3c6aN85HRjDbyUV_rCurPYzKtfEsg",
  authDomain: "grox-in.firebaseapp.com",
  projectId: "grox-in",
  storageBucket: "grox-in.firebasestorage.app",
  messagingSenderId: "872802728984",
  appId: "1:872802728984:web:c2339a633074aba992d76d",
  measurementId: "G-NKCW0FF9N1"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
