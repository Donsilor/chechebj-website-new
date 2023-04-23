import _ from 'lodash'

let ifMobileNaviExpand = false
let ifMenu1Expand = false
let ifMenu2Expand = false
const mobileTogglerListener = _.debounce(function () {
  if (!ifMobileNaviExpand) {
    $("html, body").animate({scrollTop: 0}, 200);
    $("#navibar").toggleClass("mobile-expand-navi", true)
    $("#mobile-navi").show(300);
  } else {
    $("#mobile-navi").hide(300, () => {
      $("#navibar").toggleClass("mobile-expand-navi", false)
      ifMenu1Expand = false
      ifMenu2Expand = false
      $("#mobile-menu-toggle1").toggleClass("active", ifMenu1Expand);
      $("#mobile-menu-toggle2").toggleClass("active", ifMenu2Expand);
    });
  }
  ifMobileNaviExpand = !ifMobileNaviExpand;
}, 300, {leading: true})


$("#navibar-mobile-toggler").on('click', mobileTogglerListener)

const mobileSubmenu1Listener = _.debounce(function () {
  ifMenu1Expand = !ifMenu1Expand
  $("#mobile-menu-toggle1").toggleClass("active", ifMenu1Expand);
  if (ifMenu2Expand) {
    ifMenu2Expand = false
    $("#mobile-menu-toggle2").toggleClass("active", ifMenu2Expand);
  }
}, 300, {leading: true})

const mobileSubmenu2Listener = _.debounce(function () {
  ifMenu2Expand = !ifMenu2Expand
  $("#mobile-menu-toggle2").toggleClass("active", ifMenu2Expand);
  if (ifMenu1Expand) {
    ifMenu1Expand = false
    $("#mobile-menu-toggle1").toggleClass("active", ifMenu1Expand);
  }
}, 300, {leading: true})


$("#mobile-menu-toggle1").on('click', mobileSubmenu1Listener)
$("#mobile-menu-toggle2").on('click', mobileSubmenu2Listener)


const mobileFooterTollerListener = _.debounce(function () {
  $(this).toggleClass("expand")
})

$("#footer").on('click', ".footer-group", mobileFooterTollerListener)


// header滚动事件
let headerStatus = "dark"

const switchNavWhenScroll = _.debounce(function () {
  if (!document.documentElement) {
    return;
  }
  const scrollTop = document.documentElement.scrollTop;
  if (document.documentElement.clientWidth >= 992) {
    // pc端
    if (scrollTop >= 500 && headerStatus === 'dark') {
      headerStatus = 'light'
      $("#navibar").toggleClass("light-navibar", true)
    } else if (scrollTop < 500 && headerStatus === 'light'){
      headerStatus = 'dark'
      $("#navibar").toggleClass("light-navibar", false)
    }
  } else {
    // 移动端
    if (scrollTop >= 250 && headerStatus === 'dark') {
      headerStatus = 'light'
      $("#navibar").toggleClass("light-navibar", true)
    } else if (scrollTop < 250 && headerStatus === 'light'){
      headerStatus = 'dark'
      $("#navibar").toggleClass("light-navibar", false)
    }

  }
}, 50, {maxWait: 100})


export {
  switchNavWhenScroll
};
