console.log(
  "%cCopyright © 2026 MUSEJOT",
  "background-color: #a285e6; color: white; font-size: 24px; font-weight: bold; padding: 10px;",
);
console.log("%c   /\\_/\\", "color: #f7b267; font-size: 20px;");
console.log("%c  ( o.o )", "color: #f7b267; font-size: 20px;");
console.log(" %c  > ^ <", "color: #f7b267; font-size: 20px;");
console.log("  %c /  ~ \\", "color: #f7b267; font-size: 20px;");
console.log("  %c/______\\", "color: #f7b267; font-size: 20px;");

// console.log(
//   `%c
//         ▀████▀▄▄              ▄█
//           █▀    ▀▀▄▄▄▄▄    ▄▄▀▀█
//   ▄        █          ▀▀▀▀▄  ▄▀
//  ▄▀ ▀▄      ▀▄              ▀▄▀
// ▄▀    █     █▀   ▄█▀▄      ▄█
// ▀▄     ▀▄  █     ▀██▀     ██▄█
//  ▀▄    ▄▀ █   ▄██▄   ▄  ▄  ▀▀ █
//   █  ▄▀  █    ▀██▀    ▀▀ ▀▀  ▄▀
//  █   █  █      ▄▄           ▄▀
// `,
//   "color: #f6d21b; font-size: 12px;",
// );

// 阻止默认的上下文菜单行为
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

// 导航栏切换
function openTab(tabName) {
  // 移除所有按钮active状态
  var tabButtons = document.getElementsByClassName("tab-button");
  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("but-active");
  }

  // 移除所有内容active状态
  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("content-active");
  }

  // 添加选中按钮的active状态
  event.target.classList.add("but-active");

  // 添加选中内容的active状态
  document.getElementById(tabName).classList.add("content-active");
}

function toggleClass(selector, className) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (element) {
    element.classList.toggle(className);
  });
}

// 展示或隐藏弹窗
function PopUp(imageURL) {
  var popupMainElement = document.querySelector(".pop-up-img");
  if (imageURL) {
    popupMainElement.src = imageURL;
  }
  toggleClass(".pop-up", "active");
  toggleClass(".pop-up-main", "active");
  toggleClass(".pop-up-close", "active");
}

// 展示或隐藏侧边栏
function left() {
  toggleClass(".left-main", "left-main-open");
  toggleClass(".left", "left-open");
}

// 展开或收起问答项
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains("active");

  if (isActive) {
    faqItem.classList.remove("active");
  } else {
    faqItem.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var currentTheme = getCookie("themeState") || "Light";
  const htmlTag = document.querySelector("html");
  var svgItems = document.getElementsByTagName("svg");
  var tanChiShe = document.getElementById("tanChiShe");

  // 修改svg颜色
  function changeSvg(color) {
    for (var i = 0; i < svgItems.length; i++) {
      var paths = svgItems[i].getElementsByTagName("path");
      for (var j = 0; j < paths.length; j++) {
        paths[j].setAttribute("fill", color);
      }
    }
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) == 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  // 切换主题
  function changeTheme(theme) {
    if (theme === "Dark") {
      currentTheme = "Dark";
      changeSvg("#ffffff");
      tanChiShe.src = "./img/snake-dark.svg";
      htmlTag.dataset.theme = "dark";
    } else if (theme === "Light") {
      currentTheme = "Light";
      changeSvg("#000000");
      tanChiShe.src = "./img/snake-light.svg";
      htmlTag.dataset.theme = "";
    }
    setCookie("themeState", theme, 365);
  }

  const switchCheckbox = document.getElementById("myonoffswitch");

  switchCheckbox.addEventListener("change", function (e) {
    changeTheme(currentTheme === "Dark" ? "Light" : "Dark");
  });

  // 如果初始theme是深色，则切换开关状态为关闭
  if (currentTheme === "Dark") {
    switchCheckbox.checked = false;
  }

  changeTheme(currentTheme);

  // 获取最新年份，更新到页面底部的版权位置
  const currentYearEle = document.getElementsByClassName("current-year")[0];
  currentYearEle.textContent = `- ${new Date().getFullYear()}`;
});
