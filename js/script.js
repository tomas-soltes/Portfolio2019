/*****************  MENU  ******************/
let menu, hamburger_btn, switcher;

addMenuListener();
function addMenuListener() {
  menu = document.querySelector(".menu");
  hamburger_btn = document.querySelector(".menu__hamburger");
  switcher = document.querySelector("#switch");
  hamburger_btn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    hamburger_btn.classList.toggle("open");
    if (menu.className.indexOf("active") === -1) {
      menu.classList.add("active");
      document.querySelector(".logo img").src = "img/logo/logo-white.png";
    } else {
      menu.classList.remove("active");
      if (!switcher.checked) {
        document.querySelector(".logo img").src = "img/logo/logo-red.png";
      }
    }
  }
}
/*****************  Switcher  ******************/

switcher.addEventListener("click", function() {
  if (switcher.checked) {
    document.documentElement.style.setProperty("--primary-color", "#FFF");
    document.documentElement.style.setProperty("--secondary-color", "#F74949");
    document.documentElement.style.setProperty("--background-color", "#4A4A4A");
    document.documentElement.style.setProperty(
      "--hamburger-menu-color",
      "#4A4A4A"
    );
  } else {
    document.documentElement.style.setProperty("--primary-color", "#F74949");
    document.documentElement.style.setProperty("--secondary-color", "#4A4A4A");
    document.documentElement.style.setProperty("--background-color", "white");
    document.documentElement.style.setProperty(
      "--hamburger-menu-color",
      "#F74949"
    );
  }
});

let container;

addListeners();
function addListeners() {
  setTimeout(function() {
    addFunctions();
  }, 400);
}

function addFunctions() {
  container = document.querySelector(".container");
  window.onpopstate = function() {
    if (container.classList.contains("container-about")) {
      goBackTo(2);
      history.pushState({}, "#about");
      switch (location.hash) {
        case "#home":
          /*  backFromHome(); */
          console.log("home");

          break;
        case "#about":
          console.log("about");
          /* backFromLogin(); */
          break;
        default:
        /* defaultBackAnimation(); */
      }
    }
  };
}

function goBackTo(n) {
  setTimeout(function() {
    console.log(n);
    goBackToSlide(n);
    addValuesToVariables();
  }, 400);
}

/*****************  PAGE TRANSITION  ******************/
Barba.Pjax.start();

var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(
      this.fadeIn.bind(this)
    );
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer)
      .animate({ opacity: 0 })
      .promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility: "visible",
      opacity: 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
      addMenuListener();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};

/*****************  Slides  ******************/
let slides = document.querySelectorAll(".slide");
let dots_nodeList = document.querySelectorAll(".dot");
let dots = [];
let i, x;

for (i = 0; i < dots_nodeList.length; i++) {
  x = i + 1;
  dots[x] = dots_nodeList[i];
}

let lastScrollTop = 0;
let prev = slides.length;
let curr = 1;
let now = 8;
let next = 2;
let finished = true;
let scrolled = false;
let delta, prev_slide, curr_slide, next_slide;

addValuesToVariables();
function addValuesToVariables() {
  slides = document.querySelectorAll(".slide");
  dots_nodeList = document.querySelectorAll(".dot");

  for (i = 0; i < dots_nodeList.length; i++) {
    x = i + 1;
    dots[x] = dots_nodeList[i];
  }
  console.log(dots);

  lastScrollTop = 0;
  prev = slides.length;
  curr = 1;
  now = 8;
  next = 2;
  finished = true;
  scrolled = false;
}

/*****************  Back to the slide from another page  ******************/
function goBackToSlide(n) {
  prev = 8;
  curr = 1;
  next = n;
  dots_nodeList = document.querySelectorAll(".dot");
  for (i = 0; i < dots_nodeList.length; i++) {
    x = i + 1;
    dots[x] = dots_nodeList[i];
  }
  goToSlide(n);
}

/*****************  Go to the slide  ******************/
function goToSlide(n) {
  next_slide = document.querySelector(".slide" + n);
  prev_slide = document.querySelector(".slide" + prev);
  curr_slide = document.querySelector(".slide" + curr);
  console.log(prev);
  console.log(curr_slide);
  console.log(next);
  curr_slide.classList.remove("active");
  document.querySelector(".slide" + curr + " .slide_main").style.animation =
    "goLeft 1s backwards";
  document.querySelector(".slide" + next + " .slide_main").style.animation =
    "goFromRight 1s backwards";
  setTimeout(function() {
    next_slide.classList.add("active");
  }, 400);

  console.log(dots[curr]);
  dots[curr].classList.remove("active");
  dots[n].classList.add("active");

  setTimeout(function() {
    curr = n;
    next = n + 1;
    prev = n - 1;
    if (next > slides.length) {
      next = 1;
    }
    if (prev > slides.length) {
      prev = 1;
    }
    console.log(prev);
    console.log(curr);
    console.log(next);
  }, 900);
}

/*****************  Scroll listener - Desktop  ******************/
window.addEventListener("wheel", checkFinished);

function checkFinished() {
  container = document.querySelector(".container");
  if (container.classList.contains("container-index")) {
    if (finished) {
      finished = false;
      delta = Math.sign(event.deltaY);
      checkDirection(delta);
    }
  }
}

function checkDirection(delta) {
  prev_slide = document.querySelector(".slide" + prev);
  curr_slide = document.querySelector(".slide" + curr);
  next_slide = document.querySelector(".slide" + next);

  if (delta < 0) {
    changeSlideUp();
  }
  if (delta > 0) {
    changeSlideDown();
  }
  setTimeout(function() {
    finished = true;
  }, 1300);
}

function changeSlideUp() {
  console.log("up");
  curr_slide.classList.remove("active");
  document.querySelector(".slide" + curr + " .slide_main").style.animation =
    "goDown 1s backwards";
  document.querySelector(".slide" + prev + " .slide_main").style.animation =
    "goFromUp 1s backwards";
  setTimeout(function() {
    prev_slide.classList.add("active");
  }, 400);

  dots[curr].classList.remove("active");
  dots[prev].classList.add("active");

  setTimeout(function() {
    curr--;
    next--;
    prev--;
    if (curr < 1) {
      curr = slides.length;
    }
    if (next < 1) {
      next = slides.length;
    }
    if (prev < 1) {
      prev = slides.length;
    }
  }, 900);
}

function changeSlideDown() {
  console.log("down");
  curr_slide.classList.remove("active");
  document.querySelector(".slide" + curr + " .slide_main").style.animation =
    "goUp 1s backwards";
  document.querySelector(".slide" + next + " .slide_main").style.animation =
    "goFromDown 1s backwards";
  setTimeout(function() {
    next_slide.classList.add("active");
  }, 400);

  dots[curr].classList.remove("active");
  dots[next].classList.add("active");

  setTimeout(function() {
    curr++;
    next++;
    prev++;
    if (curr > slides.length) {
      curr = 1;
    }
    if (next > slides.length) {
      next = 1;
    }
    if (prev > slides.length) {
      prev = 1;
    }
  }, 900);
}

/*****************  Scroll listener - Mobile  ******************/
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;
  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  /* console.log(xDiff, yDiff); */

  if (Math.abs(yDiff) > Math.abs(xDiff)) {
    /*most significant*/
    if (finished) {
      finished = false;
      if (yDiff > 0) {
        /* up swipe */
        delta = 1;
        changeSlide(delta);
      } else {
        /* down swipe */
        delta = -1;
        changeSlide(delta);
      }
    }
  } /* else {
    if (xDiff > 0) {
      // left swipe 
    } else {
      // right swipe 
    }
  } */
  /* reset values */
  xDown = null;
  yDown = null;
}
