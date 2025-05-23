document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector("nav ul");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains("show")) {
          navMenu.classList.remove("show");
        }
      }
    });
  });

  // Sticky header on scroll
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Here you would typically send the data to a server
      console.log("Form submitted:", data);

      // Show success message
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }

  // Active link highlighting
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (
      currentPage === linkPage ||
      (currentPage === "" && linkPage === "index.html") ||
      (currentPage === "index.html" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // Hero section animation
  const hero = document.querySelector(".hero");
  if (hero) {
    setTimeout(() => {
      hero.querySelector("h1").style.opacity = "1";
      hero.querySelector("p").style.opacity = "1";
      hero.querySelector(".btn").style.opacity = "1";
    }, 300);
  }

  // Lazy loading for images
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
});

// Simple page router for SPA-like navigation
function navigateTo(page) {
  // You would typically use a proper router like Vue Router or React Router
  // This is a simplified version for demonstration
  const content = document.getElementById("main-content");

  // Show loading state
  content.innerHTML = '<div class="loading">Loading...</div>';

  // Simulate loading content
  setTimeout(() => {
    switch (page) {
      case "about":
        content.innerHTML = `
                    <section class="page-header">
                        <div class="container">
                            <h1>About Us</h1>
                            <p>Learn more about our company and mission</p>
                        </div>
                    </section>
                    <section class="about-content">
                        <!-- About page content would go here -->
                    </section>
                `;
        break;
      case "services":
        content.innerHTML = `
                    <section class="page-header">
                        <div class="container">
                            <h1>Our Services</h1>
                            <p>Discover what we can do for you</p>
                        </div>
                    </section>
                    <section class="services">
                        <!-- Services page content would go here -->
                    </section>
                `;
        break;
      case "contact":
        content.innerHTML = `
                    <section class="page-header">
                        <div class="container">
                            <h1>Contact Us</h1>
                            <p>Get in touch with our team</p>
                        </div>
                    </section>
                    <section class="contact">
                        <!-- Contact page content would go here -->
                    </section>
                `;
        break;
      default:
        // Home page
        content.innerHTML = `
                    <section class="hero">
                        <!-- Hero section content would go here -->
                    </section>
                    <section class="features">
                        <!-- Features section content would go here -->
                    </section>
                    <section class="cta">
                        <!-- CTA section content would go here -->
                    </section>
                `;
    }

    // Update browser history
    window.history.pushState({}, "", `${page === "index" ? "/" : page}`);

    // Scroll to top
    window.scrollTo(0, 0);

    // Re-initialize any JS for the new content
    document.dispatchEvent(new Event("DOMContentLoaded"));
  }, 300);
}

// Handle back/forward navigation
window.addEventListener("popstate", function () {
  const page = window.location.pathname.split("/").pop() || "index";
  navigateTo(page);
});
