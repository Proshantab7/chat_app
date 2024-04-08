// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxkN-mO8Ue-fofuhE4w8nMABkjB5pT4Ak",
  authDomain: "chatapp-fb78b.firebaseapp.com",
  projectId: "chatapp-fb78b",
  storageBucket: "chatapp-fb78b.appspot.com",
  messagingSenderId: "926035861728",
  appId: "1:926035861728:web:6bb58b674531dfe3e03085"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth};