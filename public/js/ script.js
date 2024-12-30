// انتظر تحميل DOM بالكامل قبل تنفيذ أي أكواد
document.addEventListener('DOMContentLoaded', () => {
  // جلب العناصر الضرورية
  const loginWithGoogleBtn = document.querySelector('#login-google');
  const loginWithEmailBtn = document.querySelector('#login-email');
  const infoSection = document.querySelector('.info');
  const heroSection = document.querySelector('.hero');

  // التعامل مع زر تسجيل الدخول باستخدام جوجل
  loginWithGoogleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    alert('تم الضغط على زر تسجيل الدخول باستخدام جوجل');
    // هنا يمكن إضافة الكود الخاص بتسجيل الدخول عبر جوجل
  });

  // التعامل مع زر تسجيل الدخول باستخدام البريد الإلكتروني
  loginWithEmailBtn.addEventListener('click', (event) => {
    event.preventDefault();
    alert('تم الضغط على زر تسجيل الدخول باستخدام البريد الإلكتروني');
    // هنا يمكن إضافة الكود الخاص بتسجيل الدخول عبر البريد الإلكتروني
  });

  // إضافة تأثير عند التمرير على قسم المعلومات
  window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    // إذا كانت المسافة المقطوعة على الصفحة أكبر من 200px، يتم إضافة تأثير
    if (scrollPosition > 200) {
      infoSection.classList.add('fade-in');
    } else {
      infoSection.classList.remove('fade-in');
    }
  });

  // إضافة تأثير عند التمرير على قسم الهيرو
  heroSection.addEventListener('mouseover', () => {
    heroSection.style.backgroundColor = '#2980b9'; // تغيير اللون عند المرور
    heroSection.style.transition = 'background-color 0.3s ease';
  });

  heroSection.addEventListener('mouseout', () => {
    heroSection.style.backgroundColor = '#3498db'; // العودة إلى اللون الأصلي
  });

  // إضافة وظيفة لتنقل المستخدم بشكل سلس عبر الأقسام
  const navLinks = document.querySelectorAll('header nav ul li a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      });
    });
  });
});