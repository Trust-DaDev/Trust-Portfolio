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
//submitbutton

        document.addEventListener('DOMContentLoaded', () => {
              const form = document.getElementById('contact-form');
              const successMsg = document.getElementById('success-message');
              const submitBtn = document.getElementById('submit-btn');
          
              form.addEventListener('submit', async (e) => {
                e.preventDefault(); // Prevent the page from reloading
          
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
            });