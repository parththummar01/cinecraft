document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animate menu items
        if (navLinks.classList.contains('active')) {
            navItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
        } else {
            navItems.forEach(item => {
                item.style.transitionDelay = '0s';
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
            });
        }
    }

    // Toggle menu on button click
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking on a nav link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    menuOverlay.addEventListener('click', toggleMenu);

    // Navbar scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Initial check for navbar
    if (navbar) {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close menu if open
                if (window.innerWidth <= 991 && navLinks.classList.contains('active')) {
                    toggleMenu();
                }
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
        
        // Reset menu on larger screens
        if (window.innerWidth > 991) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            navItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'none';
            });
        }
    });
});
