document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    // Form steps
    const steps = Array.from(document.querySelectorAll('.form-step'));
    let currentStep = 0;
    
    // Navigation buttons
    const nextButtons = document.querySelectorAll('[data-next]');
    const prevButtons = document.querySelectorAll('[data-prev]');
    const submitButton = document.querySelector('[type="submit"]');
    
    // Date picker setup
    const dateInput = document.getElementById('wedding-date');
    if (dateInput) {
        // Set minimum date to tomorrow
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
        
        // Disable past dates
        dateInput.addEventListener('input', function() {
            const selectedDate = new Date(this.value);
            if (selectedDate < tomorrow) {
                this.setCustomValidity('Please select a future date');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Package selection
    const packageRadios = document.querySelectorAll('input[name="package"]');
    const packagePrice = document.getElementById('package-price');
    
    packageRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked && packagePrice) {
                packagePrice.textContent = this.dataset.price;
            }
        });
    });

    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const currentStepElement = steps[currentStep];
            const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
            let isValid = true;

            // Validate current step
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
            });

            // If valid, go to next step
            if (isValid) {
                currentStepElement.classList.remove('active');
                currentStep++;
                steps[currentStep].classList.add('active');
                updateProgress();
            }
        });
    });

    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            steps[currentStep].classList.remove('active');
            currentStep--;
            steps[currentStep].classList.add('active');
            updateProgress();
        });
    });

    // Update progress indicator
    function updateProgress() {
        const progressSteps = document.querySelectorAll('.progress-step');
        const progressBar = document.querySelector('.progress-bar');
        
        if (progressBar) {
            const progress = (currentStep / (steps.length - 1)) * 100;
            progressBar.style.width = `${progress}%`;
        }

        progressSteps.forEach((step, index) => {
            if (index <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update button visibility
        if (currentStep === 0) {
            document.querySelectorAll('.btn-prev').forEach(btn => btn.style.visibility = 'hidden');
        } else {
            document.querySelectorAll('.btn-prev').forEach(btn => btn.style.visibility = 'visible');
        }

        if (currentStep === steps.length - 1) {
            document.querySelectorAll('.btn-next').forEach(btn => btn.style.display = 'none');
            if (submitButton) submitButton.style.display = 'block';
        } else {
            document.querySelectorAll('.btn-next').forEach(btn => btn.style.display = 'block');
            if (submitButton) submitButton.style.display = 'none';
        }
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Booking Request Received!</h3>
                <p>We've received your booking request and will contact you within 24 hours to confirm your date.</p>
                <button class="btn btn-primary" onclick="this.parentElement.remove()">Close</button>
            `;
            
            form.innerHTML = '';
            form.appendChild(successMessage);
            
            // Track successful form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'booking_request', {
                    'event_category': 'Conversion',
                    'event_label': 'Booking Form Submitted'
                });
            }
        }, 1500);
    });

    // Initialize progress
    updateProgress();
});
