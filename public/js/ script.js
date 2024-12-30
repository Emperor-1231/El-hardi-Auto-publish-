// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
  // الحصول على العناصر التي ستتفاعل معها
  const submitButton = document.querySelector('#submit-button');
  const scrollableSections = document.querySelectorAll('.scrollable');
  const dynamicText = document.querySelectorAll('.dynamic-text');

  // تفعيل تأثيرات الأزرار بشكل احترافي
  submitButton.addEventListener('mouseenter', () => {
    submitButton.classList.add('btn-hover');
  });

  submitButton.addEventListener('mouseleave', () => {
    submitButton.classList.remove('btn-hover');
  });

  // إضافة تأثيرات فنية للنصوص
  dynamicText.forEach((textElement) => {
    textElement.addEventListener('mouseover', () => {
      textElement.classList.add('highlight-text');
    });

    textElement.addEventListener('mouseout', () => {
      textElement.classList.remove('highlight-text');
    });
  });

  // تفعيل تأثيرات التمرير
  window.addEventListener('scroll', () => {
    scrollableSections.forEach((section) => {
      let sectionTop = section.offsetTop;
      let scrollPosition = window.scrollY;

      if (scrollPosition > sectionTop - 200) {
        section.classList.add('fade-in');
      } else {
        section.classList.remove('fade-in');
      }
    });
  });

  // إضافة تأثيرات الحركات المتحركة للعناصر المتنقلة
  function addScrollEffect(element, effectClass) {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add(effectClass);
    }
  }

  const animatedElements = document.querySelectorAll('.animated-element');
  window.addEventListener('scroll', () => {
    animatedElements.forEach((element) => {
      addScrollEffect(element, 'show');
    });
  });

  // إظهار نافذة منبثقة عند الضغط على زر submit
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    showModal('تم إرسال الطلب بنجاح!');
  });

  // دالة لعرض نافذة منبثقة
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

    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
  }

  // إضافة تأثيرات النصوص المتحركة
  const marqueeText = document.querySelector('.marquee-text');
  let currentIndex = 0;
  const textList = ["مرحبا بكم في الموقع", "أفضل تجربة تفاعلية هنا", "ابدأ رحلتك الآن"];

  function updateMarquee() {
    marqueeText.innerText = textList[currentIndex];
    currentIndex = (currentIndex + 1) % textList.length;
  }

  setInterval(updateMarquee, 3000);  // تغيير النصوص كل 3 ثواني
});