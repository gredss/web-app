let selectedSize = null;

function switchImage(thumbnail) {
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    // Update main image
    const mainImg = document.getElementById('mainProductImage');
    const thumbnailImg = thumbnail.querySelector('img');
    mainImg.src = thumbnailImg.src;
}

function selectSize(sizeElement) {
    // Remove selected class from all sizes
    document.querySelectorAll('.size-option').forEach(s => s.classList.remove('selected'));
    // Add selected class to clicked size
    sizeElement.classList.add('selected');
    selectedSize = sizeElement.dataset.size;
}

function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    const newValue = Math.max(1, currentValue + change);
    quantityInput.value = newValue;
}

function addToCart() {
    const quantity = document.getElementById('quantity').value;
    
    if (!selectedSize) {
        alert('Please select a size first');
        return;
    }

    alert(`Added to cart: ${quantity} x AeroTech Performance Spikeless (Size EU ${selectedSize})`);
}

// Newsletter functionality
document.querySelector('.newsletter button').addEventListener('click', function() {
    const emailInput = document.querySelector('.newsletter input');
    const email = emailInput.value.trim();
    
    if (email && email.includes('@')) {
        alert('Thank you for subscribing!');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

document.getElementById('quantity').addEventListener('change', function() {
    if (this.value < 1) this.value = 1;
});
document.getElementById("menuToggle").addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.toggle("active");
});
