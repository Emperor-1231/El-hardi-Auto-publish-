// عند تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
  // تعريف العناصر الأساسية
  const submitButton = document.querySelector('#submit-button');
  const inputField = document.querySelector('#input-field');
  const outputDiv = document.querySelector('#output');
  const scrollableSections = document.querySelectorAll('.scrollable');
  const dynamicText = document.querySelectorAll('.dynamic-text');
  const animatedElements = document.querySelectorAll('.animated-element');
  const marqueeText = document.querySelector('.marquee-text');
  const particlesContainer = document.querySelector('#particles-js');
  const navbarLinks = document.querySelectorAll('.navbar-link');
  const themeToggle = document.querySelector('#theme-toggle'); // لتبديل الوضع الليلي والنهاري
  const notificationsContainer = document.querySelector('#notifications-container');
  const chatWindow = document.querySelector('#chat-window');
  const chartCanvas = document.querySelector('#chart'); // الرسم البياني
  const timerElement = document.querySelector('#timer'); // عنصر المؤقت
  const puzzleInput = document.querySelector('#puzzle-input');
  const puzzleSubmit = document.querySelector('#puzzle-submit');
  const mapContainer = document.querySelector('#map'); // عنصر الخريطة

  // ** 1. نظام الوضع الليلي والنهاري **
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // ** 2. التأثيرات التفاعلية للأزرار **
  submitButton.addEventListener('mouseenter', () => {
    submitButton.classList.add('btn-hover');
  });

  submitButton.addEventListener('mouseleave', () => {
    submitButton.classList.remove('btn-hover');
  });

  // ** 3. إضافة تأثيرات النصوص **
  dynamicText.forEach((textElement) => {
    textElement.addEventListener('mouseover', () => {
      textElement.classList.add('highlight-text');
    });

    textElement.addEventListener('mouseout', () => {
      textElement.classList.remove('highlight-text');
    });
  });

  // ** 4. تأثيرات التمرير (Scroll Effects) **
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

  // ** 5. تأثيرات النصوص المتحركة (Marquee Text) **
  let currentIndex = 0;
  const textList = ["مرحبا بكم في الموقع", "أفضل تجربة تفاعلية هنا", "ابدأ رحلتك الآن"];

  function updateMarquee() {
    marqueeText.innerText = textList[currentIndex];
    currentIndex = (currentIndex + 1) % textList.length;
  }

  setInterval(updateMarquee, 3000); // تغيير النصوص كل 3 ثواني

  // ** 6. نافذة منبثقة عند الضغط على زر Submit **
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

  // ** 7. تأثيرات الحركات المتحركة للعناصر المتنقلة (متقدمة) **
  function addScrollEffect(element, effectClass) {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add(effectClass);
    }
  }

  // ** 8. تأثيرات التمرير الزمني المتقدم (Smooth Scrolling) **
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // ** 9. تأثيرات تفاعلية باستخدام GSAP **
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

  // ** 10. تأثيرات الخلفية باستخدام Particles.js **
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

  // ** 11. تأثير الكتابة باستخدام CSS Keyframes (Typing Effect) **
  const typingText = document.querySelector('.animated-text');
  if (typingText) {
    typingText.classList.add('typing');
  }

  // ** 12. تحسين المظهر باستخدام CSS Variables **
  document.documentElement.style.setProperty('--primary-color', '#4CAF50');
  document.documentElement.style.setProperty('--secondary-color', '#8BC34A');
  document.documentElement.style.setProperty('--text-color', '#333');

  // ** 13. تأثيرات الصوت التفاعلية باستخدام Howler.js **
  const clickSound = new Howl({
    src: ['click.mp3'],
    autoplay: false,
    loop: false,
    volume: 1.0
  });

  document.querySelector('#submit-button').addEventListener('click', () => {
    clickSound.play();
  });

  // ** 14. تحسين الأداء باستخدام requestAnimationFrame **
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      // الأكواد التي تحتاج تحسين الأداء
    });
  });

  // ** 15. تأثيرات التمرير المتقدمة (Advanced Scroll Effects) **
  const scrollSpeed = 0.5;
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach((element) => {
      let offset = window.scrollY * scrollSpeed;
      element.style.backgroundPosition = `center ${offset}px`;
    });
  });

  // ** 16. تأثيرات التفاعل مع الخلفيات (Background Effects) **
  document.querySelectorAll('.parallax').forEach((element) => {
    element.style.backgroundPosition = `center center`;
  });

  // ** 17. تأثيرات التمرير (Scroll Animations) **
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

  // ** 18. إضافة تأثيرات الخريطة التفاعلية (Map Interaction) **
  if (mapContainer) {
    const map = new google.maps.Map(mapContainer, {
      center: { lat: 37.7749, lng: -122.4194 }, // مركز الخريطة
      zoom: 10
    });
    const marker = new google.maps.Marker({
      position: { lat: 37.7749, lng: -122.4194 },
      map: map,
      title: 'San Francisco'
    });
  }

  // ** 19. حل الألغاز (Puzzle) **
  puzzleSubmit.addEventListener('click', () => {
    const userAnswer = puzzleInput.value;
    if (userAnswer === 'الجواب الصحيح') {
      alert('أحسنت!');
    } else {
      alert('إجابة خاطئة. حاول مرة أخرى!');
    }
  });

  // ** 20. تنبيهات فورية (Notifications) **
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerText = message;
    notificationsContainer.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000); // اختفاء التنبيه بعد 5 ثوانٍ
  }

  // ** 21. إضافة تأثيرات الرسم البياني باستخدام Chart.js **
  if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
        datasets: [{
          label: 'المبيعات الشهرية',
          data: [30, 25, 35, 40, 50],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // ** 22. إضافة عداد زمني (Timer) **
  let seconds = 0;
  setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerElement.innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }, 1000); // تحديث العداد كل ثانية

  // ** 23. تحسينات عامة للواجهة (UI Enhancements) **
  navbarLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navbarLinks.forEach((link) => link.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ** 24. إضافة تأثيرات التمرير للصور (Image Scrolling Effects) **
  document.querySelectorAll('.image-scroll').forEach((img) => {
    img.addEventListener('mouseover', () => {
      img.classList.add('zoom-in');
    });
    img.addEventListener('mouseout', () => {
      img.classList.remove('zoom-in');
    });
  });

  // ** 25. التفاعل مع نافذة الدردشة (Chat Window) **
  chatWindow.addEventListener('focus', () => {
    chatWindow.classList.add('active-chat');
  });

  chatWindow.addEventListener('blur', () => {
    chatWindow.classList.remove('active-chat');
  });

  // ** 26. تطبيق المؤثرات التفاعلية على العناصر المختلفة **
  document.querySelectorAll('.interactive-element').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      element.classList.add('element-hover');
    });
    element.addEventListener('mouseleave', () => {
      element.classList.remove('element-hover');
    });
  });

  // ** 27. إعدادات الصوت والوسائط المتعددة (Media Settings) **
  const audio = new Audio('background-music.mp3');
  audio.loop = true;
  audio.volume = 0.5;
  audio.play();

  // ** 28. إضافة واجهة المستخدم الديناميكية لتغيير الموضوع (Dynamic UI Theme) **
  const userPreferences = JSON.parse(localStorage.getItem('preferences')) || {};
  if (userPreferences.theme) {
    document.body.classList.add(userPreferences.theme);
  }

  // تخزين التفضيلات عند التغيير
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    userPreferences.theme = currentTheme;
    localStorage.setItem('preferences', JSON.stringify(userPreferences));
  });
});