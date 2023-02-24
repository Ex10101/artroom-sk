hamburger = document.querySelector("#hamburger")
navbar = document.querySelector("#navbar")
navbarLinks = document.querySelector(".navbar-link")

hamburger.onclick = function() {
    navbar.classList.toggle("active");
}
