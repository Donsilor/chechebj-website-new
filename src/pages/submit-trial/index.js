import _ from 'lodash'
import "@/index"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import "./styles/pc/pc.scss"
import "./styles/mobile.scss"

let isLoading = false
let count = 60;
let timer = null;
let disabledSms = false
const submitListener = _.debounce(function () {
  console.log("submitListener")
  const companyName = $("#companyInput").val()
  const userName = $("#nameInput").val()
  const phoneNum = $("#phoneInput").val()
  const code = $("#codeInput").val()
  if (!companyName) {
    $("#modal-body").text("请输入公司名称")
    $('#myModal').modal("show")
  } else if (!userName) {
    $("#modal-body").text("请输入您的姓名")
    $('#myModal').modal("show")
  } else if (!phoneNum) {
    $("#modal-body").text("请输入您的手机号码")
    $('#myModal').modal("show")
  } else if (!/^1\d{10}$/.test(phoneNum)) {
    $("#modal-body").text("请输入合法的手机号码")
    $('#myModal').modal("show")
  } else if (!code) {
    $("#modal-body").text("请输入您收到的验证码")
    $('#myModal').modal("show")
  } else {
    if (isLoading) {
      return;
    }
    isLoading = true
    $.post({
      url: "/api/LoginAction_applyTrial",
      data: JSON.stringify({
        companyName,
        userName,
        phoneNum,
        code
      }),
      dataType: "json",
      contentType: "application/json",
      success(data) {
        console.log("LoginAction_applyTrial", data)
        const jsonData = data;
        isLoading = false
        if (jsonData.result == 0) {
          $("#successMsg").text("提交成功，稍后会有业务人员联系您！")
          $("#successInfo").show()
          clearAll()
          setTimeout(() =>{
            $("#successInfo").hide()
            window.history.go(-1)
          }, 5000)
        } else {
          $("#errorMsg").text(jsonData.msg || "提交失败，请重试")
          $("#errorInfo").show()
          setTimeout(() => {
            $("#errorInfo").hide()
          }, 5000)
        }
      },
      error(error) {
        $("#errorMsg").text("发送失败，请重试")
        $("#errorInfo").show()
        setTimeout(() => {
          $("#errorInfo").hide()
        }, 5000)
        isLoading = false
      }
    })
  }
}, 300);
$("#trial-submit-btn").on("click", submitListener)

const smsListener = _.debounce(function () {
  if (disabledSms) {
    return;
  }
  const phoneNum = $("#phoneInput").val()
  if (!phoneNum) {
    $("#modal-body").text("请输入手机号码")
    $('#myModal').modal("show")
  } else if (!/^1\d{10}$/.test(phoneNum)) {
    $("#modal-body").text("请输入合法的手机号码")
    $('#myModal').modal("show")
  } else {
    if (isLoading) {
      return;
    }
    isLoading = true
    startSmsBtnCount()
    $.post({
      url: "/api/UtilAction_sendSmsVerificationCode",
      data: JSON.stringify({
        phoneNum
      }),
      dataType: "json",
      contentType: "application/json",
      success(data) {
        console.log("UtilAction_sendSmsVerificationCode", data)
        const jsonData = data;
        isLoading = false
        if (jsonData.result == 0) {
          $("#successMsg").text("验证码发送成功，请查收！（3分钟内有效）")
          $("#successInfo").show()
          setTimeout(() => {
            $("#successInfo").hide()
          }, 5000)
          startSmsBtnCount()
        } else {
          $("#errorMsg").text(jsonData.msg || "发送失败，请重试")
          $("#errorInfo").show()
          setTimeout(() => {
            $("#errorInfo").hide()
          }, 5000)
        }
      },
      error(error) {
        isLoading = false
        $("#errorMsg").text("发送失败，请重试")
        $("#errorInfo").show()
        setTimeout(() => {
          $("#errorInfo").hide()
        }, 5000)
      }
    })
  }
}, 300);

$("#trial-sms-btn").on("click", smsListener)

function clearAll() {
  $("#companyInput").val("")
  $("#nameInput").val("")
  $("#phoneInput").val("")
  $("#codeInput").val("")
}

function startSmsBtnCount() {
  disabledSms = true
  count = 60;
  $("#trial-sms-btn").toggleClass("disabled", true)
  $("#trial-sms-btn > span").text("倒计时：60s");

  timer = setInterval(() => {
    if (count <= 1) {
      clearInterval(timer)
      disabledSms = false
      $("#trial-sms-btn").toggleClass("disabled", false)
      $("#trial-sms-btn > span").text("获取验证码");
    } else {
      count--;
      $("#trial-sms-btn > span").text(`倒计时：${count}s`);
    }
  }, 1000)
}
