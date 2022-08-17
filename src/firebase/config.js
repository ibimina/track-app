// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,Timestamp} from "firebase/firestore"
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApV3y5ls9cNT65eBAKX71QZDrHatR8nSs",
  authDomain: "expense-tracker-ff2d6.firebaseapp.com",
  projectId: "expense-tracker-ff2d6",
  storageBucket: "expense-tracker-ff2d6.appspot.com",
  messagingSenderId: "596361226823",
  appId: "1:596361226823:web:5beb10216eed619b821f62",
};

//init firebase
initializeApp(firebaseConfig);

//init firestore
const db = getFirestore();


const timestamp = Timestamp

//init authentication
const auth = getAuth()

//export to use in project
export { db,auth,timestamp };