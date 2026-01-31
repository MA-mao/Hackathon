import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyC6wQYtj0IC3VUSaGaAk5e2x7yembMC_EI",
  authDomain: "resume-builder-ee7a5.firebaseapp.com",
  databaseURL: "https://resume-builder-ee7a5-default-rtdb.firebaseio.com",
  projectId: "resume-builder-ee7a5",
  storageBucket: "resume-builder-ee7a5.firebasestorage.app",
  messagingSenderId: "421366943372",
  appId: "1:421366943372:web:b5cc1a1803d49c02b7f5a9",
  measurementId: "G-7H33X4HF2K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app); 
