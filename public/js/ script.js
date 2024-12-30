// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
  // تحديد العناصر التي ستتفاعل معها
  const loginWithGoogleBtn = document.querySelector('#login-google');
  const loginWithEmailBtn = document.querySelector('#login-email');
  const infoSection = document.querySelector('.info');
  const heroSection = document.querySelector('.hero');

  // عندما يتم الضغط على زر تسجيل الدخول باستخدام جوجل
  loginWithGoogleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showModal('تم الضغط على زر تسجيل الدخول باستخدام جوجل');
    // هنا يمكن إضافة الكود الخاص بتسجيل الدخول باستخدام جوجل
  });

  // عندما يتم الضغط على زر تسجيل الدخول باستخدام البريد الإلكتروني
  loginWithEmailBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showModal('تم الضغط على زر تسجيل الدخول باستخدام البريد الإلكتروني');
    // هنا يمكن إضافة الكود الخاص بتسجيل الدخول عبر البريد الإلكتروني
  });

  // التمرير على قسم المعلومات لإظهار تأثيرات التمرير
  window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 200) {
      infoSection.classList.add('fade-in');
      infoSection.classList.remove('fade-out'); // إزالة أي تأثير تلاشي قديم
    } else {
      infoSection.classList.remove('fade-in');
      infoSection.classList.add('fade-out');
    }
  });

  // تأثيرات التمرير على قسم الهيرو
  heroSection.addEventListener('mouseover', () => {
    heroSection.style.backgroundColor = '#2980b9'; // تغيير اللون عند المرور
    heroSection.style.transition = 'background-color 0.3s ease';
  });

  heroSection.addEventListener('mouseout', () => {
    heroSection.style.backgroundColor = '#3498db'; // العودة إلى اللون الأصلي
  });

  // إضافة انتقال سلس بين الأقسام
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

  // وظيفة لعرض نافذة منبثقة (Modal) عند النقر على زر
  function showModal(message) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(modal);

    // إغلاق النافذة عند النقر على زر الإغلاق
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
  }
});