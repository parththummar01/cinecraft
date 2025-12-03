// Google Analytics 4 (GA4) Configuration
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
gtag('config', 'G-XXXXXXXXXX');

// Track showreel plays
document.addEventListener('DOMContentLoaded', function() {
    const showreelButton = document.querySelector('.showreel-trigger');
    if (showreelButton) {
        showreelButton.addEventListener('click', function() {
            gtag('event', 'showreel_play', {
                'event_category': 'Engagement',
                'event_label': 'Showreel Played',
                'non_interaction': false
            });
        });
    }

    // Track form submissions
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function() {
            gtag('event', 'form_submit', {
                'event_category': 'Lead',
                'event_label': 'Booking Form Submitted'
            });
        });
    }

    // Track WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp.com"], a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': 'WhatsApp Click',
                'value': this.href
            });
        });
    });

    // Track email clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'email_click', {
                'event_category': 'Contact',
                'event_label': 'Email Click',
                'value': this.href.replace('mailto:', '')
            });
        });
    });

    // Track Instagram link clicks
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    instagramLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'instagram_click', {
                'event_category': 'Social',
                'event_label': 'Instagram Profile Click',
                'non_interaction': true
            });
        });
    });
});
