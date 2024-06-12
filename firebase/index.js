// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { API_KEY } from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "shopping-list-a0a96.firebaseapp.com",
  projectId: "shopping-list-a0a96",
  storageBucket: "shopping-list-a0a96.appspot.com",
  messagingSenderId: "588805296947",
  appId: "1:588805296947:web:ccb9b236bd36e53990e446"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db, getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc}