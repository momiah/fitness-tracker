// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMIxHuj5yHwdtvY0pMUZM1-EOANGk6_XM",
  authDomain: "fitnesstracker-36536.firebaseapp.com",
  projectId: "fitnesstracker-36536",
  storageBucket: "fitnesstracker-36536.appspot.com",
  messagingSenderId: "872799689916",
  appId: "1:872799689916:web:ed9cf39b99d24ae3e9c4b9",
  measurementId: "G-EKX9BCHC2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
