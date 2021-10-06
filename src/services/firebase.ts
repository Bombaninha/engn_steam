// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWAi_jcZRzfOV80IC9HieOodVR3a0X-oQ",
  authDomain: "engn-steam.firebaseapp.com",
  databaseURL: "https://engn-steam-default-rtdb.firebaseio.com",
  projectId: "engn-steam",
  storageBucket: "engn-steam.appspot.com",
  messagingSenderId: "282059816447",
  appId: "1:282059816447:web:7a01f319a41e7ab8c03bca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase()
const auth = getAuth()

export { app, auth, database, ref, set };