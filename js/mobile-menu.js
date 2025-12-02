document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Check if elements exist
    if (!menuToggle || !navLinks || !menuOverlay) return;
    
    // Mobile menu toggle function
    function toggleMenu() {
        const isOpen = menuToggle.classList.contains('active');
        
        // Toggle menu state
        if (!isOpen) {
            // Open menu
            menuToggle.classList.add('active');
            navLinks.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.classList.add('menu-open');
            
            // Animate menu items
            navItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
            
            // Set focus to first menu item for better keyboard navigation
            if (navItems.length > 0) {
                navItems[0].focus();
            }
        } else {
            // Close menu
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Reset menu items animation
            navItems.forEach(item => {
                item.style.transitionDelay = '0s';
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
            });
            
            // Return focus to menu toggle button
            menuToggle.focus();
        }
        
        // Update aria attributes
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuOverlay.setAttribute('aria-hidden', isExpanded);
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on overlay
    menuOverlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a nav link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Navbar scroll effect with throttle
    let lastScroll = 0;
    const scrollThreshold = 10;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            
            // Hide/show navbar on scroll
            if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up or at top
                    navbar.style.transform = 'translateY(0)';
                }
                lastScroll = currentScroll <= 0 ? 0 : currentScroll;
            }
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    // Use requestAnimationFrame for smoother scroll handling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !document.querySelector(targetId)) return;
            
            e.preventDefault();
            
            // Close menu if open
            if (menuToggle.classList.contains('active')) {
                toggleMenu();
            }
            
            // Scroll to target
            const targetElement = document.querySelector(targetId);
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without adding to history
            history.pushState(null, null, targetId);
        });
    });
    
    // Initialize
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuOverlay.setAttribute('aria-hidden', 'true');
    
    // Handle orientation changes
    let mql = window.matchMedia('(orientation: portrait)');
    mql.addListener(handleOrientationChange);
    handleOrientationChange(mql);
    
    function handleOrientationChange(mql) {
        if (mql.matches) {
            // Portrait mode
            document.documentElement.classList.add('portrait');
            document.documentElement.classList.remove('landscape');
        } else {
            // Landscape mode
            document.documentElement.classList.add('landscape');
            document.documentElement.classList.remove('portrait');
        }
    }
});
