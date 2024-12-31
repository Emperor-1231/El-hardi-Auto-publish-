// layout.js

// الانتظار حتى يتم تحميل الصفحة بالكامل
window.addEventListener('load', function() {
    // إزالة شاشة التحميل عند تحميل الصفحة
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
});