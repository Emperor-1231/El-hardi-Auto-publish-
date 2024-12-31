// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
  // عناصر الصفحة الأساسية للتفاعل
  const submitButton = document.querySelector('#submit-button');
  const scrollableSections = document.querySelectorAll('.scrollable');
  const dynamicText = document.querySelectorAll('.dynamic-text');
  const animatedElements = document.querySelectorAll('.animated-element');
  const marqueeText = document.querySelector('.marquee-text');
  const particlesContainer = document.querySelector('#particles-js');
  const navbarLinks = document.querySelectorAll('.navbar-link');
  const interactiveElements = document.querySelectorAll('.interactive-element');
  const typingText = document.querySelector('.animated-text');

  // عناصر للتحكم في الصوتيات
  const clickSound = new Howl({
    src: ['click.mp3'],
    autoplay: false,
    loop: false,
    volume: 1.0,
  });

  const hoverSound = new Howl({
    src: ['hover.mp3'],
    autoplay: false,
    loop: false,
    volume: 0.8,
  });

  // تعيين الألوان الرئيسية باستخدام CSS Variables
  document.documentElement.style.setProperty('--primary-color', '#4CAF50');
  document.documentElement.style.setProperty('--secondary-color', '#8BC34A');
  document.documentElement.style.setProperty('--text-color', '#333');

  // إضافة تأثيرات الأزرار المتقدمة
  submitButton.addEventListener('mouseenter', () => {
    submitButton.classList.add('btn-hover');
    hoverSound.play();
  });

  submitButton.addEventListener('mouseleave', () => {
    submitButton.classList.remove('btn-hover');
  });

  // عند الضغط على زر الإرسال
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    clickSound.play();
    showModal('تم إرسال الطلب بنجاح!');
  });

  // إضافة تأثيرات ديناميكية على النصوص
  dynamicText.forEach((textElement) => {
    textElement.addEventListener('mouseover', () => {
      textElement.classList.add('highlight-text');
    });

    textElement.addEventListener('mouseout', () => {
      textElement.classList.remove('highlight-text');
    });
  });

  // تأثير النصوص المتحركة (Marquee Text)
  let currentIndex = 0;
  const textList = [
    'مرحبا بكم في موقعنا!',
    'أفضل تجربة تفاعلية هنا.',
    'ابدأ رحلتك معنا الآن!',
  ];

  function updateMarquee() {
    marqueeText.innerText = textList[currentIndex];
    currentIndex = (currentIndex + 1) % textList.length;
  }

  setInterval(updateMarquee, 3000);

  // تأثير التمرير السلس للنوافذ المتحركة
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

    animatedElements.forEach((element) => {
      addScrollEffect(element, 'show');
    });
  });

  // تأثيرات التمرير المتقدمة
  const scrollSpeed = 0.3;
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach((element) => {
      let offset = window.scrollY * scrollSpeed;
      element.style.backgroundPosition = `center ${offset}px`;
    });
  });

  // تحسين تجربة النصوص باستخدام CSS Keyframes
  if (typingText) {
    typingText.classList.add('typing');
  }

  // دالة لإظهار نافذة منبثقة
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

  // تحسين تجربة الحركات باستخدام GSAP و ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.fade-in-on-scroll', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    scrollTrigger: {
      trigger: '.fade-in-on-scroll',
      start: 'top 80%',
      end: 'bottom top',
      toggleActions: 'play none none none',
    },
  });

  // تحسين تجربة التفاعل باستخدام Particles.js
  if (particlesContainer) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 1000,
          },
        },
        color: {
          value: '#ffffff',
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.7,
          random: true,
        },
        size: {
          value: 4,
          random: true,
        },
      },
    });
  }

  // إضافة تأثير Parallax على العناصر التفاعلية
  document.addEventListener('mousemove', (e) => {
    interactiveElements.forEach((element) => {
      const x = (e.clientX / window.innerWidth) * 10;
      const y = (e.clientY / window.innerHeight) * 10;
      element.style.transform = `translate(${x}%, ${y}%)`;
    });
  });

  // تحسين الأداء باستخدام requestAnimationFrame
  let lastKnownScrollPosition = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });

  function handleScroll(scrollPos) {
    // أكواد تحسين الأداء هنا
  }
});