// public/auth-script.js
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const roleDropdown = document.getElementById("role");
const adminCodeField = document.getElementById("adminCodeField");
const message = document.getElementById("message");

const ADMIN_SECRET = "canteen123"; // You can change this as needed

window.signup = async function () {
  const email = emailInput.value;
  const password = passwordInput.value;
  const role = roleDropdown.value;
  const adminCode = adminCodeField.value;

  try {
    if (role === "admin" && adminCode !== ADMIN_SECRET) {
      throw new Error("Invalid admin access code.");
    }

    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCred.user.uid), {
      role: role,
      email: email
    });

    alert("Signup successful! Please log in.");
  } catch (error) {
    message.innerText = error.message;
  }
};

window.login = async function () {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", userCred.user.uid));

    if (!userDoc.exists()) {
      throw new Error("No user record found.");
    }

    const role = userDoc.data().role;

    if (role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }
  } catch (error) {
    message.innerText = error.message;
  }
};
