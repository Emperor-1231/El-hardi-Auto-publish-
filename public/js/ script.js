// إعداد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// تكوين Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0jbvoclp54WAeKPEjwL9TqLme1FETK9Q",
  authDomain: "el-hardi-auto-publish.firebaseapp.com",
  projectId: "el-hardi-auto-publish",
  storageBucket: "el-hardi-auto-publish.firebasestorage.app",
  messagingSenderId: "804047155992",
  appId: "1:804047155992:web:408a8aea01af1481dca46d"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// إعداد المصادقة
const auth = getAuth();

// تخصيص واجهة المستخدم
const googleSignInButton = document.getElementById("google-sign-in");
const emailSignInButton = document.getElementById("email-sign-in");
const signOutButton = document.getElementById("sign-out");
const userInfoSection = document.getElementById("user-info");
const authContainer = document.getElementById("auth-container");
const userNameElement = document.getElementById("user-name");

// دالة لتحديث واجهة المستخدم بناءً على حالة تسجيل الدخول
function updateUI(user) {
  if (user) {
    // إظهار معلومات المستخدم
    userNameElement.textContent = user.displayName || "مستخدم غير معرف";
    userInfoSection.style.display = "block";
    authContainer.style.display = "none";
  } else {
    // إخفاء معلومات المستخدم وإظهار زر التسجيل
    userInfoSection.style.display = "none";
    authContainer.style.display = "block";
  }
}

// دالة لتسجيل الدخول باستخدام جوجل
googleSignInButton.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      updateUI(user);
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
    });
});

// دالة لتسجيل الخروج
signOutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      updateUI(null);
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

// دالة لتسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
emailSignInButton.addEventListener("click", () => {
  const email = prompt("أدخل بريدك الإلكتروني:");
  const password = prompt("أدخل كلمة المرور:");
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateUI(user);
    })
    .catch((error) => {
      console.error("Error signing in with email:", error);
    });
});

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
auth.onAuthStateChanged((user) => {
  updateUI(user);
});