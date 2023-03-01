window.addEventListener("load", function () {
    const sections = document.querySelectorAll(".section");

    sections.forEach(function (section) {
        if (section.dataset.type !== "design") {
            section.style.display = "none";
        }
    });

    const designButton = document.querySelector("[data-type='design']");
    designButton.classList.add("active");

    const buttons = document.querySelectorAll(".filter-button");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            buttons.forEach(function (button) {
                button.classList.remove("active");
            });

            button.classList.add("active");

            sections.forEach(function (section) {
                if (section.dataset.type === button.dataset.type) {
                    section.style.display = "grid";
                } else {
                    section.style.display = "none";
                }
            });
        });
    });
});
