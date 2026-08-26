document.addEventListener('DOMContentLoaded', () => {

  // 1. Manejo del menú de navegación (Mobile Menu Toggle)
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar el menú móvil al hacer clic en cualquier enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Visibilidad del logo en la barra superior (Nav Mark fade on scroll)
  const navMark = document.getElementById('navMark');
  const heroLogo = document.querySelector('.hero__logo');

  if (navMark && heroLogo) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Muestra el logo del menú cuando el logo principal del Hero sale de la vista
        if (!entry.isIntersecting) {
          navMark.classList.add('is-visible');
        } else {
          navMark.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(heroLogo);
  }

  // 3. Control de desplazamiento horizontal en las galerías (Botones Prev/Next)
  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const track = gallery.querySelector('.gallery__track');
    const prevBtn = gallery.querySelector('.gallery__nav--prev');
    const nextBtn = gallery.querySelector('.gallery__nav--next');

    if (track && prevBtn && nextBtn) {
      const scrollAmount = 380;

      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });

  // 4. Lightbox Modal (Fotos + YouTube Video con Autoplay Directo)
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
          // Ocultar la imagen del modal si es un video
          lightboxImg.style.display = 'none';
          
          let iframe = lightboxContent.querySelector('.lightbox__iframe');
          if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.className = 'lightbox__iframe';
            // Permitir la reproducción automática de audio/video en el iframe
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            lightboxContent.appendChild(iframe);
          }
          
          // Asignar la URL con autoplay=1 para reproducción automática inmediata
          iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
          iframe.style.display = 'block';

        } else if (img) {
          // Si es una foto, ocultar el reproductor de video y mostrar la imagen
          const iframe = lightboxContent.querySelector('.lightbox__iframe');
          if (iframe) {
            iframe.src = '';
            iframe.style.display = 'none';
          }
          
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || '';
          lightboxImg.style.display = 'block';
        }

        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    // Función para cerrar el lightbox
    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      
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

  // 5. Animación sutil de entrada para las secciones de categorías
  const categoryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.category').forEach(cat => {
    categoryObserver.observe(cat);
  });

  // 6. Actualizar dinámicamente el año del footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
