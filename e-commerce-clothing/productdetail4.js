let selectedSize = null;
let isFavourite = false;

// Mobile menu toggle function - Same as home page
function toggleMobileMenu() {
    const nav = document.getElementById('mobileMenu');
    nav.classList.toggle('active');
}

function switchImage(thumbnail) {
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
    const mainImg = document.getElementById('mainProductImage');
    const thumbnailImg = thumbnail.querySelector('img');
    mainImg.src = thumbnailImg.src;
}

function selectSize(sizeElement) {
    if (sizeElement.classList.contains('unavailable')) {
        return;
    }

    document.querySelectorAll('.size-option').forEach(s => s.classList.remove('selected'));
    sizeElement.classList.add('selected');
    selectedSize = sizeElement.dataset.size;

    const addToBagBtn = document.getElementById('addToBagBtn');
    addToBagBtn.disabled = false;
}

function addToBag() {
    if (!selectedSize) {
        alert('Please select a size first');
        return;
    }

    alert(`Added to bag: JL Tour Signature Polo – Sandstone Beige (Size ${selectedSize})`);
}

function toggleFavourite() {
    isFavourite = !isFavourite;
    const heartIcon = document.getElementById('heartIcon');
    const favouriteBtn = document.querySelector('.favourite-btn');
    
    if (isFavourite) {
        heartIcon.textContent = '❤️';
        favouriteBtn.style.borderColor = '#d4af37';
        favouriteBtn.style.color = '#d4af37';
    } else {
        heartIcon.textContent = '🤍';
        favouriteBtn.style.borderColor = '#ddd';
        favouriteBtn.style.color = '#000';
    }
}

function showSizeGuide() {
    alert('Size Guide:\n\nS: Chest 88-92cm\nM: Chest 96-100cm\nL: Chest 104-108cm\nXL: Chest 112-116cm\n3XL: Chest 124-128cm\n\nMeasure around the fullest part of your chest.');
}

// Newsletter subscription
function handleNewsletterSubscription() {
    const emailInput = document.querySelector('.newsletter input');
    const email = emailInput.value.trim();
    
    if (email && email.includes('@')) {
        alert('Thank you for subscribing!');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle - Same as home page
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', handleNewsletterSubscription);
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const nav = document.getElementById('mobileMenu');
            nav.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.getElementById('mobileMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
        }
    });

    // Touch-friendly size selection for mobile
    if (window.innerWidth <= 768) {
        const sizeOptions = document.querySelectorAll('.size-option');
        sizeOptions.forEach(option => {
            option.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            option.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Smooth scrolling for better mobile experience
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});