import _ from 'lodash'
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/pc/pc.scss"
import "./styles/mobile.scss"
import {switchNavWhenScroll} from "@/index";

switchNavWhenScroll()

window.onscroll = switchNavWhenScroll

let companyIndex = 0;

const addressList = [{
  location: [116.48820508930967, 39.8852751054972],
  title: "华腾新科技大厦",
  address: "北京市朝阳区东四环中路195号楼9层909-1"
}, {
  location: [113.394478, 23.123875],
  title: "加悦大厦",
  address: "广州市中山大道中38号加悦大厦707室"
},{
  location: [121.485374, 31.385754],
  title: "创客邦",
  address: "上海市宝山区同济路488号创客邦309室"
}, {
  location: [117.143112, 39.176353],
  title: "银泰大厦",
  address: "天津市红桥区咸阳北路48路银泰大厦A座15楼1504-2"
},{
  location: [121.51738, 38.84898],
  title: "大连设计城",
  address: "辽宁省大连高新技术产业园区七贤岭爱贤街10号设计城A座第4层415"
}, {
  location: [113.93103, 22.531822],
  title: "西海明珠大厦",
  address: "深圳市南山区南头街道大汪山社区桃园东路1号西海明珠大厦11楼C23"
}]

let marker, infoWindow = null;
let map = null;
window.initMap = function () {
  map = new AMap.Map('map-container', {
    showIndoorMap: false,
    resizeEnable: true,
    center: addressList[0].location,
    zoom: 14
  });
  const scale = new AMap.Scale({
      visible: true
    }),
    toolBar = new AMap.ToolBar({
      visible: true
    });
  map.addControl(scale);
  map.addControl(toolBar);
  infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
  addMarker(0)
}

// 实例化点标记
function addMarker(index) {
  clearMarker()
  map.setCenter(addressList[index].location);
  marker = new AMap.Marker({
    position: addressList[index].location,
    map: map
  });
  marker.content = addressList[index].title;
  marker.on('click', markerClick);
  marker.emit('click', {target: marker});
}

function markerClick(e) {
  infoWindow.setContent(e.target.content);
  infoWindow.open(map, e.target.getPosition());
}

// 清除 marker
function clearMarker() {
  if (marker) {
    marker.setMap(null);
    marker = null;
  }
}

const switchCompany = _.debounce(function() {
  const index = $(this).index();
  if (companyIndex !== index) {
    companyIndex = index;
    $(".contactus-tabbar .tab.active").toggleClass("active", false)
    $(".left-menu .contactus-left-menu.active").toggleClass("active", false)
    $(`.contactus-tabbar .tab:nth-child(${index+1})`).toggleClass("active", true)
    $(`.left-menu .contactus-left-menu:nth-child(${index+1})`).toggleClass("active", true)
    $(".address-wrapper .address")[0].innerText = addressList[index].address
    addMarker(index)
  }
}, 300)
$(".contactus-tabbar").on("click", ".tab", switchCompany)
$(".left-menu").on("click", ".contactus-left-menu", switchCompany)

$(() => {
  const hash = window.location.hash
  if (hash) {
    setTimeout(() => {
      $("html, body").animate({scrollTop: $(`#${hash.slice(1)}`).offset().top - 80 +"px"}, 200);
    }, 200)
  }
  const url = 'https://webapi.amap.com/maps?v=1.4.15&key=8c61cec28d32f6abd3d44052dd9d79e0&callback=initMap&plugin=AMap.Scale,AMap.ToolBar';
  const jsapi = document.createElement('script');
  jsapi.charset = 'utf-8';
  jsapi.src = url;
  document.head.appendChild(jsapi);
})
