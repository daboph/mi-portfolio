// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Revelado de cada bloque al entrar en pantalla
const frames = document.querySelectorAll(".frame");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  frames.forEach((frame) => observer.observe(frame));
} else {
  // navegadores muy antiguos: mostrar todo directamente
  frames.forEach((frame) => frame.classList.add("is-visible"));
}
