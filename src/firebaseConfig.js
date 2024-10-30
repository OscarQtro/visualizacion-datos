// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCNRauZ_1tMLyCSWxbHnaBWWh86m9k1Ypk",
  authDomain: "gestion-x-646d5.firebaseapp.com",
  databaseURL: "https://gestion-x-646d5-default-rtdb.firebaseio.com",
  projectId: "gestion-x-646d5",
  storageBucket: "gestion-x-646d5.appspot.com",
  messagingSenderId: "765928343644",
  appId: "1:765928343644:web:2a106cbcfdbce88a993e99",
  measurementId: "G-X00XWMRE5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };