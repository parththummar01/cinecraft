document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const modal = document.getElementById('showreelModal');
    const showreelTriggers = document.querySelectorAll('.showreel-trigger');
    const closeModal = document.querySelector('.close-modal');
    const showreelVideo = document.getElementById('showreelVideo');
    
    // Vimeo video ID - Replace with your actual Vimeo video ID
    const vimeoVideoId = 'YOUR_VIMEO_VIDEO_ID';
    
    // Vimeo embed URL with autoplay and other parameters
    const vimeoEmbedUrl = `https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1&color=ff6b6b&title=0&byline=0&portrait=0`;
    
    // Open modal when clicking showreel triggers
    showreelTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            showreelVideo.src = vimeoEmbedUrl;
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                
                // Track showreel view in analytics (example with gtag)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'showreel_play', {
                        'event_category': 'Engagement',
                        'event_label': 'Showreel Played'
                    });
                }
            }, 10);
        });
    });
    
    // Close modal when clicking the close button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeShowreelModal();
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeShowreelModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeShowreelModal();
        }
    });
    
    // Function to close the modal
    function closeShowreelModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            // Reset the video source to stop playback
            showreelVideo.src = '';
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }, 300);
    }
    
    // Sticky CTA visibility on scroll
    const stickyCta = document.querySelector('.sticky-cta-mobile');
    let lastScrollTop = 0;
    
    if (stickyCta) {
        window.addEventListener('scroll', function() {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            
            if (st > lastScrollTop) {
                // Scrolling down
                stickyCta.style.transform = 'translateY(100%)';
            } else {
                // Scrolling up
                stickyCta.style.transform = 'translateY(0)';
            }
            
            // Hide when at the top of the page
            if (st === 0) {
                stickyCta.style.transform = 'translateY(100%)';
            }
            
            lastScrollTop = st <= 0 ? 0 : st;
        }, { passive: true });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Don't prevent default if it's a showreel trigger or external link
            if (this.classList.contains('showreel-trigger') || targetId === '#') {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const menuToggle = document.querySelector('.menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                if (menuToggle && navLinks && navLinks.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });
});
