'use strict'

const cover = document.querySelector('.cover');
const startButton = document.getElementById('startGameBtn');
const highestScoresBox = document.querySelector('.highest-scores-box');
const highestScoresBtn = document.getElementById('highestScoresBtn');
const playAgainBtns = document.querySelectorAll('.again');
const food = document.getElementById('food');
const snakeHead = document.querySelector('.snake-head');

function hideCover () {
  cover.style.display = 'none';
}

function hideCoverChildren () {
  Array.from(cover.children).forEach(child => {
    child.style.display = 'none';
  });
}

function startgame() {
  hideCover();
  hideCoverChildren();
  //DISPLAY FOOD AND SNAKE HEAD
  food.style.display = 'block';
  snakeHead.style.display = 'block';

  //RANDOMIZE POSITION OF THE FOOD
  windowWidth = windowWidth -  boardMarginLeft - food.offsetWidth;
  windowHeight = windowHeight - food.offsetHeight;
  const foodLeft = `${randomGen(boardMarginLeft,windowWidth,blockSize)}px`;
  const foodTop = `${randomGen(boardMarginBottom,windowHeight,blockSize)}px`;
  food.style.left = foodLeft;
  food.style.top = foodTop;
  //CREATE SNAKE.JS SCRIPT FILE
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "snake.js";
  document.getElementsByTagName("head")[0].appendChild(script);
  return false;
}

function showHighestScores () {
  hideCoverChildren();
  highestScoresBox.style.display = 'grid';
}

function randomGen(min, max, div){
  const res = Math.floor(Math.random() * (max - min + 1)) + min;
  return res + (div - res % div);
}

startButton.addEventListener('click', startgame);
playAgainBtns.forEach(btn => btn.addEventListener('click', startgame))
highestScoresBtn.addEventListener('click', showHighestScores)
