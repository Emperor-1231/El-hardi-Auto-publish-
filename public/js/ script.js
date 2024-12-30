// استيراد مكتبات Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0jbvoclp54WAeKPEjwL9TqLme1FETK9Q",
  authDomain: "el-hardi-auto-publish.firebaseapp.com",
  projectId: "el-hardi-auto-publish",
  storageBucket: "el-hardi-auto-publish.firebasestorage.app",
  messagingSenderId: "804047155992",
  appId: "1:804047155992:web:408a8aea01af1481dca46d"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// التفاعل مع الأزرار لتسجيل الدخول باستخدام جوجل
document.getElementById('google-sign-in').addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    document.getElementById('user-name').textContent = user.displayName;
    document.getElementById('user-info').style.display = 'block';
  } catch (error) {
    console.error(error);
  }
});

// التفاعل مع الأزرار لتسجيل الدخول باستخدام البريد الإلكتروني
document.getElementById('email-sign-in').addEventListener('click', () => {
  const email = prompt('أدخل بريدك الإلكتروني:');
  const password = prompt('أدخل كلمة المرور:');
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById('user-name').textContent = user.email;
      document.getElementById('user-info').style.display = 'block';
    })
    .catch((error) => {
      console.error(error);
    });
});

// التفاعل مع زر تسجيل الخروج
document.getElementById('sign-out').addEventListener('click', () => {
  signOut(auth).then(() => {
    document.getElementById('user-info').style.display = 'none';
    console.log("تم تسجيل الخروج بنجاح");
  }).catch((error) => {
    console.error(error);
  });
});