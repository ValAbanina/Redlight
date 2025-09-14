// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initMobileMenu();
    initFAQToggles();
    initTestimonialSlider();
    initNewsletterForm();
    initScrollAnimations();
    initCartFunctionality();
    initChatWidget();
    initSmoothScrolling();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const mainHeader = document.querySelector('.main-header');
    const mainNav = document.querySelector('.main-nav');
    const headerActions = document.querySelector('.header-actions');
    
    // Insert mobile menu toggle button
    mainHeader.insertBefore(mobileMenuToggle, headerActions);
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
    
    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
}

// FAQ Toggles
function initFAQToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (n >= testimonialCards.length) currentSlide = 0;
        if (n < 0) currentSlide = testimonialCards.length - 1;
        
        testimonialCards[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate newsletter subscription
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on page load
}

// Cart Functionality
function initCartFunctionality() {
    const addToCartButtons = document.querySelectorAll('.product-card .btn-primary');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate adding to cart
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Show notification
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            showNotification(`${productName} added to cart!`, 'success');
            
            // Add animation to cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Chat Widget
function initChatWidget() {
    const chatWidget = document.querySelector('.chat-widget');
    
    if (chatWidget) {
        chatWidget.addEventListener('click', function() {
            showNotification('Chat feature coming soon! Please contact us via email or phone.', 'info');
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                margin: 0;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close notification functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Search Functionality
function initSearch() {
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            // Create search overlay
            const searchOverlay = document.createElement('div');
            searchOverlay.className = 'search-overlay';
            searchOverlay.innerHTML = `
                <div class="search-container">
                    <input type="text" placeholder="Search products..." class="search-input">
                    <button class="search-close">&times;</button>
                </div>
            `;
            
            searchOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            const searchContainer = searchOverlay.querySelector('.search-container');
            searchContainer.style.cssText = `
                background: white;
                padding: 30px;
                border-radius: 12px;
                display: flex;
                gap: 15px;
                align-items: center;
                min-width: 400px;
            `;
            
            const searchInput = searchOverlay.querySelector('.search-input');
            searchInput.style.cssText = `
                flex: 1;
                padding: 15px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 16px;
            `;
            
            const searchClose = searchOverlay.querySelector('.search-close');
            searchClose.style.cssText = `
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            `;
            
            document.body.appendChild(searchOverlay);
            searchInput.focus();
            
            // Close search
            searchClose.addEventListener('click', () => searchOverlay.remove());
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    searchOverlay.remove();
                }
            });
            
            // Search functionality
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = this.value.trim();
                    if (query) {
                        showNotification(`Searching for "${query}"...`, 'info');
                        searchOverlay.remove();
                        // Here you would implement actual search functionality
                    }
                }
            });
        });
    }
}

// User Account Dropdown
function initUserDropdown() {
    const userIcon = document.querySelector('.user-icon');
    
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            // Create user dropdown
            const existingDropdown = document.querySelector('.user-dropdown');
            if (existingDropdown) {
                existingDropdown.remove();
                return;
            }
            
            const userDropdown = document.createElement('div');
            userDropdown.className = 'user-dropdown';
            userDropdown.innerHTML = `
                <a href="account.html">My Account</a>
                <a href="orders.html">Orders</a>
                <a href="wishlist.html">Wishlist</a>
                <a href="login.html">Login</a>
                <a href="signup.html">Sign Up</a>
            `;
            
            userDropdown.style.cssText = `
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                border-radius: 8px;
                padding: 10px 0;
                min-width: 150px;
                z-index: 1000;
            `;
            
            const links = userDropdown.querySelectorAll('a');
            links.forEach(link => {
                link.style.cssText = `
                    display: block;
                    padding: 10px 20px;
                    color: #333;
                    text-decoration: none;
                    transition: background 0.3s ease;
                `;
                
                link.addEventListener('mouseenter', () => {
                    link.style.background = '#f8fafc';
                });
                
                link.addEventListener('mouseleave', () => {
                    link.style.background = 'transparent';
                });
            });
            
            this.style.position = 'relative';
            this.appendChild(userDropdown);
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function closeDropdown(e) {
                if (!userIcon.contains(e.target)) {
                    userDropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
    }
}

// Product Quick View
function initProductQuickView() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const img = card.querySelector('img');
        
        img.addEventListener('click', function() {
            const productName = card.querySelector('h3').textContent;
            const productPrice = card.querySelector('.price').textContent;
            
            // Create quick view modal
            const modal = document.createElement('div');
            modal.className = 'quick-view-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <img src="${this.src}" alt="${productName}">
                    <div class="modal-info">
                        <h3>${productName}</h3>
                        <p class="price">${productPrice}</p>
                        <p>Experience premium red light therapy with this professional-grade device.</p>
                        <button class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            `;
            
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            `;
            
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                background: white;
                border-radius: 12px;
                padding: 30px;
                max-width: 600px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                position: relative;
            `;
            
            const modalClose = modal.querySelector('.modal-close');
            modalClose.style.cssText = `
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            modalClose.addEventListener('click', () => modal.remove());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initUserDropdown();
    initProductQuickView();
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScrollCheck = debounce(function() {
    const animatedElements = document.querySelectorAll('.fade-in:not(.visible), .slide-in-left:not(.visible), .slide-in-right:not(.visible)');
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}, 100);

window.addEventListener('scroll', debouncedScrollCheck);

