// Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getFirestore, setDoc, doc, collection, query, where, getDocs , getDoc  , arrayUnion ,  updateDoc , arrayRemove } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// ✅ Your Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAQOaaL-IC9lcKRSelAqv6W9ttYw447MRo",
    authDomain: "smit-authentication-app.firebaseapp.com",
    projectId: "smit-authentication-app",
    storageBucket: "smit-authentication-app.firebasestorage.app",
    messagingSenderId: "614924523485",
    appId: "1:614924523485:web:094b27ed2857863ac98834",
    measurementId: "G-BCC59C1XGJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export {
 auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setDoc,
    doc,
    db,
    collection, 
    query, 
    where, 
    getDocs,
    getDoc,
    arrayUnion,
    updateDoc ,
    arrayRemove
}