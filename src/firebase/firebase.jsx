// Initialisation
import { initializeApp, getApps } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnNDEUp0nlWBN2SRiDyry1O5uZGs4OSWM",
  authDomain: "tv-show-eebfa.firebaseapp.com",
  projectId: "tv-show-eebfa",
  storageBucket: "tv-show-eebfa.firebasestorage.app",
  messagingSenderId: "68000316723",
  appId: "1:68000316723:web:098cdf146378a4ec46d246",
  databaseURL: "https://tv-show-eebfa-default-rtdb.firebaseio.com/",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

//Authentification
export const auth = getAuth(app);

//FireStore
export const store = getFirestore(app);
