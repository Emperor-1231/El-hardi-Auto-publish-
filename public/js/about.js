// about.js

// التأكد من تحميل الصفحة بالكامل قبل تنفيذ أي وظيفة
document.addEventListener('DOMContentLoaded', function () {
    // إخفاء شاشة التحميل بعد تحميل الصفحة
    setTimeout(function() {
        document.querySelector('.loader').style.display = 'none';
        document.body.classList.remove('loading');
    }, 1500);  // تأخير 1.5 ثانية

    // إضافة أي تفاعلات إضافية هنا إذا لزم الأمر
});