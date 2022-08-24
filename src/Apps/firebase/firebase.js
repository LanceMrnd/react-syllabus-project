import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAKwlNwRKQO8z5JIFw0YYOwvmBxe_iN7-8",
  authDomain: "web-based-syllabus.firebaseapp.com",
  databaseURL: "https://web-based-syllabus-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-based-syllabus",
  storageBucket: "web-based-syllabus.appspot.com",
  messagingSenderId: "113106456905",
  appId: "1:113106456905:web:fd369a0b54e8ac743e4a98"
}


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const storage = getStorage(app)