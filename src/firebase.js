// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvRKqbdRuTjF_kH4w7FZ31SF3ypxw9H7o",
  authDomain: "killu-app-a8d02.firebaseapp.com",
  projectId: "killu-app-a8d02",
  storageBucket: "killu-app-a8d02.firebasestorage.app",
  messagingSenderId: "90571826010",
  appId: "1:90571826010:web:7553e17dabdd07dbd58963",
  measurementId: "G-DBS34FYEV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);