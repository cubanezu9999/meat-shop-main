// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCw9-hkgs1Ynlr18pvK-V2RfQ7jaXtKFok",
  authDomain: "halal-shop-505b4.firebaseapp.com",
  projectId: "halal-shop-505b4",
  storageBucket: "halal-shop-505b4.appspot.com",
  messagingSenderId: "1055786429329",
  appId: "1:1055786429329:web:5231a6150e23fa76584830",
  measurementId: "G-F0CJYB8CE1",
};

export const app = initializeApp(firebaseConfig);
export const store = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
