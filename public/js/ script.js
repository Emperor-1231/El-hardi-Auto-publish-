// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0jbvoclp54WAeKPEjwL9TqLme1FETK9Q",
    authDomain: "el-hardi-auto-publish.firebaseapp.com",
    projectId: "el-hardi-auto-publish",
    storageBucket: "el-hardi-auto-publish.firebasestorage.app",
    messagingSenderId: "804047155992",
    appId: "1:804047155992:web:408a8aea01af1481dca46d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Google Sign-In
const googleSignInBtn = document.getElementById("google-signin-btn");
googleSignInBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            showUserInfo(user.displayName);
        })
        .catch(error => {
            console.error(error);
        });
});

// Email/Password Login
const emailLoginForm = document.getElementById("email-login-form");
emailLoginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            showUserInfo(user.email);
        })
        .catch(error => {
            console.error(error);
        });
});

// Show User Info
const showUserInfo = (userName) => {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("user-info").style.display = "block";
    document.getElementById("user-name").textContent = userName;
};

// Logout
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            document.getElementById("login-container").style.display = "block";
            document.getElementById("user-info").style.display = "none";
        })
        .catch(error => {
            console.error(error);
        });
});