import Swiper from "swiper";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/swiper.min.css";
import { switchNavWhenScroll } from "@/index";
import "./coreTech";

import "./styles/pc/pc.scss";
import "./styles/mobile.scss";

switchNavWhenScroll();
window.onscroll = switchNavWhenScroll;

const mySwiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "custom",
    renderCustom: function (swiper, current, total) {
      let paginationHtml = "";
      for (let i = 1; i <= total; i++) {
        if (i === current) {
          paginationHtml += `<div class='pagination active'>
                          </div>`;
        } else {
          paginationHtml += `<div class='pagination'>
                          </div>`;
        }
      }
      return `<div class="customer-pagination">${paginationHtml}</div>`;
    },
  },
});

$(".swiper-pagination").on("click", ".pagination", function () {
  const index = $(this).index();
  mySwiper.slideToLoop(index, 500, false);
});

const mySwiper2 = new Swiper(".scene-swiper-container", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 2,
  centeredSlides: true,
  autoplay: true,
  pagination: {
    el: ".scene-swiper-pagination",
    clickable: true,
    type: "custom",
    renderCustom: function (swiper, current, total) {
      let paginationHtml = "";
      for (let i = 1; i <= total; i++) {
        if (i === current) {
          paginationHtml += `<div class='pagination active'>
                          </div>`;
        } else {
          paginationHtml += `<div class='pagination'>
                          </div>`;
        }
      }
      return `<div class="customer-pagination">${paginationHtml}</div>`;
    },
  },
  on: {
    slideChangeTransitionStart: function () {
      const index =
        this.activeIndex === 2
          ? 6
          : this.activeIndex !== 9
          ? this.activeIndex - 2
          : 1;
      $(`#main-scene .scene-swiper-header > .title`).removeClass("active");
      $(
        `#main-scene .scene-swiper-header > .title:nth-child(${index})`
      ).toggleClass("active");
    },
  },
});

var mySwiper3 = new Swiper(".swiper-inform", {
  direction: "vertical",
  loop: true,
  speed: 3000, //匀速时间
  autoplay: {
    delay: 0,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
});
$(".swiper-inform").mouseover(function () {
  mySwiper3.autoplay.stop();
});
$(".swiper-inform").mouseout(function () {
  mySwiper3.autoplay.start();
});

const sceneHeaderListener = _.debounce(function () {
  const index = $(this).index();
  mySwiper2.slideToLoop(index, 500, true);
});

$(".scene-swiper-header").on("click", ".title", sceneHeaderListener);
