document.addEventListener('DOMContentLoaded', () => {

  // 1. Menú Móvil Desplegable
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar el menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Mostrar/Ocultar Logo de la barra según Scroll en el Hero
  const navMark = document.getElementById('navMark');
  const hero = document.querySelector('.hero');

  if (navMark && hero) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          navMark.classList.add('is-visible');
        } else {
          navMark.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 });

    heroObserver.observe(hero);
  }

  // 3. Galería Scroll Horizontal con Botones
  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const track = gallery.querySelector('.gallery__track');
    const prevBtn = gallery.querySelector('.gallery__nav--prev');
    const nextBtn = gallery.querySelector('.gallery__nav--next');

    if (!track) return;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }
  });

  // 4. Lightbox Modal (Fotos + YouTube Video)
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxContent) {
    document.querySelectorAll('.gallery__item').forEach(item => {
      item.addEventListener('click', () => {
        const videoId = item.getAttribute('data-video-id');
        const img = item.querySelector('img');

        if (videoId) {
          // Si es un item de video, inyectamos el iframe de YouTube
          lightboxImg.style.display = 'none';
          
          let iframe = lightboxContent.querySelector('.lightbox__iframe');
          if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.className = 'lightbox__iframe';
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            lightboxContent.appendChild(iframe);
          }
          iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
          iframe.style.display = 'block';

        } else if (img) {
          // Si es foto, mostramos la imagen normal
          const iframe = lightboxContent.querySelector('.lightbox__iframe');
          if (iframe) iframe.style.display = 'none';
          
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || '';
          lightboxImg.style.display = 'block';
        }

        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      
      // Detener la reproducción del video al cerrar cortando la URL del iframe
      const iframe = lightboxContent.querySelector('.lightbox__iframe');
      if (iframe) {
        iframe.src = '';
        iframe.style.display = 'none';
      }
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  // 5. Animación Reveal de Categorías
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.category').forEach(cat => observer.observe(cat));

  // 6. Año Dinámico en Footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
