// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
  // Check if AOS is already initialized to avoid re-initialization
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    })
  } else {
    console.warn("AOS is not defined. Make sure it is properly imported.")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 80)
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    const rate = scrolled * -0.5
    heroSection.style.transform = `translateY(${rate}px)`
  }
})

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start) + "+"
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + "+"
    }
  }

  updateCounter()
}

// Initialize counters when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -50px 0px",
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number")
      statNumbers.forEach((stat) => {
        const target = Number.parseInt(stat.textContent)
        animateCounter(stat, target)
      })
      counterObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    counterObserver.observe(heroStats)
  }
})

// Skill items hover effect
document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".skill-item")

  skillItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Project cards tilt effect
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
    })
  })
})

// Contact form functionality (if needed)
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Add form submission logic here
      showNotification("Message envoyé avec succès!", "success")
    })
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
        <span>${message}</span>
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Loading screen
window.addEventListener("load", () => {
  const loadingScreen = document.querySelector(".loading-screen")
  if (loadingScreen) {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }

  // Fade in body content
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open modals
    const openModals = document.querySelectorAll(".modal.show")
    openModals.forEach((modal) => {
      // Check if bootstrap is defined before using it
      if (typeof bootstrap !== "undefined") {
        const modalInstance = bootstrap.Modal.getInstance(modal)
        if (modalInstance) {
          modalInstance.hide()
        }
      } else {
        console.warn("Bootstrap is not defined. Make sure it is properly imported.")
      }
    })
  }
})

// Initialize all functions
document.addEventListener("DOMContentLoaded", () => {
  initContactForm()

  // Add smooth reveal animation to elements
  const revealElements = document.querySelectorAll(".timeline-item, .skill-category, .project-card, .experience-card")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  revealElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    revealObserver.observe(el)
  })
})

// Performance optimization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    // Non-critical animations and effects
    console.log("Portfolio loaded successfully")
  })
}

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
