// ===== Mobile menu =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

// ===== Theme toggle (default = gentle light, toggle = gentle dark) =====
const themeBtn = document.getElementById("themeBtn");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") document.body.classList.add("dark");

themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// ===== Active nav link highlight on scroll =====
const sectionIds = ["about", "skills", "experience", "projects", "education", "contact"];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
const navLinks = document.querySelectorAll(".nav__link");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active"));
      const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      active?.classList.add("active");
    }
  });
}, { threshold: 0.55 });

sections.forEach(sec => sectionObserver.observe(sec));

// ===== Scroll reveal (modern animation) =====
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  const delay = el.getAttribute("data-delay");
  if (delay) el.style.setProperty("--d", `${delay}ms`);
  revealObserver.observe(el);
});

// ===== Contact form (mailto) =====
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message").value.trim();

  if (!name || !email || !msg) {
    statusEl.textContent = "Please fill all fields.";
    return;
  }

  const to = "bikashkumbhakar234@gmail.com";
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  statusEl.textContent = "Opening your email app...";
});

// ===== Copy email =====
const copyBtn = document.getElementById("copyEmailBtn");
const copyStatus = document.getElementById("copyStatus");
const emailText = document.getElementById("emailText");

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailText.textContent.trim());
    copyStatus.textContent = "Email copied!";
    setTimeout(() => (copyStatus.textContent = ""), 1500);
  } catch {
    copyStatus.textContent = "Copy failed. Please copy manually.";
  }
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();