let currentImageIndex = 0; // Индекс текущей выбранной картинки
let totalImages = 0; // Общее количество картинок в галерее

window.onload = function () {
    const images = document.querySelectorAll('.img-gallery img');
    images.forEach(image => {
        image.addEventListener('click', showLightbox);
    });
}

function showLightbox(event) {
    const images = document.querySelectorAll('.img-gallery img');
    totalImages = images.length;
    currentImageIndex = Array.from(images).indexOf(event.target); // Получаем индекс текущей выбранной картинки

    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

    const img = document.createElement('img');
    img.src = event.target.src;

    lightbox.appendChild(img);
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', hideLightbox);

    // Добавляем обработчики событий на клавиши влево и вправо
    document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = totalImages - 1; // Обрабатываем случай, когда достигнута первая картинка
        }
        updateLightboxImage();
    } else if (event.key === 'ArrowRight') {
        currentImageIndex++;
        if (currentImageIndex >= totalImages) {
            currentImageIndex = 0; // Обрабатываем случай, когда достигнута последняя картинка
        }
        updateLightboxImage();
    }
}

function updateLightboxImage() {
    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    const images = document.querySelectorAll('.img-gallery img');
    img.src = images[currentImageIndex].src;
}

function hideLightbox(event) {
    if (event.target.classList.contains('lightbox')) {
        document.removeEventListener('keydown', handleKeyDown);
        event.target.remove();
    }
}