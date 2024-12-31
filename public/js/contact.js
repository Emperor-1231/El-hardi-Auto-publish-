document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const loader = document.querySelector('.loader');
    const submitButton = form.querySelector('button');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // إخفاء شاشة التحميل بعد تحميل الصفحة
    loader.style.display = "none";

    // التحقق من صحة البيانات قبل إرسال النموذج
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // منع الإرسال الافتراضي للنموذج

        // استعراض القيم المدخلة
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // التحقق من المدخلات
        if (name === "" || email === "" || message === "") {
            alert("يرجى ملء جميع الحقول المطلوبة.");
            return;
        }

        if (!validateEmail(email)) {
            alert("البريد الإلكتروني غير صالح. يرجى إدخال بريد إلكتروني صحيح.");
            return;
        }

        // إظهار شاشة التحميل عند إرسال البيانات
        loader.style.display = "flex";
        submitButton.disabled = true; // تعطيل الزر أثناء الإرسال

        // محاكاة إرسال البيانات (يمكنك استبداله بكود فعلي للإرسال لاحقًا)
        setTimeout(() => {
            loader.style.display = "none";
            alert("تم إرسال الرسالة بنجاح!");
            form.reset(); // إعادة تعيين النموذج بعد الإرسال
            submitButton.disabled = false; // تمكين الزر مرة أخرى
        }, 2000); // محاكاة تأخير بسيط لإرسال البيانات
    });

    // وظيفة للتحقق من صحة البريد الإلكتروني
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // إضافة تأثيرات عند التفاعل مع المدخلات
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('focus', function () {
            input.style.borderColor = "#3498db"; // تغيير لون الحدود عند التركيز
        });

        input.addEventListener('blur', function () {
            input.style.borderColor = "#ddd"; // إعادة اللون إلى الطبيعي عند عدم التركيز
        });
    });

    // تأثير على الزر عند مرور الماوس عليه
    submitButton.addEventListener('mouseover', function () {
        submitButton.style.backgroundColor = "#2980b9";
    });

    submitButton.addEventListener('mouseout', function () {
        submitButton.style.backgroundColor = "#3498db";
    });
});