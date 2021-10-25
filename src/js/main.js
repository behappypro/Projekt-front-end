// Testkommentar
    var menu = document.querySelector(".menu")
    var ham = document.querySelector(".ham")
    var xIcon = document.querySelector(".xIcon")
    var menuIcon = document.querySelector(".menuIcon")
    var body = document.getElementsByTagName("BODY")[0];

    ham.addEventListener("click", toggleMenu)

    function toggleMenu() {
    if (menu.classList.contains("showMenu")) {
       menu.classList.remove("showMenu");
       xIcon.style.display = "none";
       menuIcon.style.display = "block";
       body.style.overflow = "auto";
    } 
    else {
       menu.classList.add("showMenu");
       
       xIcon.style.display = "block";
       menuIcon.style.display = "none";
       body.style.overflow = "hidden";
    }
    }

    var menuLinks = document.querySelectorAll(".menu-item")

    menuLinks.forEach(
    function (menuLink) {
       menuLink.addEventListener("click", toggleMenu)
    }
    )

    
