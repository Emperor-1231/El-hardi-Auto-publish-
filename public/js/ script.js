// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
  // تعريف العناصر الرئيسية
  const submitButton = document.querySelector('#submit-button');
  const scrollableSections = document.querySelectorAll('.scrollable');
  const dynamicText = document.querySelectorAll('.dynamic-text');
  const animatedElements = document.querySelectorAll('.animated-element');
  const marqueeText = document.querySelector('.marquee-text');
  const particlesContainer = document.querySelector('#particles-js');
  const navbarLinks = document.querySelectorAll('.navbar-link');
  const themeToggle = document.querySelector('#theme-toggle'); // تبديل الوضع
  const notificationsContainer = document.querySelector('#notifications-container');
  const chatWindow = document.querySelector('#chat-window');
  const chartCanvas = document.querySelector('#chart'); // للرسوم البيانية
  const timerElement = document.querySelector('#timer'); // المؤقت

  // ** 1. نظام الوضع الليلي والنهاري **
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    showNotification('تم تغيير الوضع بنجاح!');
  });

  // استعادة الوضع من التخزين المحلي
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
  }

  // ** 2. الإشعارات الديناميكية **
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = message;
    notificationsContainer.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000); // تختفي بعد 3 ثوانٍ
  }

  // ** 3. إضافة المؤقت **
  let timeRemaining = 60; // 60 ثانية
  const timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timerElement.innerText = `الوقت المتبقي: ${timeRemaining--} ثانية`;
    } else {
      clearInterval(timerInterval);
      showNotification('انتهى الوقت!');
    }
  }, 1000);

  // ** 4. نظام دردشة بسيط **
  document.querySelector('#send-message').addEventListener('click', () => {
    const userMessage = document.querySelector('#chat-input').value;
    if (userMessage.trim()) {
      addChatMessage('أنت', userMessage);
      setTimeout(() => addChatMessage('المساعد', 'شكراً لرسالتك!'), 1000);
    }
  });

  function addChatMessage(sender, message) {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message', sender === 'أنت' ? 'user-message' : 'assistant-message');
    chatMessage.innerText = `${sender}: ${message}`;
    chatWindow.appendChild(chatMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight; // للتمرير التلقائي
  }

  // ** 5. إضافة رسوم بيانية ديناميكية **
  if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو'],
        datasets: [{
          label: 'الأداء الشهري',
          data: [10, 20, 15, 30, 25],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }

  // ** 6. خرائط تفاعلية باستخدام Leaflet.js **
  const map = L.map('map').setView([34.020882, -6.841650], 13); // إحداثيات افتراضية
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  L.marker([34.020882, -6.841650]).addTo(map).bindPopup('مرحبًا بكم هنا!').openPopup();

  // ** 7. تأثيرات Particles.js للخلفية **
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
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true }
      }
    });
  }

  // ** 8. تأثيرات تفاعلية مع الأصوات **
  const clickSound = new Howl({ src: ['click.mp3'], volume: 0.5 });
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => clickSound.play());
  });

  // ** 9. ألعاب أو ألغاز صغيرة **
  const puzzleAnswer = '1234';
  document.querySelector('#puzzle-submit').addEventListener('click', () => {
    const answer = document.querySelector('#puzzle-input').value;
    if (answer === puzzleAnswer) {
      showNotification('الإجابة صحيحة!');
    } else {
      showNotification('حاول مرة أخرى!');
    }
  });

  // ** 10. تحسين التمرير (Smooth Scrolling) **
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
});