// Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 1500); // 1.5s loading simulation
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a slight delay for outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor Hover Effects
const interactives = document.querySelectorAll('a, button, input, textarea, .portfolio-item');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hovered');
    });
});

// Scroll Progress
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight * 100}%`;
    scrollProgress.style.width = scroll;
});

// Navbar Scrolled Effect & Hamburger
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}));

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check local storage for theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Scroll Animations (Intersection Observer)
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Counter Animation for Achievements
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Contact Form Prevention (Mock) removed so FormSubmit can work

// Security Protections (Disable Right-Click, PrintScreen detection, Save Page, and DevTools shortcuts)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    // Disable F12 (Inspect)
    if (e.key === 'F12') {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+I (Inspect element)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+C (Inspect elements selector)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+J (Console panel)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
    }
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
    }
    // Disable Ctrl+S (Save page)
    if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
    }
    // Disable Ctrl+P (Print page)
    if (e.ctrlKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
    }
    // Disable Windows Snipping Tool (Meta+Shift+S)
    if (e.metaKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
    }
    // Disable Mac OS Screenshots (Meta+Shift+3 or 4)
    if (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4')) {
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    // Disable PrintScreen key
    if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots are disabled on this website for security reasons.');
    }
});

// Blur website content if user attempts to print or capture
window.addEventListener('beforeprint', () => {
    document.body.style.filter = 'blur(10px)';
});
window.addEventListener('afterprint', () => {
    document.body.style.filter = 'none';
});

// Blur website when it loses focus to prevent OS snipping tools
window.addEventListener('blur', () => {
    // Highly blur the portrait image container specifically, and the body
    document.body.style.filter = 'blur(20px)';
    document.body.style.opacity = '0.1'; // Make it very hard to see
});
window.addEventListener('focus', () => {
    document.body.style.filter = 'none';
    document.body.style.opacity = '1';
});

// Certificate Modal Functionality
const viewCertBtn = document.getElementById('view-cert-btn');
const certModal = document.getElementById('certificate-modal');

if (viewCertBtn && certModal) {
    const modalClose = certModal.querySelector('.modal-close');
    const modalBackdrop = certModal.querySelector('.modal-backdrop');

    viewCertBtn.addEventListener('click', () => {
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling background
    });

    const closeModal = () => {
        certModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
}

// Add custom cursor hover state to modal elements
if (certModal) {
    const modalInteractives = certModal.querySelectorAll('.modal-close, .protected-certificate, #view-cert-btn');
    modalInteractives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
        });
    });
}

// Attach hover listener to view-cert-btn specifically if needed
if (viewCertBtn) {
    viewCertBtn.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hovered');
    });
    viewCertBtn.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hovered');
    });
}
