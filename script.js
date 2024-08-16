
document.addEventListener("DOMContentLoaded", function() {
  const startBtn = document.getElementById('startBtn');
  const slides = document.getElementById('slides');
  const slideElements = slides.querySelectorAll('.slide');
  let currentSlide = 0;

  // 显示幻灯片并隐藏引言
  startBtn.addEventListener('click', () => {
    document.querySelector('.intro').style.display = 'none';
    slides.style.display = 'block';
    showSlide(currentSlide);
  });

  // 显示指定幻灯片的功能
  function showSlide(index) {
    slideElements.forEach((slide, i) => {
      slide.style.display = (i === index) ? 'block' : 'none';
    });
  }

  // 幻灯片过渡逻辑
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slideElements.length;
    showSlide(currentSlide);
  }, 5000); // 每5秒更换幻灯片

  // PWA安装逻辑
  let deferredPrompt;
  const installBtn = document.getElementById('installApp');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('用户接受了A2HS提示');
      }
      deferredPrompt = null;
    });
  });

  // Web通知
  if ('Notification' in window && navigator.serviceWorker) {
    navigator.serviceWorker.ready.then(registration => {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    });
  }
});
