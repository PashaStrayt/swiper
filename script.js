'use strict';

let startPointX;
let currentTranslateX;
let lastTranslateX = 0;
const list = document.getElementById('list');
const root = document.getElementById('root');
root.addEventListener('pointerdown', (event) => {
  root.addEventListener('pointermove', moveSlider);
  startPointX = event.clientX;
});
root.addEventListener('pointerup', (event) => {
  root.removeEventListener('pointermove', moveSlider);
  lastTranslateX = currentTranslateX;
  let remainder = lastTranslateX % 500;
  if (remainder !== 0) {
    if (-remainder < 500 * 0.6) {
      lastTranslateX -= lastTranslateX % 500;
    } else {
      lastTranslateX -= lastTranslateX % 500 + 500;
    }
    list.classList.toggle('list--transition');
    setTranslateX(lastTranslateX);
    setTimeout(() => list.classList.toggle('list--transition'), 300);
  }
});

function moveSlider(event) {
  let checkValidTranslate = lastTranslateX + event.clientX - startPointX;
  if (-1250 <= checkValidTranslate && checkValidTranslate <= 250) {
    currentTranslateX = checkValidTranslate;
  }
  setTranslateX(currentTranslateX);
}

function setTranslateX(translate) {
  list.setAttribute('style', `transform: translateX(${translate}px)`);
}