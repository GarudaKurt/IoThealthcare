import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyCf_yEMzkxTZTZvhxnIUfZl3rlqdWRE9Yo",
  authDomain: "smart-health-care-5e33c.firebaseapp.com",
  projectId: "smart-health-care-5e33c",
  databaseURL: "https://iot-healthcare-72d91-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "smart-health-care-5e33c.appspot.com",
  messagingSenderId: "795727902251",
  appId: "1:795727902251:web:da182c3c74b2a5348f1c6e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);