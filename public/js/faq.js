// تحديد جميع الأسئلة (العناصر التي تحتوي على الأسئلة)
const faqItems = document.querySelectorAll('.question, .faq-item');

// إضافة حدث عند النقر على كل سؤال لفتح وإغلاق الإجابة
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        // البحث عن الإجابة داخل السؤال
        const answer = item.querySelector('p');

        // التبديل بين إظهار وإخفاء الإجابة
        if (answer.style.display === "none" || answer.style.display === "") {
            answer.style.display = "block";  // إظهار الإجابة
        } else {
            answer.style.display = "none";   // إخفاء الإجابة
        }

        // تغيير شكل السهم أو أي عنصر آخر لتوضيح الفتح والإغلاق (اختياري)
        item.classList.toggle('active');
    });
});

// التأكد من أن جميع الإجابات مخفية عند تحميل الصفحة لأول مرة
document.addEventListener('DOMContentLoaded', () => {
    faqItems.forEach(item => {
        const answer = item.querySelector('p');
        if (answer) {
            answer.style.display = "none";  // إخفاء الإجابة عند البداية
        }
    });
});