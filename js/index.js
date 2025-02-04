document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Toggle menu and scroll lock
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
        
        // Lock/unlock scroll
        if (navLinks.classList.contains('active')) {
            // Disable scroll
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            // Enable scroll
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            // Enable scroll
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            // Enable scroll
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        });
    });
}); 