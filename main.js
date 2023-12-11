// import Swiper slider bundle with all modules installed
import Swiper from 'swiper/bundle';
// import Swiper slider
import 'swiper/css/bundle';
// import Fancybox gallery
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
const Swiper1 = new Swiper("#swiper_1", {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 29,
  speed: 8000,
  autoplay: {
    delay: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    685: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    920: {
      slidesPerView: 4,
      spaceBetween: 29,
    }
  },
});
// Fancybox gallery
Fancybox.bind(document.getElementById("block_2_gallery_1"), "[data-fancybox]", {
  closeClickOutside: true,
});
Fancybox.bind(document.getElementById("block_2_gallery_2"), "[data-fancybox]", {
  closeClickOutside: true,
});
Fancybox.bind(document.getElementById("block_2_gallery_3"), "[data-fancybox]", {
  closeClickOutside: true,
});
Fancybox.bind(document.getElementById("block_2_gallery_4"), "[data-fancybox]", {
  closeClickOutside: true,
});
//Gallery slider
const galleryButtons = Array.from(document.querySelectorAll(".block_2_gallery_menu ul li"));
const gallerySlide = Array.from(document.querySelectorAll(".block_2_gallery_slide"));
galleryButtons[0].classList.add("active");
gallerySlide[0].classList.add("active");
let activeButton = galleryButtons[0];
let activeSlide = gallerySlide[0];
galleryButtons.forEach((e) => {
  e.addEventListener("click", buttonClick);
});
function buttonClick(e) {
  e.preventDefault();
  const button = e.target.closest(".block_2_gallery_menu ul li");
  changeButton(button);
}
function changeButton(button) {
  if (button.classList.contains("active")) {
    return;
  }
  activeButton.classList.remove("active");
  button.classList.add("active");
  activeButton = button;
  changeButtonIndex(button);
}
function changeButtonIndex(button) {
  const indexButton = galleryButtons.indexOf(button);
  changeSlide(indexButton);
}
function changeSlide(index) {
  activeSlide.classList.remove("active");
  gallerySlide[index].classList.add("active");
  activeSlide = gallerySlide[index];
}
//Menu fixed
window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;
  const menuWrap = document.querySelector(".menu_wrap");
  (scrollPosition > 220)
    ?
    menuWrap.classList.add("fixed")
    :
    menuWrap.classList.remove("fixed")
});
// Up Button
function scrollTo(to, duration = 700) {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = function () {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration)
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
}
let btn = document.querySelector(".up_button");
window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});
btn.onclick = function (click) {
  click.preventDefault();
  scrollTo(0, 200);
};
// Smooth scrolling anchors
let anchorlinks = document.querySelectorAll('a[href^="#"]')
for (let item of anchorlinks) { // relitere 
  item.addEventListener('click', (e) => {
    let hashval = item.getAttribute('href')
    let target = document.querySelector(hashval)
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    history.pushState(null, null, hashval)
    e.preventDefault()
  })
}
//Mobile menu
let burger = document.getElementById('burger');
let menu = document.getElementById('menu_mobile');
///////////////Function opening menu
function calcShowMenu(showMenu) {
  burger.classList.toggle("burger-open", showMenu);
  menu.classList.toggle("menu-open", showMenu);
  menu.classList.toggle("menuMoveLeft", showMenu);
  const menuWidth = menu.offsetWidth;
  [burger.style].map(v => v.transform = `translateX(${showMenu ? -menuWidth - 25 : 0}px)`);
}
let showMenu = false
/////////////////Pressing a Burger
burger.addEventListener('click', () => calcShowMenu(showMenu = !showMenu)
);
;
/////////////Closing when pressed outside the menu
window.addEventListener('mousedown', event => {
  if (!event.target.closest(".menu_mobile, .burger"))
    calcShowMenu(showMenu = false);
}
)
/////////////Closing when pressed outside the menu for mobile
window.addEventListener('touchstart', event => {
  if (!event.target.closest(".menu_mobile, .burger"))
    calcShowMenu(showMenu = false);
})
/////////////Closing when you click on a menu item
document.getElementById('menu_mobile').onclick = function (event) {
  var target = event.target;
  if (target.tagName == 'A') {
    calcShowMenu(showMenu = !showMenu)
  }
}
// Highlighting the active menu
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", navHighlighter);
let sectionId = ''
function navHighlighter() {
  let scrollY = window.scrollY;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = (current.getBoundingClientRect().top + window.scrollY) - 50;
    sectionId = current.getAttribute("id");
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      document.querySelector(".menu a[href*=" + sectionId + "]").classList.add("active"),
        document.querySelector(".menu_mobile a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".menu a[href*=" + sectionId + "]").classList.remove("active"),
        document.querySelector(".menu_mobile a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}