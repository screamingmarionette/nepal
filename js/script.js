document.addEventListener("DOMContentLoaded", function () {

  /* MOBILE MENU */

var menuToggle = document.getElementById("menuToggle");
var topbar = document.getElementById("topbar");

if (menuToggle && topbar) {
  menuToggle.addEventListener("click", function () {
    topbar.classList.toggle("mobile-open");
    document.body.classList.toggle("menu-open");
  });
}


  /* WATCH BUTTON */

  var watchNow = document.getElementById("watchNow");

  if (watchNow) {
    watchNow.addEventListener("click", function () {
      window.open("https://www.youtube.com/c/ScreamingMarionette", "_blank");
    });
  }


  /* HERO IMAGES */

  var images = [
    "images/hero1.jpg",
    "images/hero2.jpg",
    "images/hero3.jpg",
    "images/hero4.jpg",
    "images/hero5.jpg",
    "images/hero6.jpg"
  ];


  /* PRELOAD HERO IMAGES */

  images.forEach(function (src) {
    var img = new Image();
    img.src = src;
  });


  /* HERO CROSSFADE BACKGROUND */

  var bg1 = document.querySelector(".hero-bg1");
  var bg2 = document.querySelector(".hero-bg2");

  var index = Math.floor(Math.random() * images.length);
  var showingFirst = true;

  function changeHeroImage() {
    if (!bg1 || !bg2) {
      return;
    }

    var nextImage = images[index];

    var gradient =
      "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 18%, rgba(0,0,0,0.05) 42%, rgba(0,0,0,0.25) 72%, rgba(0,0,0,0.65) 100%)";

    if (showingFirst) {
      bg2.style.backgroundImage = gradient + ", url('" + nextImage + "')";
      bg2.style.opacity = 1;
      bg1.style.opacity = 0;
    } else {
      bg1.style.backgroundImage = gradient + ", url('" + nextImage + "')";
      bg1.style.opacity = 1;
      bg2.style.opacity = 0;
    }

    showingFirst = !showingFirst;

    index++;

    if (index >= images.length) {
      index = 0;
    }
  }

  if (bg1 && bg2) {
    changeHeroImage();
    setInterval(changeHeroImage, 7000);
  }


  /* CONTACT FORM SUBMISSION */

  var contactForm = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(contactForm);

      fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      })
      .then(function (response) {
        if (response.ok) {
          if (formStatus) {
            formStatus.innerHTML = "Message sent successfully.";
          }
          contactForm.reset();
        } else {
          if (formStatus) {
            formStatus.innerHTML = "Oops! Something went wrong.";
          }
        }
      })
      .catch(function () {
        if (formStatus) {
          formStatus.innerHTML = "Network error. Please try again.";
        }
      });
    });
  }

});
