document.addEventListener('DOMContentLoaded', () => {
  // تحديد الأزرار والعناصر التي ستتفاعل معها
  const loginWithGoogleBtn = document.querySelector('#login-google');
  const loginWithEmailBtn = document.querySelector('#login-email');
  const infoSection = document.querySelector('.info');
  const heroSection = document.querySelector('.hero');
  
  // تغيير تفاعل الأزرار
  loginWithGoogleBtn.addEventListener('mouseenter', () => {
    loginWithGoogleBtn.classList.add('hovered');
  });

  loginWithGoogleBtn.addEventListener('mouseleave', () => {
    loginWithGoogleBtn.classList.remove('hovered');
  });

  loginWithEmailBtn.addEventListener('mouseenter', () => {
    loginWithEmailBtn.classList.add('hovered');
  });

  loginWithEmailBtn.addEventListener('mouseleave', () => {
    loginWithEmailBtn.classList.remove('hovered');
  });

  // التعامل مع حدث التمرير
  window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 200) {
      infoSection.classList.add('fade-in');
      infoSection.classList.remove('fade-out');
    } else {
      infoSection.classList.remove('fade-in');
      infoSection.classList.add('fade-out');
    }
    
    // إضافة تأثير Parallax عند التمرير
    heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  });

  // فتح نافذة منبثقة عند الضغط على الأزرار
  loginWithGoogleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showModal('تم الضغط على زر تسجيل الدخول باستخدام جوجل');
    // هنا يمكن إضافة الكود الخاص بتسجيل الدخول باستخدام جوجل
  });

  loginWithEmailBtn.addEventListener('click', (event) => {
    event.preventDefault();
    showModal('تم الضغط على زر تسجيل الدخول باستخدام البريد الإلكتروني');
    // هنا يمكن إضافة الكود الخاص بتسجيل الدخول عبر البريد الإلكتروني
  });

  // وظيفة لتخصيص التفاعل مع النوافذ المنبثقة
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

  // وظيفة الانتقال بين الأقسام مع التأثيرات
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

  // تحسين النصوص المعروضة بتأثيرات CSS ديناميكية
  const dynamicText = document.querySelectorAll('.dynamic-text');
  dynamicText.forEach((el, index) => {
    el.addEventListener('mouseover', () => {
      el.classList.add('highlight');
    });

    el.addEventListener('mouseleave', () => {
      el.classList.remove('highlight');
    });
  });
});