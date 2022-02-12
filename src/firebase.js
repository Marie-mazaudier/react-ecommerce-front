import { initializeApp } from 'firebase/app';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvGkcUClmpDewA11f4eA2hvjSNKFbuwik",
    authDomain: "ecommerce-5e070.firebaseapp.com",
    databaseURL: "https://ecommerce-5e070-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ecommerce-5e070",
    storageBucket: "ecommerce-5e070.appspot.com",
    messagingSenderId: "812190089261",
    appId: "1:812190089261:web:f27694a4dcf53616d278a4"
  };
 
// Init
firebase.initializeApp(firebaseConfig);
 
// Exports
//const app = firebase.initializeApp(firebaseConfig);
////const auth = app.auth();

//export const auth =getAuth();
//export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.database();

