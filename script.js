document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mainContent = document.getElementById("main-content");
  const links = document.querySelectorAll(".mobile-link");

 function openMenu() {
  mobileMenu.classList.remove("opacity-0", "pointer-events-none");
  mobileMenu.classList.add("opacity-100", "pointer-events-auto");

  mainContent.classList.add("blur-sm");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu.classList.remove("opacity-100", "pointer-events-auto");
  mobileMenu.classList.add("opacity-0", "pointer-events-none");

  mainContent.classList.remove("blur-sm");
  document.body.style.overflow = "";
}


  menuBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  links.forEach(link => link.addEventListener("click", closeMenu));
});

  // YELLOW DOT ANIMATION FOR EXPERIENCE SECTION
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const dots = entry.target.querySelectorAll('.yellow-dot');
        dots.forEach(dot => {
          const target = dot.getAttribute('data-target');
          dot.style.left = target;
          dot.classList.add('animate');
        });
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.5 });

  const section = document.querySelector('#experience-section');
  if (section) observer.observe(section);

  // CONTACT FORM
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('success-message');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      submitBtn.disabled = true;
      submitBtn.innerText = "Sending...";

      try {
        const response = await fetch('https://formspree.io/f/xqapvyrg', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          successMsg.classList.remove('hidden');
          setTimeout(() => successMsg.classList.add('hidden'), 5000);
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        alert("Submission failed. Check your network or try again.");
      }

      submitBtn.disabled = false;
      submitBtn.innerText = "Send Message";
    });
  }

