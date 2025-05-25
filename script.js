document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.menu-toggle')) {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (testimonialSlides.length > 0) {
        let currentSlide = 0;
        
        function showSlide(n) {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
            
            testimonialSlides[currentSlide].classList.add('active');
            if (dots.length > 0) {
                dots[currentSlide].classList.add('active');
            }
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // Auto slide
        setInterval(() => {
            if (nextBtn) {
                showSlide(currentSlide + 1);
            }
        }, 5000);
    }
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Project Modal
    const viewProjectBtns = document.querySelectorAll('.view-project');
    const projectModal = document.querySelector('.project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (viewProjectBtns.length > 0 && projectModal) {
        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get project data (in a real project, this would come from a database or JSON)
                const projectTitle = this.closest('.project-info').querySelector('h3').textContent;
                const projectCategory = this.closest('.project-info').querySelector('p').textContent;
                
                // Set modal content
                document.getElementById('modal-title').textContent = projectTitle;
                document.getElementById('modal-category').textContent = projectCategory;
                document.getElementById('modal-location').textContent = 'City, Country';
                document.getElementById('modal-year').textContent = '2023';
                document.getElementById('modal-size').textContent = '1,200 sq.m';
                document.getElementById('modal-description').textContent = 'This is a sample project description. In a real website, this would contain detailed information about the project, including its concept, challenges, solutions, and outcomes.';
                
                // Set main image
                const projectImage = this.closest('.project-overlay').previousElementSibling.getAttribute('src');
                document.getElementById('modal-main-image').setAttribute('src', projectImage);
                
                // Create thumbnails (in a real project, these would be actual project images)
                const thumbnailGallery = document.querySelector('.thumbnail-gallery');
                thumbnailGallery.innerHTML = '';
                
                for (let i = 0; i < 5; i++) {
                    const thumbnail = document.createElement('div');
                    thumbnail.className = 'thumbnail';
                    if (i === 0) thumbnail.classList.add('active');
                    
                    const img = document.createElement('img');
                    img.setAttribute('src', projectImage);
                    img.setAttribute('alt', 'Project Thumbnail');
                    
                    thumbnail.appendChild(img);
                    thumbnailGallery.appendChild(thumbnail);
                    
                    // Add click event to thumbnails
                    thumbnail.addEventListener('click', function() {
                        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
                        this.classList.add('active');
                        document.getElementById('modal-main-image').setAttribute('src', this.querySelector('img').getAttribute('src'));
                    });
                }
                
                // Show modal
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close modal when clicking outside
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                accordionItem.classList.toggle('active');
            });
        });
    }
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Send form data to Formspree (in a real project)
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We'll get back to you soon.</p>
                        </div>
                    `;
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error(error);
                // Show error message
                const formGroup = contactForm.querySelector('.form-group:last-child');
                const errorMessage = document.createElement('p');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'There was a problem submitting your form. Please try again.';
                formGroup.appendChild(errorMessage);
            });
        });
    }
    
    // Scroll Animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Check elements on load
    checkScroll();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Video Testimonials
    const playButtons = document.querySelectorAll('.play-button');
    
    if (playButtons.length > 0) {
        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                // In a real project, this would open a video modal or play the video
                alert('Video would play here in a real implementation.');
            });
        });
    }
});