const hamburger = document.querySelector("#hamburger")
const navbario = document.querySelector("#navbar")
const navbarLinks = document.querySelector(".navbar-link")

hamburger.onclick = function() {
    navbario.classList.toggle("active");
}
