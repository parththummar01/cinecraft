/**
 * Responsive JavaScript for CineCraft
 * Handles responsive behavior and optimizations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Responsive image handling
    function handleImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Handle responsive video embeds
    function handleVideos() {
        const videos = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="vimeo"]');
        
        videos.forEach(video => {
            const wrapper = document.createElement('div');
            wrapper.className = 'video-wrapper';
            video.parentNode.insertBefore(wrapper, video);
            wrapper.appendChild(video);
            
            // Set aspect ratio
            const width = video.width || 16;
            const height = video.height || 9;
            video.style.aspectRatio = `${width}/${height}`;
            video.removeAttribute('width');
            video.removeAttribute('height');
        });
    }

    // Handle responsive tables
    function handleTables() {
        const tables = document.querySelectorAll('table');
        
        tables.forEach(table => {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    // Handle responsive navigation
    function handleNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const menuToggle = document.querySelector('.menu-toggle');
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 900) {
                    document.body.classList.remove('menu-open');
                    document.querySelector('.nav-links').classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.querySelector('.menu-overlay').classList.remove('active');
                }
            });
        });
    }

    // Handle responsive images in picture elements
    function handlePictureElements() {
        if ('HTMLPictureElement' in window) {
            document.createElement('picture');
        }
    }

    // Initialize all responsive features
    function init() {
        handleImages();
        handleVideos();
        handleTables();
        handleNavigation();
        handlePictureElements();
        
        // Add touch detection class
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            document.documentElement.classList.add('touch-device');
        } else {
            document.documentElement.classList.add('no-touch-device');
        }
    }

    // Run initialization
    init();

    // Handle window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });
});

// Add a class when page is loaded
window.addEventListener('load', function() {
    document.documentElement.classList.add('page-loaded');
});

// Handle iOS viewport height issues
function updateVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', updateVH);
window.addEventListener('orientationchange', updateVH);
updateVH();
