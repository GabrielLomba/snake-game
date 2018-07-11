'use strict'

const cover = document.querySelector('.cover');
const startButton = document.getElementById('startGameBtn');
const highestScoresBox = document.querySelector('.highest-scores-box');
const highestScoresBtn = document.getElementById('highestScoresBtn');
const playAgainBtns = document.querySelectorAll('.again');
const food = document.getElementById('food');
const width = window.innerWidth;
const height = window.innerHeight;
console.log(height);
console.log(width);

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
  const foodLeft = `${randomGen(0,width,10)}px`;
  const foodTop = `${randomGen(0,height,10)}px`;
  food.style.top = foodTop;
  food.style.left = foodLeft;
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
