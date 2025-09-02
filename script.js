const playButton = document.getElementById("play");
const videoWrapper = document.getElementById("video-wrapper");

const media = document.querySelector("video");

media.addEventListener("ended", () => {
  if (playButton.classList.contains("playing")) {
    playButton.classList.remove("playing");
  }
});

function playPauseVideo() {
  if (playButton.classList.contains("playing")) {
    playButton.classList.remove("playing");
    media.pause();
    return;
  }
  playButton.classList.add("playing");
  media.play();
}

playButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  playPauseVideo();
});
videoWrapper.addEventListener("click", playPauseVideo);

const carouselWindowEl = document.getElementById("carousel-window");
const carouselButtons = document.getElementById("carousel-buttons");

const carouselState = new Proxy(
  {
    activeCarouselIndex: 0,
  },
  {
    set(target, prop, value) {
      if (prop !== "activeCarouselIndex") return true;

      const cardWidth =
        carouselWindowEl.parentElement.getBoundingClientRect().width;

      const translateXValue = cardWidth * value;

      carouselWindowEl.style.transform = `translateX(-${translateXValue}px)`;

      const prevButton = carouselButtons.children[target[prop]];
      const currButton = carouselButtons.children[value];

      prevButton.classList.remove("active");
      currButton.classList.add("active");

      target[prop] = value;

      return true;
    },
  }
);

setInterval(() => {
  if (carouselState.activeCarouselIndex >= 2) {
    carouselState.activeCarouselIndex = 0;
    return;
  }
  carouselState.activeCarouselIndex++;
}, 5000);

carouselButtons.addEventListener("click", (ev) => {
  const buttonEl = ev.target;
  carouselState.activeCarouselIndex = buttonEl.dataset.index;
});

const contactFormEl = document.getElementById("contact-form");

const alertModalEl = document.getElementById("alert-modal");

const nameInputEl = document.getElementById("user-name");
const emailInputEl = document.getElementById("user-email");
const messageInputEl = document.getElementById("user-message");

contactFormEl.addEventListener("submit", (e) => {
  e.preventDefault();

  nameInputEl.value = "";
  emailInputEl.value = "";
  messageInputEl.value = "";

  alertModalEl.classList.add("active");
});

alertModalEl.addEventListener("click", (e) => {
  if (e.target.dataset.action === "close") {
    alertModalEl.classList.remove("active");
  }
});
