// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "react-app-list.firebaseapp.com",
  projectId: "react-app-list",
  storageBucket: "react-app-list.appspot.com",
  messagingSenderId: "476335084674",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
