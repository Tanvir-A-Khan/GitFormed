// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoQF0mwJqk6qGeTgjLPxpONoisC792fJs",
  authDomain: "gitformed-ab03a.firebaseapp.com",
  projectId: "gitformed-ab03a",
  storageBucket: "gitformed-ab03a.appspot.com",
  messagingSenderId: "631341080766",
  appId: "1:631341080766:web:c9672a06c3823399c57eef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


