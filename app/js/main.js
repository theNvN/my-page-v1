const wrapper = document.getElementById("wrapper");

// Min. threshold value for swipe to be detected
const SWIPE_THRESHOLD = 15;
const carousel = document.querySelector("#skill-items-container");
const nextBtn = document.querySelector("#nav-btn-next");
const prevBtn = document.querySelector("#nav-btn-prev");
const peekGradient = document.querySelector("#fade-gradient");
const navDots = document.querySelector("#nav-dots");

const navBar = document.getElementById("navbar");
const navMenuBtn = document.getElementById("nav-menu-btn");
const navBtnList = document.getElementById("nav-list");

// const modeSwitch = document.getElementById("slider");
const sliderIcon = document.getElementById("slider-icon");
const modeCheckbox = document.getElementById("mode-checkbox");

const connections = document.getElementById("connections");

// Starting point for touch event
let xStart = null;
let yStart = null;

const handleWheel = e => {
  if (e.deltaY < 0) {
    // scrolled up
    scrollToPrev();
  } else if (e.deltaY > 0) {
    // scrolled down
    scrollToNext();
  }
};

const handleTouchStart = e => {
  xStart = e.touches[0].clientX;
  yStart = e.touches[0].clientY;
};

const handleTouchEnd = e => {
  if (!xStart || !yStart) return;

  const xEnd = e.changedTouches[0].clientX;
  const yEnd = e.changedTouches[0].clientY;

  const xDiff = xStart - xEnd;
  const yDiff = yStart - yEnd;

  // horizontal swipe
  if (Math.abs(xDiff) > SWIPE_THRESHOLD && Math.abs(xDiff) > Math.abs(yDiff)) {
    // only work for swipe on the skill-items-container id element
    if (e.currentTarget.id != "skill-items-container") return;
    if (xDiff > 0) {
      // swipe left
      scrollToNextItem();
    } else {
      // swipe right
      scrollToPrevItem();
    }
    xStart = null;
    yStart = null;
  } else if (
    Math.abs(yDiff) > SWIPE_THRESHOLD &&
    Math.abs(yDiff) > Math.abs(xDiff)
  ) {
    if (yDiff > 0) {
      // Swipe up
      scrollToNext();
    } else {
      // Swipe down
      scrollToPrev();
    }

    xStart = null;
    yStart = null;
  }
};

autoSetMode();

window.addEventListener("wheel", handleWheel);

wrapper.addEventListener("touchstart", handleTouchStart);
wrapper.addEventListener("touchend", handleTouchEnd);
carousel.addEventListener("touchstart", handleTouchStart);
carousel.addEventListener("touchend", handleTouchEnd);

peekGradient.addEventListener("click", e => {
  scrollToNextItem();
});

nextBtn.addEventListener("click", scrollToNextItem);

prevBtn.addEventListener("click", scrollToPrevItem);

navDots.addEventListener("click", e => {
  scrollToItem(e.target);
});

navMenuBtn.addEventListener("click", toggleNavMenu);

navBtnList.addEventListener("click", e => {
  if (e.target.tagName == "A") {
    e.preventDefault();
    toggleNavMenu();

    const idx = sections.indexOf(e.target.getAttribute("href"));

    scrollToSection(idx);
  }
});

// set night mode automatically if it's b/w 7pm and 6am
function autoSetMode() {
  const hours = new Date().getHours();

  if (hours >= 19 || hours <= 5) {
    // Night mode
    sliderIcon.classList.remove("fa-sun");
    sliderIcon.classList.add("fa-moon");
    document.body.classList.add("dark");
  }
}
