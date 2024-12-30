// firebase-config.js
const firebase = require('firebase-admin');

// استيراد بيانات الحساب الخدمي
const serviceAccount = require('./path/to/your/firebase-service-account-file.json');

// تهيئة Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://el-hardi-auto-publish-default-rtdb.asia-southeast1.firebasedatabase.app/' // رابط قاعدة البيانات
});

// تصدير مرجع قاعدة البيانات
const db = firebase.database();
module.exports = db;