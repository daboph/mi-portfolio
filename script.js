// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Show nav background + logo only after scrolling past the hero
const heroSection = document.querySelector(".hero");
const siteNav = document.querySelector(".nav");

if (heroSection && siteNav && "IntersectionObserver" in window) {
  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      siteNav.classList.toggle("is-scrolled", !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  heroObserver.observe(heroSection);
}

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal each portfolio category on scroll
const categories = document.querySelectorAll(".category");

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
    { threshold: 0.12 }
  );
  categories.forEach((cat) => observer.observe(cat));
} else {
  categories.forEach((cat) => cat.classList.add("is-visible"));
}

// Gallery arrow navigation (desktop)
document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const track = gallery.querySelector(".gallery__track");
  const prev = gallery.querySelector(".gallery__nav--prev");
  const next = gallery.querySelector(".gallery__nav--next");
  const scrollAmount = () => track.clientWidth * 0.85;

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });
  next.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });
});
