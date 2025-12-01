document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle function
    function toggleMenu() {
        const isOpen = menuToggle.classList.contains('active');
        
        // Toggle menu state
        if (!isOpen) {
            // Open menu
            menuToggle.classList.add('active');
            navLinks.classList.add('active');
            document.body.classList.add('menu-open');
            
            // Animate menu items
            navItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
        } else {
            // Close menu
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Reset menu items animation
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
            if (window.innerWidth <= 900) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navLinks.contains(e.target) || menuToggle.contains(e.target);
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
    
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
                if (navLinks.classList.contains('active')) {
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
});
