/**
 * ============================================================================
 * MOHAMMAD KAUD MARRAIKAYAR - PORTFOLIO INTERACTIVE SCRIPTS
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------------------------------------------
    // 1. Dynamic Typing Effect
    // ------------------------------------------------------------------------
    const typingElement = document.getElementById("typing-text");
    const roles = [
        "Computer Science Diploma Student",
        "Python & AI Developer",
        "Prompt Engineer & Problem Solver",
        "Data & Vision Explorer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing word, pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ------------------------------------------------------------------------
    // 2. Project Category Filtering
    // ------------------------------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    // ------------------------------------------------------------------------
    // 3. Scroll Progress Indicator & Header Blur
    // ------------------------------------------------------------------------
    const progressBar = document.getElementById("scroll-progress");
    const headerNavbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }

        if (headerNavbar) {
            if (winScroll > 50) {
                headerNavbar.style.borderColor = "rgba(255, 42, 85, 0.35)";
                headerNavbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.6)";
            } else {
                headerNavbar.style.borderColor = "rgba(255, 255, 255, 0.08)";
                headerNavbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.4)";
            }
        }
    });

    // ------------------------------------------------------------------------
    // 4. ScrollSpy / Active Navigation Highlight
    // ------------------------------------------------------------------------
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", highlightNavOnScroll);

    // ------------------------------------------------------------------------
    // 5. Mobile Menu Toggle
    // ------------------------------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-links");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars-staggered");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars-staggered");
                }
            }
        });

        // Close menu on navigation link click
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars-staggered");
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars-staggered");
                }
            }
        });
    }

    // ------------------------------------------------------------------------
    // 6. Toast Notification & Copy-to-Clipboard
    // ------------------------------------------------------------------------
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toast-message");
    let toastTimeout;

    function showToast(message) {
        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    const copyButtons = document.querySelectorAll(".copy-trigger");
    copyButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const textToCopy = button.getAttribute("data-copy");

            if (textToCopy) {
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showToast(`Copied to clipboard: ${textToCopy}`);
                    }).catch(() => {
                        fallbackCopy(textToCopy);
                    });
                } else {
                    fallbackCopy(textToCopy);
                }
            }
        });
    });

    function fallbackCopy(text) {
        const tempInput = document.createElement("input");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand("copy");
            showToast(`Copied to clipboard: ${text}`);
        } catch (err) {
            showToast("Failed to copy. Please copy manually.");
        }
        document.body.removeChild(tempInput);
    }

    // ------------------------------------------------------------------------
    // 7. Contact Form Simulation
    // ------------------------------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameInput = document.getElementById("name");
            const senderName = nameInput ? nameInput.value : "there";

            showToast(`Thank you, ${senderName}! Your message was logged successfully.`);
            contactForm.reset();
        });
    }

    // ------------------------------------------------------------------------
    // 8. Intersection Observer for Scroll Animations
    // ------------------------------------------------------------------------
    const animatedCards = document.querySelectorAll(
        ".project-card, .skill-category-card, .education-card, .cert-card, .contact-method-card, .about-narrative-card, .mini-card"
    );

    animatedCards.forEach(card => card.classList.add("reveal"));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    animatedCards.forEach(card => {
        revealObserver.observe(card);
    });

    console.log("Mohammad Kaud Marraikayar - Portfolio Loaded Flawlessly 🚀");
});