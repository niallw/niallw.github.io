
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
}

function menuOpen() {
  var menu = document.getElementById("menu-2024-global-summit-1");
  var menuBtn = document.querySelector(".menu-btn");
  if (menu.style.display === "block") {
    menu.style.display = "none";
    menuBtn.classList.remove("close");
  } else {
    menu.style.display = "block";
    menu.classList.add("fadeInRight-animation");
    menuBtn.classList.add("close");
  }
}

function menuOpenTwentyFive() {
  var menu = document.getElementById("menu-2025-annual-1");
  var menuBtn = document.querySelector(".menu-btn");
  if (menu.style.display === "block") {
    menu.style.display = "none";
    menuBtn.classList.remove("close");
  } else {
    menu.style.display = "block";
    menu.classList.add("fadeInRight-animation");
    menuBtn.classList.add("close");
  }
}

function menuOpenGS() {
  var menu = document.getElementById("menu-global-summit-2026");
  var menuBtn = document.querySelector(".menu-btn");
  if (menu.style.display === "block") {
    menu.style.display = "none";
    menuBtn.classList.remove("close");
  } else {
    menu.style.display = "block";
    menu.classList.add("fadeInRight-animation");
    menuBtn.classList.add("close");
  }
}