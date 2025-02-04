document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let scrollPosition = 0;

    // Toggle menu and scroll lock
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            // Store scroll position and disable scroll
            scrollPosition = window.pageYOffset;
            document.body.classList.add('nav-active');
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scroll position and enable scroll
            document.body.classList.remove('nav-active');
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('nav-active');
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('nav-active');
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize preview buttons
    function initializePreviewButtons() {   
        document.querySelectorAll('.preview-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const projectItem = this.closest('.project-item');
                const isBusinessCard = projectItem.classList.contains('business-card-item');
                showPreview(projectItem, isBusinessCard);
            });
        });
    }

    function showPreview(item, isBusinessCard) {
        const modal = document.querySelector('.fullscreen-modal');
        const modalCardPreview = modal.querySelector('.modal-card-preview');
        const modalImageContainer = modal.querySelector('.modal-image-container');

        if (isBusinessCard) {
            // Business card preview setup
            modalCardPreview.style.display = 'flex';
            modalImageContainer.style.display = 'none';
            modal.classList.add('business-card-modal');
            
            // Get front and back images from data attributes
            const frontImg = item.getAttribute('data-front-img');
            const backImg = item.getAttribute('data-back-img');
            
            // Set up card preview with both sides
            modal.querySelector('.modal-card-front').innerHTML = `
                <img src="${frontImg}" alt="Business Card Front">
            `;
            modal.querySelector('.modal-card-back').innerHTML = `
                <img src="${backImg}" alt="Business Card Back">
            `;
            
            // Reset flip state
            const cardSides = modal.querySelector('.card-sides');
            cardSides.classList.remove('flipped');
            
            // Initialize flip button
            const flipBtn = modal.querySelector('.modal-flip-btn');
            flipBtn.style.display = 'flex';
            flipBtn.onclick = (e) => {
                e.stopPropagation();
                const cardSides = modal.querySelector('.card-sides');
                const icon = flipBtn.querySelector('i');
                
                cardSides.classList.toggle('flipped');
                
                // Animate the icon rotation smoothly
                if (cardSides.classList.contains('flipped')) {
                    icon.style.transform = 'rotate(180deg)';
                    flipBtn.style.background = '#222';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                    flipBtn.style.background = '#000';
                }
            };
        } else {
            // Regular image preview
            modalCardPreview.style.display = 'none';
            modalImageContainer.style.display = 'flex';
            modal.classList.remove('business-card-modal');
            modal.querySelector('.modal-flip-btn').style.display = 'none';
            modalImageContainer.innerHTML = `
                <img src="${item.querySelector('img').src}" 
                     alt="${item.querySelector('h3').textContent}">
            `;
        }

        // Update modal info
        modal.querySelector('.modal-title').textContent = item.querySelector('h3').textContent;
        modal.querySelector('.modal-description').textContent = item.querySelector('p').textContent;
        const toolsHtml = item.querySelector('.project-tools').cloneNode(true);
        toolsHtml.querySelector('.preview-btn')?.remove();
        modal.querySelector('.modal-tools').innerHTML = toolsHtml.innerHTML;

        // Show modal
        modal.style.display = 'flex';
        modal.classList.add('active');
    }

    // Close modal functionality
    function closeModal() {
        const modal = document.querySelector('.fullscreen-modal');
        modal.classList.remove('active');
        modal.style.display = 'none';
        
        // Reset modal content
        modal.querySelector('.modal-image-container').innerHTML = '';
        modal.querySelector('.modal-card-preview').style.display = 'none';
        modal.querySelector('.modal-title').textContent = '';
        modal.querySelector('.modal-description').textContent = '';
        modal.querySelector('.modal-tools').innerHTML = '';
    }

    // Initialize modal controls
    const modal = document.querySelector('.fullscreen-modal');
    const closeBtn = modal.querySelector('.close-modal');

    // Close button click
    closeBtn.addEventListener('click', closeModal);

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Initialize preview buttons
    initializePreviewButtons();

    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Category filtering functionality
    const categoryButtons = document.querySelectorAll('.cat-btn');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.category-section');

    function filterProjects(category) {
        // Remove active class from all buttons and links
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        navLinkItems.forEach(link => link.classList.remove('active'));

        // Add active class to clicked button and corresponding nav link
        const activeBtn = document.querySelector(`.cat-btn[data-filter="${category}"]`);
        const activeLink = document.querySelector(`.nav-link[data-filter="${category}"]`);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activeLink) activeLink.classList.add('active');

        // Show/hide sections with animation
        sections.forEach(section => {
            if (category === 'all' || section.id === category) {
                section.style.display = 'block';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.display = 'none';
            }
        });

        // Scroll to the selected category section
        if (category !== 'all') {
            const targetSection = document.getElementById(category);
            if (targetSection) {
                const headerOffset = document.querySelector('.projects-header').offsetHeight;
                const navOffset = document.querySelector('.category-nav').offsetHeight;
                const totalOffset = headerOffset + navOffset + 20;
                
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - totalOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            // Scroll to top when "All Projects" is selected
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Initialize category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');
            filterProjects(category);
        });
    });

    // Initialize nav links
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-filter');
            filterProjects(category);
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // Initialize with URL hash if present
    const hash = window.location.hash.slice(1);
    if (hash) {
        filterProjects(hash);
    }

    // Gallery slider functionality
    function initializeGallerySliders() {
        const sliders = document.querySelectorAll('.gallery-slider');
        
        sliders.forEach(slider => {
            const wrapper = slider.querySelector('.gallery-wrapper');
            const slides = wrapper.querySelectorAll('.project-item');
            const prevBtn = slider.querySelector('.prev');
            const nextBtn = slider.querySelector('.next');
            
            if (slides.length <= 1) return; // Don't initialize if only one slide
            
            let currentPosition = 0;
            const slideWidth = slides[0].offsetWidth;
            const gap = 32; // Gap between slides
            const slidesPerView = Math.floor(slider.offsetWidth / (slideWidth + gap));
            const maxPosition = slides.length - slidesPerView;
            
            // Update slide positions
            function updateSlider() {
                const offset = currentPosition * -(slideWidth + gap);
                wrapper.style.transform = `translateX(${offset}px)`;
                
                // Update button states
                prevBtn.style.opacity = currentPosition <= 0 ? '0.5' : '1';
                nextBtn.style.opacity = currentPosition >= maxPosition ? '0.5' : '1';
            }
            
            // Event listeners for buttons
            prevBtn.addEventListener('click', () => {
                if (currentPosition > 0) {
                    currentPosition--;
                    updateSlider();
                }
            });
            
            nextBtn.addEventListener('click', () => {
                if (currentPosition < maxPosition) {
                    currentPosition++;
                    updateSlider();
                }
            });
            
            // Initialize slider
            updateSlider();
            
            // Handle window resize
            window.addEventListener('resize', () => {
                currentPosition = 0;
                updateSlider();
            });
        });
    }

    // Initialize sliders when DOM is loaded
    document.addEventListener('DOMContentLoaded', initializeGallerySliders);
});