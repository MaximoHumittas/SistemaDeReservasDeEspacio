// 1 regla no hablar de huevito rey 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlSXXS3y1N8tk2FWG2qaXo-3qHspcZAWE",
  authDomain: "reservas-de-espacios-6dc9f.firebaseapp.com",
  projectId: "reservas-de-espacios-6dc9f",
  storageBucket: "reservas-de-espacios-6dc9f.appspot.com",
  messagingSenderId: "150030187248",
  appId: "1:150030187248:web:7ac98f77fd3d4e1cfa6035"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  export {app ,auth};
 