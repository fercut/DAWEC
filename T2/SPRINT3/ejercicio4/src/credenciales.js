// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9Xk1FaCmLZaZ2G6P2IqFF7V2393bCmwM",
  authDomain: "sonic-terminal-406610.firebaseapp.com",
  projectId: "sonic-terminal-406610",
  storageBucket: "sonic-terminal-406610.appspot.com",
  messagingSenderId: "868650243538",
  appId: "1:868650243538:web:474efba90bc12a52ffe40b",
  measurementId: "G-1NSR9RL86R"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;