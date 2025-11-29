// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Initialize navbar state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
    }
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Portfolio gallery with Instagram reels
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        // Instagram reel data with placeholder thumbnails (replace with actual thumbnail URLs)
        const reelItems = [
            { 
                url: 'https://www.instagram.com/reel/DEzQLt4OImE/',
                title: 'Wedding Highlights #1',
                thumbnail: 'https://via.placeholder.com/300x533/FF4500/ffffff?text=Reel+1'
            },
            { 
                url: 'https://www.instagram.com/reel/DFPb-Lpukpc/',
                title: 'Wedding Highlights #2',
                thumbnail: 'https://via.placeholder.com/300x533/00C4CC/ffffff?text=Reel+2'
            },
            { 
                url: 'https://www.instagram.com/reel/DFpIijWIq29/',
                title: 'Wedding Highlights #3',
                thumbnail: 'https://via.placeholder.com/300x533/FF0000/ffffff?text=Reel+3'
            },
            { 
                url: 'https://www.instagram.com/reel/DG7ntKfTbVZ/',
                title: 'Wedding Highlights #4',
                thumbnail: 'https://via.placeholder.com/300x533/FFA500/ffffff?text=Reel+4'
            },
            { 
                url: 'https://www.instagram.com/reel/DEeH8iRIluL/',
                title: 'Wedding Highlights #5',
                thumbnail: 'https://via.placeholder.com/300x533/800080/ffffff?text=Reel+5'
            },
            { 
                url: 'https://www.instagram.com/reel/DDeIUu-uWt1/',
                title: 'Wedding Highlights #6',
                thumbnail: 'https://via.placeholder.com/300x533/008000/ffffff?text=Reel+6'
            }
        ];
        
        // Clear any existing items
        portfolioGrid.innerHTML = '';
        
        // Add reel items to the grid
        reelItems.forEach((reel, index) => {
            const reelElement = document.createElement('div');
            reelElement.className = 'reel-item';
            reelElement.setAttribute('data-aos', 'fade-up');
            reelElement.setAttribute('data-aos-delay', (index * 100) + '');
            
            reelElement.innerHTML = `
                <a href="${reel.url}" target="_blank" class="reel-link">
                    <div class="reel-thumbnail" style="background-image: url('${reel.thumbnail}')">
                        <div class="reel-overlay">
                            <i class="fas fa-play-circle"></i>
                            <h4>${reel.title}</h4>
                        </div>
                    </div>
                </a>
            `;
            
            portfolioGrid.appendChild(reelElement);
        });
    }
    
    // Contact form submission with Formspree
    const contactForm = document.getElementById('bookingForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const formStatus = document.getElementById('form-status');
            const formData = new FormData(this);
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = 'Thank you! Your message has been sent. We\'ll get back to you soon!';
                    formStatus.className = 'form-status success';
                    this.reset();
                } else {
                    const data = await response.json();
                    throw new Error(data.error || 'Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                formStatus.textContent = 'Oops! There was a problem sending your message. Please try again or contact us directly.';
                formStatus.className = 'form-status error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message';
                
                // Scroll to form status
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    
    // Show notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            
            // Remove from DOM after animation
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service, .feature, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('aos-animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Reel Navigation
    const reelContainer = document.querySelector('.single-reel-row');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    
    if (reelContainer && prevButton && nextButton) {
        const reelItems = document.querySelectorAll('.reel-item');
        let currentIndex = 0;
        let isScrolling = false;
        
        // Update button states
        function updateButtons() {
            prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
            
            nextButton.style.opacity = currentIndex >= reelItems.length - 1 ? '0.5' : '1';
            nextButton.style.pointerEvents = currentIndex >= reelItems.length - 1 ? 'none' : 'auto';
        }
        
        // Scroll to reel
        function scrollToReel(index) {
            if (index < 0 || index >= reelItems.length || isScrolling) return;
            
            isScrolling = true;
            currentIndex = index;
            
            reelItems[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
            
            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 800);
            
            updateButtons();
        }
        
        // Event listeners for navigation buttons
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex > 0) {
                scrollToReel(currentIndex - 1);
            }
        });
        
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentIndex < reelItems.length - 1) {
                scrollToReel(currentIndex + 1);
            }
        });
        
        // Handle touch events for swiping
        let touchStartX = 0;
        let touchEndX = 0;
        
        reelContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        reelContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance to trigger swipe
            
            if (touchEndX < touchStartX - swipeThreshold && currentIndex < reelItems.length - 1) {
                // Swipe left - go to next
                scrollToReel(currentIndex + 1);
            } else if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {
                // Swipe right - go to previous
                scrollToReel(currentIndex - 1);
            }
        }
        
        // Initialize
        updateButtons();
        
        // Handle window resize to update button states
        window.addEventListener('resize', updateButtons);
    }
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            // Toggle menu when clicking the hamburger icon
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking on a nav link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.navbar .container') || e.target.closest('.menu-toggle')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        } else {
            console.error('Menu toggle or nav links not found');
        }
    });

    // Add current year to footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Initialize any third-party libraries when the window loads
window.addEventListener('load', function() {
    // Initialize any lightbox or modal libraries here if needed
    // For example: lightbox.option({...})
    
    // Add any other window load events here
});
