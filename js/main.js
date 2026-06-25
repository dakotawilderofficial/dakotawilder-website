document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const menuToggles = document.querySelectorAll('.menu-toggle');
  const navLinks = document.querySelectorAll('.nav a');

  if (mobileBtn && header) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = header.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('menu-open', isOpen);
    });
  }

  menuToggles.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const item = btn.closest('.nav-item');
      if (!item) return;

      document.querySelectorAll('.nav-item.open').forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove('open');
      });

      item.classList.toggle('open');
      btn.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (header) header.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.open').forEach((item) => item.classList.remove('open'));
    }
    if (header && !e.target.closest('.site-header')) {
      header.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header) {
      header.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.nav-item.open').forEach((item) => item.classList.remove('open'));
    }
  });

  function stopAllPreviews(exceptVideo = null) {
    document.querySelectorAll('.song-preview-video').forEach((video) => {
      if (video === exceptVideo) return;
      video.pause();
      video.currentTime = 0;
      const wrap = video.closest('.song-cover-wrap');
      if (wrap) wrap.classList.remove('is-previewing', 'preview-seen');
    });
  }

  document.querySelectorAll('.song-cover-wrap').forEach((wrap) => {
    const video = wrap.querySelector('.song-preview-video');
    const badge = wrap.querySelector('.preview-badge');
    if (!video) return;

    let lockedOnTouch = false;

    function startPreview() {
      stopAllPreviews(video);
      wrap.classList.add('is-previewing', 'preview-seen');
      if (badge) badge.style.display = 'none';
      video.currentTime = 0;
      video.muted = false;
      video.volume = 0.85;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }

    function stopPreview(force = false) {
      if (lockedOnTouch && !force) return;
      video.pause();
      video.currentTime = 0;
      wrap.classList.remove('is-previewing');
    }

    wrap.addEventListener('mouseenter', startPreview);
    wrap.addEventListener('mouseleave', () => stopPreview(false));

    wrap.addEventListener('click', (e) => {
      if (window.matchMedia('(hover: none)').matches) {
        e.preventDefault();
        lockedOnTouch = !lockedOnTouch;
        if (lockedOnTouch) startPreview();
        else stopPreview(true);
      }
    });
  });
});
