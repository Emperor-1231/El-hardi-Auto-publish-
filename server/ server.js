// ===== [ مقدمة الإمبراطورية ] =====
// موقع: El hardi Auto publish
// المطور: الإمبراطور عبد الرحمـٰن الهردي
// وصف: أفضل موقع في التاريخ لنشر المحتوى تلقائيًا بخوارزميات عبقرية.


// ===== [ استدعاء المكتبات الأساسية ] =====
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// ===== [ تحميل إعدادات البيئة من ملف .env ] =====
dotenv.config();

// ===== [ إنشاء التطبيق الرئيسي باستخدام Express ] =====
const app = express();

// ===== [ إعداد المنفذ الأساسي للتطبيق ] =====
const PORT = process.env.PORT || 3000;

// ===== [ تكوين الـ Middleware ] =====
app.use(bodyParser.json()); // لتحليل بيانات JSON القادمة من الطلبات
app.use(bodyParser.urlencoded({ extended: true })); // لتحليل البيانات المشفرة URL Encoded
app.use(morgan('dev')); // تسجيل الطلبات لتسهيل مراقبة الأداء
app.use(cors()); // السماح بالطلبات من أصول مختلفة (مهم للدمج مع التطبيقات الأخرى)
app.use(express.static(path.join(__dirname, '../assets'))); // لخدمة الملفات الثابتة (CSS، JS)

// ===== [ رسالة ترحيبية عند الوصول إلى الصفحة الرئيسية ] =====
app.get('/', (req, res) => {
    res.status(200).send(`
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #1e90ff;">مرحبًا بك في الإمبراطورية El hardi Auto publish</h1>
            <p style="color: #333;">الموقع الذي سيثور عالم النشر التلقائي بقيادة <strong>الإمبراطور عبد الرحمـٰن الهردي</strong>.</p>
            <p style="color: #777;">اكتشف قوة البرمجيات، وكن جزءًا من هذه الرحلة العظيمة.</p>
        </div>
    `);
});

// ===== [ مسارات API المخصصة ] =====
const youtubeRoutes = require('./routes/youtube'); // مسارات جلب محتوى YouTube
const otherRoutes = require('./routes/other'); // مسارات أخرى قد نضيفها لاحقًا
app.use('/api/youtube', youtubeRoutes); // لتخصيص مسار YouTube API
app.use('/api/other', otherRoutes); // للمستقبل

// ===== [ التعامل مع الأخطاء: 404 Not Found ] =====
app.use((req, res, next) => {
    res.status(404).send(`
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: red;">خطأ 404</h1>
            <p style="color: #333;">عذرًا، الصفحة التي تبحث عنها غير موجودة!</p>
        </div>
    `);
});

// ===== [ التعامل مع الأخطاء العامة ] =====
app.use((err, req, res, next) => {
    console.error(`[خطأ] ${err.message}`);
    res.status(500).send({
        error: true,
        message: "حدث خطأ غير متوقع! فريقنا يعمل على إصلاحه."
    });
});

// ===== [ تشغيل السيرفر وإظهار رسالة بدء التشغيل ] =====
app.listen(PORT, () => {
    console.log(`✨ السيرفر يعمل الآن على: http://localhost:${PORT}`);
    console.log(`
        =====================================================
        🚀 مرحبًا بك في الإمبراطورية El hardi Auto publish
        المطور: الإمبراطور عبد الرحمـٰن الهردي
        الوصف: أفضل موقع لنشر المحتوى التلقائي بخوارزميات أسطورية.
        =====================================================
    `);
});