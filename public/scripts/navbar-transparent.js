const navbar = document.querySelector('header');

window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const threshold = navbar.offsetHeight / 2;

    if (scrolled >= threshold) {
        navbar.style.backgroundColor = '#22222e7a';
    } else {
        navbar.style.backgroundColor = '#22222e';
    }
});