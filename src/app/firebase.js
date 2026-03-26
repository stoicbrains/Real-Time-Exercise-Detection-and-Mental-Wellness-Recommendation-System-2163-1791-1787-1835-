
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCk_gvxG-XlasMjQo3NtxVe8bE5Z1bcSlc",
  authDomain: "project-harmony-1cc94.firebaseapp.com",
  projectId: "project-harmony-1cc94",
  storageBucket: "project-harmony-1cc94.appspot.com",
  messagingSenderId: "1027202986305",
  appId: "1:1027202986305:web:b63ca6803c26fca37e71c0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db ,app};