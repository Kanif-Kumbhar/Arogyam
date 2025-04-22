// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Platform } from "react-native";
import {
  getAuth,
  initializeAuth, // ✅ Missing import
  getReactNativePersistence, // ✅ Typo fixed: "persistance" ➜ "persistence"
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "arogyam-f030f.firebaseapp.com",
  projectId: "arogyam-f030f",
  storageBucket: "arogyam-f030f.firebasestorage.app",
  messagingSenderId: "213072280416",
  appId: "1:213072280416:web:6c724f6f5579915ac17c05",
  measurementId: "G-CYRG4LPZ6Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize auth based on platform
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });
