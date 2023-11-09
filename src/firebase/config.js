// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx2jaJg3VenrwPBKlBmbhMaKun2K9n4ms",
  authDomain: "task-manager-3b39e.firebaseapp.com",
  projectId: "task-manager-3b39e",
  storageBucket: "task-manager-3b39e.appspot.com",
  messagingSenderId: "289400948331",
  appId: "1:289400948331:web:77bb5e6bfb557ed413d32e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
