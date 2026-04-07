// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrigqfq3edREHAz1DRyJh92r0gMuLku4Y",
  authDomain: "task-manager-698f9.firebaseapp.com",
  projectId: "task-manager-698f9",
  storageBucket: "task-manager-698f9.firebasestorage.app",
  messagingSenderId: "116264664534",
  appId: "1:116264664534:web:4db2eb1ed8e41fb44fb877"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);