// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAuMhFesa4dAweRVGDgS9Jy_i_0BVP2yU",
  authDomain: "planit-green.firebaseapp.com",
  projectId: "planit-green",
  storageBucket: "planit-green.appspot.com",
  messagingSenderId: "329676023850",
  appId: "1:329676023850:web:312e0262606ea2d72f3b53",
  measurementId: "G-MRZWSJSTP3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, app, firestore, storage }