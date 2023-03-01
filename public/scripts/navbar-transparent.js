const navbar = document.querySelector('header');

window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const threshold = navbar.offsetHeight / 2;

    if (scrolled >= threshold) {
        navbar.style.backgroundColor = '#22222e7a';
        // cюда пойдут стили, когда пользователь прокрутил страницу
    } else {
        navbar.style.backgroundColor = '#22222e';
        // сюда пойдут стили, когда пользователь на начале страницы
    }
});