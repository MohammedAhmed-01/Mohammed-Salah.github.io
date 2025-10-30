/**
 * main.js
 * Professional enhancements for Mohammed Salah's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('p-theme-toggle-btn');
    const htmlElement = document.documentElement;
    const THEME_STORAGE_KEY = 'portfolio_theme';
    const DARK_MODE_CLASS = 'dark-mode';

    /**
     * Applies the theme stored in localStorage or defaults to 'dark'.
     */
    function applyInitialTheme() {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        // Default to dark mode if no preference is found
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add(DARK_MODE_CLASS);
            localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        } else {
            htmlElement.classList.remove(DARK_MODE_CLASS);
            localStorage.setItem(THEME_STORAGE_KEY, 'light');
        }
    }

    /**
     * Toggles the theme on button click.
     */
    function toggleTheme() {
        const isDark = htmlElement.classList.toggle(DARK_MODE_CLASS);
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Apply theme immediately on load
    applyInitialTheme();


    // --- 2. Mobile Navigation Toggle ---
    const navbarToggle = document.getElementById('p-navbar-toggle');
    const navbarLinksContainer = document.getElementById('p-navbar-links-container');
    const navLinks = document.querySelectorAll('#p-navbar-links a');

    if (navbarToggle && navbarLinksContainer) {
        /**
         * Toggles the mobile navigation menu.
         */
        const toggleMobileMenu = (event) => {
            if (event) event.stopPropagation();
            const isActive = navbarLinksContainer.classList.toggle('active');
            navbarToggle.classList.toggle('active', isActive);
            navbarToggle.setAttribute('aria-expanded', isActive);
        };

        navbarToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when a link is clicked (for smooth scroll navigation)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarLinksContainer.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navbarLinksContainer.classList.contains('active') && 
                !navbarLinksContainer.contains(event.target) && 
                !navbarToggle.contains(event.target)) {
                toggleMobileMenu();
            }
        });
    }

    // --- 3. Scroll-based Section Visibility (Optional: for a nice fade-in effect) ---
    const sections = document.querySelectorAll('.p-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    /**
     * Handles intersection of sections for fade-in effect.
     * @param {IntersectionObserverEntry[]} entries 
     * @param {IntersectionObserver} observer 
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in'); // Add a class for CSS transition
        sectionObserver.observe(section);
    });
});
