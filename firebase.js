// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOzId-ut1uZkfEr5kEUhGUUt7N20wyCqs",
  authDomain: "nextjs-firebase-12654.firebaseapp.com",
  projectId: "nextjs-firebase-12654",
  storageBucket: "nextjs-firebase-12654.appspot.com",
  messagingSenderId: "1013643289824",
  appId: "1:1013643289824:web:91c2b71702a5502f985c85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export {db}
