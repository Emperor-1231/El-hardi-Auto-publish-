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

    // إضافة تأثيرات الحركات المتحركة للعناصر المتنقلة
    animatedElements.forEach((element) => {
      addScrollEffect(element, 'show');
    });
  });

  // إضافة تأثيرات النصوص المتحركة
  let currentIndex = 0;
  const textList = ["مرحبا بكم في الموقع", "أفضل تجربة تفاعلية هنا", "ابدأ رحلتك الآن"];

  function updateMarquee() {
    marqueeText.innerText = textList[currentIndex];
    currentIndex = (currentIndex + 1) % textList.length;
  }

  setInterval(updateMarquee, 3000); // تغيير النصوص كل 3 ثواني

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

  // إضافة تأثيرات الحركات المتحركة للعناصر المتنقلة (متقدمة)
  function addScrollEffect(element, effectClass) {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add(effectClass);
    }
  }

  // إضافة تأثيرات الحركة عند التمرير (Parallax Effect)
  document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    document.querySelector('.interactive-element').style.transform = `translate(${x}%, ${y}%)`;
  });

  // إضافة تأثيرات التمرير الزمني المتقدم (Smooth Scrolling)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // استخدام GSAP لتحسين التأثيرات (تأثيرات تفاعلية مع التمرير)
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".fade-in-on-scroll", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: ".fade-in-on-scroll",
      start: "top 80%",
      end: "bottom top",
      toggleActions: "play none none none"
    }
  });

  // تحسين التفاعل مع الخلفية باستخدام Particles.js
  if (particlesContainer) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
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
          value: 5,
          random: true,
          anim: {
            enable: true,
            speed: 40,
            size_min: 0.1
          }
        }
      }
    });
  }

  // إضافة تأثيرات التفاعل مع النصوص باستخدام CSS Keyframes (Typing Effect)
  const typingText = document.querySelector('.animated-text');
  if (typingText) {
    typingText.classList.add('typing');
  }

  // تحسين المظهر باستخدام المتغيرات في CSS (CSS Variables)
  document.documentElement.style.setProperty('--primary-color', '#4CAF50');
  document.documentElement.style.setProperty('--secondary-color', '#8BC34A');
  document.documentElement.style.setProperty('--text-color', '#333');

  // إضافة تأثيرات الصوت التفاعلية باستخدام Howler.js
  const clickSound = new Howl({
    src: ['click.mp3'],
    autoplay: false,
    loop: false,
    volume: 1.0
  });

  document.querySelector('#submit-button').addEventListener('click', () => {
    clickSound.play();
  });

  // تحسين الأداء باستخدام requestAnimationFrame
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      // الأكواد التي تحتاج تحسين الأداء
    });
  });

  // إضافة تأثيرات التمرير المتقدمة (Advanced Scroll Effects)
  const scrollSpeed = 0.5;
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach((element) => {
      let offset = window.scrollY * scrollSpeed;
      element.style.backgroundPosition = `center ${offset}px`;
    });
  });

  // إضافة تأثيرات التفاعل مع الخلفيات (Background Effects)
  document.querySelectorAll('.parallax').forEach((element) => {
    element.style.backgroundPosition = `center center`;
  });

  // إضافة تأثيرات التمرير
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
});