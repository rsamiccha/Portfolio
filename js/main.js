document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.flyers-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // Update Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item, .flyers-slider');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });

            // Update Swiper after filtering
            if (swiper) {
                swiper.update();
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    function updateHeader() {
        if (window.scrollY > headerHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Initial check

    // Mobile menu
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    function toggleMenu() {
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    menuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking nav links
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scrolling with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = header.offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset + headerHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Initial check

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "50px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .portfolio-item, .skill').forEach(el => {
        observer.observe(el);
    });

    // Skill progress animation
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const value = progress.getAttribute('data-value');
                setTimeout(() => {
                    progress.style.width = value + '%';
                }, 200);
                progressObserver.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        bar.style.width = '0';
        progressObserver.observe(bar);
    });

    // Gallery functionality
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.gallery-modal-content');
    const closeBtn = document.querySelector('.gallery-close');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(img => img.src);

    function showImage(index) {
        modalImg.src = images[index];
        currentImageIndex = index;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            showImage(index);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
        if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Update project stats
    function updateProjectStats(stats) {
        const totalProjects = document.querySelector('.stat-number');
        const categoryCount = document.querySelector('.category-cards').children.length;
        
        if (totalProjects) {
            totalProjects.textContent = `${stats.total}+`;
        }

        // Update individual category counts
        document.querySelectorAll('.category-card').forEach(card => {
            const categoryId = card.getAttribute('href').split('#')[1];
            const countElement = card.querySelector('.project-count');
            if (countElement && stats.counts[categoryId]) {
                const count = stats.counts[categoryId];
                countElement.textContent = `${count} Project${count !== 1 ? 's' : ''}`;
            }
        });
    }

    // Fetch project counts from projects.html
    fetch('projects.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const projectStats = {
                total: 0,
                counts: {}
            };

            doc.querySelectorAll('.category-section').forEach(section => {
                const categoryId = section.id;
                const projectCount = section.querySelectorAll('.project-item, .gallery-item').length;
                projectStats.total += projectCount;
                projectStats.counts[categoryId] = projectCount;
            });

            updateProjectStats(projectStats);
        });
}); 