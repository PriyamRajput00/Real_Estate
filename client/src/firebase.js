// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b3562.firebaseapp.com",
  projectId: "mern-estate-b3562",
  storageBucket: "mern-estate-b3562.firebasestorage.app",
  messagingSenderId: "661541915369",
  appId: "1:661541915369:web:4acc4c998b25af93b3fe78"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);