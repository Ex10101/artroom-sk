const navbar = document.querySelector('header');
const selector = document.querySelector('select');

window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const threshold = navbar.offsetHeight / 2;

    if (scrolled >= threshold) {
        navbar.style.backgroundColor = '#ffffff7a';
        selector.style.color = 'black';
        // cюда пойдут стили, когда пользователь прокрутил страницу
    } else {
        navbar.style.backgroundColor = '#ffffff';
        selector.style.color = 'black';
        // сюда пойдут стили, когда пользователь на начале страницы
    }
});
