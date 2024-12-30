// استيراد المكتبات
const express = require('express');
const app = express();
const path = require('path');

// إعدادات Firebase
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyC0jbvoclp54WAeKPEjwL9TqLme1FETK9Q",
  authDomain: "el-hardi-auto-publish.firebaseapp.com",
  projectId: "el-hardi-auto-publish",
  storageBucket: "el-hardi-auto-publish.firebasestorage.app",
  messagingSenderId: "804047155992",
  appId: "1:804047155992:web:408a8aea01af1481dca46d"
};

// تهيئة Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// إعداد مسار الواجهة
app.use(express.static(path.join(__dirname, 'public')));

// عرض صفحة index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// تشغيل السيرفر
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});