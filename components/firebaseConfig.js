// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyCf_yEMzkxTZTZvhxnIUfZl3rlqdWRE9Yo", //my realtile apiKey
  authDomain: "smart-health-care-5e33c.firebaseapp.com", //firestore
  projectId: "smart-health-care-5e33c",//firestore
  databaseURL: "https://iot-healthcare-72d91-default-rtdb.asia-southeast1.firebasedatabase.app", //myrealtime database config
  storageBucket: "smart-health-care-5e33c.appspot.com",//firestorer
  messagingSenderId: "795727902251",//firestore
  appId: "1:795727902251:web:da182c3c74b2a5348f1c6e"//firestore
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);