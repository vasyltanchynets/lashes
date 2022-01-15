var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function ibg() {
  $.each($(".ibg"), function (index, val) {
    if ($(this).find("img").length > 0) {
      $(this).css(
        "background-image",
        'url("' + $(this).find("img").attr("src") + '")'
      );
    }
  });
}
ibg();

// fullscreen resize
$(window).resize(function (event) {
  mainblock();
});
function mainblock() {
  var h = $(window).outerHeight();
  $(".mainblock").css("min-height", h);
}
mainblock();

// dynamic adaptive menu
$(window).resize(function (event) {
  adaptive_function();
});
function adaptive_header(w, h) {
  var headerMenuBottom = $(".header-menu-bottom");
  var headerMenuList = $(".header-menu-list");
  if (w < 992.98) {
    if (!headerMenuList.hasClass("done")) {
      headerMenuList.addClass("done").appendTo(headerMenuBottom);
    }
  } else {
    if (headerMenuList.hasClass("done")) {
      headerMenuList.removeClass("done").prependTo($(".header-menu"));
    }
  }
}
function adaptive_function() {
  var w = $(window).outerWidth();
  var h = $(window).outerHeight();
  adaptive_header(w, h);
}
adaptive_function();

// salon animation
window.onload = function () {
  salonAnimation();
};
function salonAnimation() {
  let mainTitle = document.getElementsByClassName("salon__title")[0];
  let span = mainTitle.getElementsByTagName("span");

  span[span.length - 1].onanimationend = function () {
    mainTitle.classList.remove("salon__title_animation_show");
    mainTitle.classList.add("salon__title_animation_hide");
    this.onanimationend = function () {
      mainTitle.classList.remove("salon__title_animation_hide");
      mainTitle.classList.add("salon__title_animation_show");
      salonAnimation();
    };
  };
}

// scroll animation
const animItems = document.querySelectorAll("._anim-items");
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  setTimeout(() => {
    animOnScroll();
  }, 300);
}
