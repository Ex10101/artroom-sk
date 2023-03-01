const observer = new IntersectionObserver((ent) => {
    ent.forEach((entity) => {
        if(entity.isIntersecting) {
            entity.target.classList.add("shown")
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => {
    observer.observe(element);
})