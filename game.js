'use strict'

const cover = document.querySelector('.cover');
const board = document.querySelector('.board');
const boardCSSproperties = window.getComputedStyle(board);
const startButton = document.getElementById('startGameBtn');
const highestScoresBox = document.querySelector('.highest-scores-box');
const highestScoresBtn = document.getElementById('highestScoresBtn');
const playAgainBtns = document.querySelectorAll('.again');
const food = document.getElementById('food');
const snakeHead = document.querySelector('.snake-head');
const width = window.innerWidth;
const height = window.innerHeight;
var widthNumber = parseInt(width);
var heightNumber = parseInt(height);
//SIZE OF THE BOUNDARIES
const blockSize = 30;
// CALCULATE WIDTH AND HEIGHT OF BOARD TO MATCH THE BLOCKSIZE
heightNumber = heightNumber - (heightNumber % blockSize) - (blockSize*2);
widthNumber = widthNumber - (widthNumber % blockSize) - (blockSize*2);
//GET MARGINS ON THE BOARD THAT CAME FROM THE CSS STYLESHEET.
const boardMarginLeft = parseInt(boardCSSproperties.marginLeft);
const boardMarginBottom = parseInt(boardCSSproperties.marginBottom);
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
  //ASIGN PROPER WIDTH AND HEIGHT
  board.style.height = `${heightNumber}px`;
  board.style.width = `${widthNumber}px`;


  //RANDOMIZE POSITION OF THE FOOD
  widthNumber = widthNumber -  boardMarginLeft - food.offsetWidth;
  heightNumber = heightNumber - food.offsetHeight;
  const foodLeft = `${randomGen(boardMarginLeft,widthNumber,blockSize)}px`;
  const foodTop = `${randomGen(boardMarginBottom,heightNumber,blockSize)}px`;
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
