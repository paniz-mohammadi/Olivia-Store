const navbar = document.querySelector(".navbar");
const navBtn = document.getElementById("nav-btn");
const navLinks = document.getElementById("nav-links");

const sidebar = document.querySelector(".sidebar");
// const sidebarBtn = document.getElementById("sidebar-btn");
const sideLinks = document.getElementById("sidebar-links"); 

const closeBtn = document.querySelector("close-btn");

// add event listener
navBtn.addEventListener("click", () => 
{
    navLinks.classList.toggle("show-links");
});

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(link => 
{
    link.addEventListener("click", e => 
    {
        e.preventDefault();
        navLinks.classList.remove("show-links");

        const id = e.target.getAttribute("href").slice(1);
        const element = document.getElementById(id);

        let position = element.offsetTop - 62;

        window.scrollTo(
        {
            left: 0,
            top: position,
            behavior: "smooth"
        });
    });
});

function showSigninPage()
{
    window.location.href= "./sign-in.html";
} 

function showSignupPage()
{
    window.location.href= "./sign-up.html";
}
