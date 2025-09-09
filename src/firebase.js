// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9tD7BA9wAu5UqDWPwUunq4BTmWv0uHgU",
  authDomain: "ecommerce-8bd19.firebaseapp.com",
  projectId: "ecommerce-8bd19",
  storageBucket: "ecommerce-8bd19.firebasestorage.app",
  messagingSenderId: "28389865892",
  appId: "1:28389865892:web:3894f63d1c5f9cb8f5a931",
  measurementId: "G-LKJZR2YD65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);