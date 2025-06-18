import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyApFgMZufwpFxnGxKxMXrfJEl_rwtv21iU",
  authDomain: "capstone-af1ab.firebaseapp.com",
  projectId: "capstone-af1ab",
  storageBucket: "capstone-af1ab.firebasestorage.app",
  messagingSenderId: "953630621730",
  appId: "1:953630621730:web:28b42957cd80b22def0a7b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
