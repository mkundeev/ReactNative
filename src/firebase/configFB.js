import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBGenMO1Uig8m8mLN5BCW61d9pM5QvpoS4",
  authDomain: "reactnative-d8a9c.firebaseapp.com",
  projectId: "reactnative-d8a9c",
  storageBucket: "reactnative-d8a9c.appspot.com",
  messagingSenderId: "331825382591",
  appId: "1:331825382591:web:ccb213c268e1a0c6e4f20a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
