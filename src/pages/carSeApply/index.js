import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@/index";
import "./styles/pc/pc.scss";
import "./styles/mobile.scss";

import coreTechCommonData from "./coreTechCommonData";

let coreTechIndex = 0;

const coreTechnologyMenuListener = _.debounce(function () {
  const index = $(this).index();
  if (coreTechIndex === index) {
    return;
  }
  $(".core-technology .core-technology-menu.active").removeClass("active");
  $(`.core-technology .core-technology-menu:nth-child(${index + 1})`).addClass(
    "active"
  );
  coreTechIndex = index;
  renderCoreTechGroup(index);
}, 300);

$(".core-technology").on(
  "click",
  ".core-technology-menu",
  coreTechnologyMenuListener
);

function renderCoreTechGroup(index) {
  const sourceList = coreTechCommonData[index];
  if (sourceList) {
    const { title, desc, icons } = sourceList;
    $(`#core-technology-content > .menu-card .title`)[0].innerText = title;
    $(`#core-technology-content > .menu-card .desc`)[0].innerText = desc;
    $(`#core-technology-content > .menu-card`).show();
    for (let i = 0; i < icons.length; i++) {
      $(`#menu-card-thumbnail>.card-item:nth-child(${i + 1})  img`)[0].src =
        icons[i].img;
      $(
        `#menu-card-thumbnail>.card-item:nth-child(${i + 1})  .title`
      )[0].innerText = icons[i].title;
      $(
        `#menu-card-thumbnail>.card-item:nth-child(${i + 1})  .subtitle`
      )[0].innerText = icons[i].text;
    }
    if (icons.length < 3) {
      $(`#menu-card-thumbnail>.card-item:last-child`).hide();
    } else {
      $(`#menu-card-thumbnail>.card-item:last-child`).show();
    }
  } else {
    $(`#core-technology-content > .menu-card`).hide();
  }
}
$(() => {
  renderCoreTechGroup(0);
});
