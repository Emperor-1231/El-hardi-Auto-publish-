// 1. إخفاء شاشة التحميل بعد تحميل الصفحة
window.addEventListener("load", function() {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";  // إخفاء شاشة التحميل
});

// 2. إضافة تأثير التمرير للصور والعناصر
const images = document.querySelectorAll("img");
const texts = document.querySelectorAll(".animate-text"); // العناصر التي تحتوي على النصوص المتحركة
const options = {
    threshold: 0.5 // نسبة الظهور المطلوبة لتفعيل التأثير
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, options);

images.forEach(image => {
    observer.observe(image);
});
texts.forEach(text => {
    observer.observe(text);
});

// 3. التبديل بين اللغات
const languageSwitchers = document.querySelectorAll(".lang-switch");

languageSwitchers.forEach(switcher => {
    switcher.addEventListener("click", function(event) {
        const lang = event.target.dataset.lang;
        changeLanguage(lang);
    });
});

function changeLanguage(language) {
    // هنا يمكن إضافة منطق تغيير النصوص بناءً على اللغة
    // مثل تغيير محتويات العناصر بناءً على اللغة المحددة
    if (language === "ar") {
        document.documentElement.lang = "ar";
        document.querySelector("meta[charset='UTF-8']").setAttribute("lang", "ar");
        // المزيد من العمليات لتغيير النصوص على الصفحة
    } else if (language === "en") {
        document.documentElement.lang = "en";
        document.querySelector("meta[charset='UTF-8']").setAttribute("lang", "en");
        // المزيد من العمليات لتغيير النصوص على الصفحة
    }
    // يمكن إضافة المزيد من اللغات حسب الحاجة
}

// 4. إضافة تأثيرات عند التمرير للعناصر النصية
const animateElements = document.querySelectorAll(".animate-on-scroll");

const scrollObserver = new IntersectionObserver((entries, scrollObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

animateElements.forEach(el => {
    scrollObserver.observe(el);
});

// 5. تأثيرات عند المرور على الأزرار
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("mouseenter", function() {
        button.classList.add("hovered");
    });
    button.addEventListener("mouseleave", function() {
        button.classList.remove("hovered");
    });

    button.addEventListener("click", function() {
        button.classList.add("clicked");
        setTimeout(() => {
            button.classList.remove("clicked");
        }, 500); // إزالة التأثير بعد نصف ثانية
    });
});

// 6. التنقل الثابت (Sticky Navigation)
const nav = document.querySelector(".nav");
const stickyNav = nav.offsetTop;

window.addEventListener("scroll", function() {
    if (window.pageYOffset > stickyNav) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
});

// 7. تأثيرات التمرير (مثل الانزلاق والتلاشي) للنصوص والعناوين
const headers = document.querySelectorAll(".header, .subheader");

headers.forEach(header => {
    header.classList.add("hidden"); // إخفاء العنصر مسبقًا
    observer.observe(header); // إضافة تأثير التمرير
});