// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
  // الحصول على العناصر التي ستتفاعل معها
  const submitButton = document.querySelector('#submit-button');
  const scrollableSections = document.querySelectorAll('.scrollable');
  const dynamicText = document.querySelectorAll('.dynamic-text');
  const animatedElements = document.querySelectorAll('.animated-element');
  const marqueeText = document.querySelector('.marquee-text');
  const particlesContainer = document.querySelector('#particles-js');
  const navbarLinks = document.querySelectorAll('.navbar-link');

  // تفعيل تأثيرات الأزرار بشكل احترافي
  if (submitButton) {
    submitButton.addEventListener('mouseenter', () => {
      submitButton.classList.add('btn-hover');
    });

    submitButton.addEventListener('mouseleave', () => {
      submitButton.classList.remove('btn-hover');
    });

    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      showModal('🌟 شكراً لتواصلك معنا! تم إرسال طلبك بنجاح! 🌟');
    });
  }

  // إضافة تأثيرات فنية للنصوص
  dynamicText.forEach((textElement) => {
    textElement.addEventListener('mouseover', () => {
      textElement.classList.add('highlight-text');
      textElement.title = 'تفاعل مع النص للحصول على تجربة مميزة!';
    });

    textElement.addEventListener('mouseout', () => {
      textElement.classList.remove('highlight-text');
    });
  });

  // تفعيل تأثيرات التمرير
  window.addEventListener('scroll', () => {
    scrollableSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const scrollPosition = window.scrollY;

      if (scrollPosition > sectionTop - 200) {
        section.classList.add('fade-in');
      } else {
        section.classList.remove('fade-in');
      }
    });

    animatedElements.forEach((element) => {
      addScrollEffect(element, 'show');
    });
  });

  // إضافة تأثيرات النصوص المتحركة
  let currentIndex = 0;
  const textList = ["✨ أهلاً بك في موقعنا الرائع!", "🎯 أفضل تجربة تفاعلية بين يديك.", "🚀 ابدأ رحلتك الآن واستمتع."];

  function updateMarquee() {
    marqueeText.innerText = textList[currentIndex];
    currentIndex = (currentIndex + 1) % textList.length;
  }

  setInterval(updateMarquee, 3000);

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

  // إضافة تأثيرات الحركة عند التمرير
  function addScrollEffect(element, effectClass) {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add(effectClass);
    }
  }

  // إضافة تأثيرات الصوت
  const clickSound = new Howl({
    src: ['assets/sounds/click.mp3'],
    autoplay: false,
    loop: false,
    volume: 0.7
  });

  if (submitButton) {
    submitButton.addEventListener('click', () => {
      clickSound.play();
    });
  }

  // تحسين المظهر باستخدام المتغيرات في CSS
  document.documentElement.style.setProperty('--primary-color', '#4CAF50');
  document.documentElement.style.setProperty('--secondary-color', '#8BC34A');
  document.documentElement.style.setProperty('--text-color', '#333');

  // تحسين التفاعل مع الخلفية باستخدام Particles.js
  if (particlesContainer) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 1000
          }
        },
        color: {
          value: "#00A1D9"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1
          }
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: true,
            speed: 20,
            size_min: 0.1
          }
        }
      }
    });
  }

  // إضافة تأثير التمرير المتقدم
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach((element) => {
      const offset = window.scrollY * 0.5;
      element.style.backgroundPosition = `center ${offset}px`;
    });
  });
});