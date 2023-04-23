import _ from 'lodash'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@/index"
import "./styles/pc/pc.scss"
import "./styles/mobile.scss"

import coreTechCommonData from "./coreTechCommonData"

let coreTechIndex = 0

const coreTechnologyMenuListener = _.debounce(function () {
  const index = $(this).index();
  if (coreTechIndex === index) {
    return;
  }
  $(".core-technology .core-technology-menu.active").removeClass("active");
  $(`.core-technology .core-technology-menu:nth-child(${index + 1})`).addClass("active");
  coreTechIndex = index;
  renderCoreTechGroup(index);
}, 300)

$('.core-technology').on('click', '.core-technology-menu', coreTechnologyMenuListener)

function renderCoreTechGroup(index) {
  const sourceList = coreTechCommonData[index]
  if (Array.isArray(sourceList)) {
    for (let i = 0; i < 3; i++) {
      if (sourceList[i]) {
        const {title, desc, base64Str} = sourceList[i]
        $(`#core-technology-content > .menu-card:nth-child(${i + 1}) .title`)[0].innerText = title;
        $(`#core-technology-content > .menu-card:nth-child(${i + 1}) .desc`)[0].innerText = desc;
        $(`#core-technology-content > .menu-card:nth-child(${i + 1}) img`)[0].src = base64Str;
        $(`#core-technology-content > .menu-card:nth-child(${i + 1})`).show()
      } else {
        $(`#core-technology-content > .menu-card:nth-child(${i + 1})`).hide()
      }
    }
  }
}

$(() => {
  renderCoreTechGroup(0);
})
