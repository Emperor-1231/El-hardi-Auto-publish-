// استيراد الحزم الضرورية
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

// إعداد مسار الصفحة الرئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// مسار صفحة "تواصل معنا"
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// مسار صفحة "حول"
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// مسار تسجيل المستخدم
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await firebase.auth().createUser({
      email,
      password,
    });

    res.status(201).json({ message: 'User registered successfully!', user: userRecord });
  } catch (error) {
    res.status(400).json({ message: `Error registering user: ${error.message}` });
  }
});

// مسار تسجيل الدخول
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await firebase.auth().getUserByEmail(email);

    // ملاحظة: Firebase Authentication لا يدير التحقق من كلمة المرور هنا مباشرة.
    // نحتاج إلى التحقق من كلمة المرور على الجهة الأمامية باستخدام Firebase SDK
    // قم بدمج الكود في التطبيق الأمامي للتحقق من كلمة المرور مباشرة مع Firebase

    res.json({ message: 'User found!', user });
  } catch (error) {
    res.status(404).json({ message: `User not found: ${error.message}` });
  }
});

// مسار للتحقق من صحة التوكن (محمي)
app.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to your profile!' });
});

// دالة للتحقق من صحة التوكن
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided!' });
  }

  firebase.auth().verifyIdToken(token)
    .then(decodedToken => {
      req.userId = decodedToken.uid;
      next();
    })
    .catch(error => {
      res.status(400).json({ message: 'Invalid token!' });
    });
}

// بدء الخادم على المنفذ المحدد
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});