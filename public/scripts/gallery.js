window.onload = function () {
    const images = document.querySelectorAll('.img-gallery img');
    images.forEach(image => {
        image.addEventListener('click', showLightbox);
    });
}

function showLightbox(event) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

    const img = document.createElement('img');
    img.src = event.target.src;

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', hideLightbox);
}

function hideLightbox(event) {
    if (event.target.classList.contains('lightbox')) {
        event.target.remove();
    }
}