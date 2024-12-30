// app.js
const express = require('express');
const path = require('path');
const firebase = require('firebase-admin');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const port = 3000;

// إعدادات Firebase
const serviceAccount = require('./path/to/your/firebase-service-account-file.json'); // ملف الحساب الخدمي الخاص بك

// تهيئة Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com',
});

// إعدادات الأمان وتحسين الأداء
app.use(helmet()); // حماية الرأس HTTP
app.use(compression()); // ضغط البيانات
app.use(bodyParser.json()); // معالجة بيانات JSON
app.use(bodyParser.urlencoded({ extended: true }));

// إعداد المسارات للموقع
app.use(express.static(path.join(__dirname, 'public')));

// استيراد الراوتر وربطه مع التطبيق
const router = require('./routes/router');
app.use(router);

// استيراد مسار YouTube.js من المجلد routes
const youtubeRouter = require('./routes/YouTube');
app.use('/youtube', youtubeRouter); // ربط المسار الخاص بـ YouTube

// مسار آخر للتأكد من أن التطبيق يدعم المزيد من المسارات
const aboutRouter = require('./routes/about');
app.use('/about', aboutRouter); // مسار صفحة "حول"

// مسار لموارد JSON، على سبيل المثال للإعلانات أو البيانات التي تظهر في صفحة الهبوط
app.get('/api/data', (req, res) => {
  const data = {
    title: 'مرحبًا بك في موقعنا!',
    description: 'نحن نقدم خدمات رائعة!',
  };
  res.json(data);
});

// مثال على مسار يتطلب تحقق من Firebase قبل الوصول
app.get('/secure-data', (req, res) => {
  const user = firebase.auth().currentUser;
  if (user) {
    res.json({ message: 'تم الوصول بنجاح إلى البيانات المحمية' });
  } else {
    res.status(403).json({ message: 'ليس لديك صلاحية الوصول' });
  }
});

// مسار لتسجيل الدخول باستخدام Firebase Authentication
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      res.json({ message: 'تم تسجيل الدخول بنجاح', user });
    })
    .catch(error => {
      res.status(400).json({ message: 'خطأ في تسجيل الدخول', error: error.message });
    });
});

// مسار لإرسال رسالة عبر البريد الإلكتروني باستخدام Firebase
app.post('/send-email', (req, res) => {
  const { to, subject, message } = req.body;
  // هنا يمكن إضافة منطق إرسال البريد الإلكتروني باستخدام Firebase أو خدمة أخرى
  res.json({ message: 'تم إرسال البريد الإلكتروني بنجاح', to, subject });
});

// بدء الخادم على المنفذ المحدد
app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`);
});