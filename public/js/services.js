// انتظار تحميل الصفحة بالكامل قبل تنفيذ السكربت
document.addEventListener("DOMContentLoaded", function() {
    // إخفاء شاشة التحميل بعد تحميل الصفحة
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// إضافة تأثيرات تفاعلية أو حركية لأقسام الصفحة (مثال: إظهار/إخفاء عناصر)
document.addEventListener("scroll", function() {
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        // إذا كان القسم مرئيًا أثناء التمرير، نضيف له تأثيرات
        const rect = servicesSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            servicesSection.classList.add('visible');
        } else {
            servicesSection.classList.remove('visible');
        }
    }
});

// مثال على إضافة وظيفة لعرض المزيد من المحتوى إذا كان هناك حاجة
function toggleMoreContent() {
    const moreContent = document.querySelector('.more-content');
    if (moreContent) {
        if (moreContent.style.display === 'none') {
            moreContent.style.display = 'block';
        } else {
            moreContent.style.display = 'none';
        }
    }
}

// تفعيل الوظيفة من خلال إضافة زر أو أي عنصر في الـ HTML لربطه بالـ JavaScript
// مثال على إضافة وظيفة عند النقر على زر في القسم المحدد
const moreContentButton = document.querySelector('.more-content-button');
if (moreContentButton) {
    moreContentButton.addEventListener('click', toggleMoreContent);
}