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

document.getElementById("menuToggle").addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.toggle("active");
});