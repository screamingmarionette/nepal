document.addEventListener("DOMContentLoaded", function () {


  /* MOBILE MENU */


  var menuToggle = document.getElementById("menuToggle");
  var topbar = document.getElementById("topbar");
  var mobileOverlay = document.getElementById("mobileMenuOverlay");
  var menuIcon = menuToggle ? menuToggle.querySelector("i") : null;


  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("menu-open");


      if (menuIcon) {
        if (isOpen) {
          menuIcon.classList.remove("fa-bars");
          menuIcon.classList.add("fa-xmark");
        } else {
          menuIcon.classList.remove("fa-xmark");
          menuIcon.classList.add("fa-bars");
        }
      }
    });


    // Close menu when a link is clicked (useful for anchor links like #music)
    if (mobileOverlay) {
      var navLinks = mobileOverlay.querySelectorAll(".mobile-nav a");
      navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          document.body.classList.remove("menu-open");
          if (menuIcon) {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
          }
        });
      });
    }


    // Close menu when X button is clicked
    var mobileMenuClose = document.getElementById("mobileMenuClose");
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        if (menuIcon) {
          menuIcon.classList.remove("fa-xmark");
          menuIcon.classList.add("fa-bars");
        }
      });
    }
  }

  /* WATCH BUTTON */


  var watchNow = document.getElementById("watchNow");


  if (watchNow) {
    watchNow.addEventListener("click", function () {
      window.open("https://www.youtube.com/c/ScreamingMarionette", "_blank");
    });
  }



  /* HERO IMAGES */
  var scriptTag = document.querySelector('script[src*="js/script.js"]');
  var pathPrefix = "";
  if (scriptTag) {
    var src = scriptTag.getAttribute('src');
    var match = src.match(/^(\.\.\/)+/);
    if (match) {
      pathPrefix = match[0];
    }
  }


  var images = [
    "images/hero1.webp",
    "images/hero2.webp",
    "images/hero3.webp",
    "images/hero4.webp",
    "images/hero5.webp",
    "images/hero6.webp"
  ].map(function (src) { return pathPrefix + src; });



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

  /* ADDITIONAL CREW TOGGLE */
  const crewToggleBtn = document.getElementById("crewToggleBtn");
  const crewContainer = document.getElementById("crewContainer");

  if (crewToggleBtn && crewContainer) {
    crewToggleBtn.addEventListener("click", function () {
      const isExpanded = crewContainer.classList.toggle("is-expanded");
      crewToggleBtn.textContent = isExpanded ? "See Less" : "See More";

      // Small scroll adjustment if collapsing
      if (!isExpanded) {
        crewContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }


  /* MEMBERS CAROUSEL OBSERVER */
  var carousels = document.querySelectorAll('.members-carousel');


  carousels.forEach(function (carouselContainer) {
    var carouselCards = carouselContainer.querySelectorAll('.carousel-card');


    if (carouselCards.length > 0) {
      function updateActiveCard() {
        var containerRect = carouselContainer.getBoundingClientRect();
        var containerCenter = containerRect.left + (containerRect.width / 2);


        var closestCard = null;
        var closestDist = Infinity;


        carouselCards.forEach(function (card) {
          var cardRect = card.getBoundingClientRect();
          var cardCenter = cardRect.left + (cardRect.width / 2);
          var dist = Math.abs(containerCenter - cardCenter);


          if (dist < closestDist) {
            closestDist = dist;
            closestCard = card;
          }
        });


        carouselCards.forEach(function (card) {
          if (card === closestCard) {
            card.classList.add('active');
          } else {
            card.classList.remove('active');
          }
        });
      }


      carouselContainer.addEventListener('scroll', updateActiveCard);
      window.addEventListener('resize', updateActiveCard);


      // Initial call to set the first active card
      updateActiveCard();
    }
  });


  /* GALLERY SHUFFLE & LIGHTBOX */
  var galleryGrid = document.querySelector(".masonry-gallery");
  var lightbox = document.getElementById("lightboxOverlay");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");


  if (galleryGrid) {
    // 1. SHUFFLE IMAGES
    var items = Array.from(galleryGrid.children);
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }
    items.forEach(function (item) {
      galleryGrid.appendChild(item);
    });


    // 2. LIGHTBOX INTERACTIVITY
    galleryGrid.addEventListener("click", function (e) {
      if (e.target.tagName === "IMG") {
        var clickedImg = e.target;
        if (lightboxImg) lightboxImg.src = clickedImg.src;
        if (lightbox) {
          lightbox.style.display = "flex";
          setTimeout(function () {
            lightbox.classList.add("active");
          }, 10);
        }
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }
    });


    function closeLightbox() {
      if (lightbox) {
        lightbox.classList.remove("active");
        setTimeout(function () {
          lightbox.style.display = "none";
        }, 400);
      }
      document.body.style.overflow = ""; // Re-enable scrolling
    }


    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }


    if (lightbox) {
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }


    // Keyboard support
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }


});
