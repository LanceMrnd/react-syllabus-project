import firebase from "firebase/compat/app";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAaBMchKLPFipb_VsUK28o6k8II2oz91xk",
  authDomain: "react-upload-51843.firebaseapp.com",
  projectId: "react-upload-51843",
  storageBucket: "react-upload-51843.appspot.com",
  messagingSenderId: "770396406033",
  appId: "1:770396406033:web:0ac437b81a9766adb44cb0",
  measurementId: "G-7V3XNVSF9S"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };