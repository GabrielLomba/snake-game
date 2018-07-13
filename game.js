import state from './store.js'
import { updateSnake, resetSnake } from './snake.js'
import { generateRandomFood } from './food.js'
import { GAME_ITERATION_MILLISSECONDS } from './constants.js' 

const $ = (sel) => {return document.querySelector(sel)}
const cover = $('.cover');
const startButton = $('#startGameBtn');
const highestScoresBox = $('.highest-scores-box');
const highestScoresBtn = $('#highestScoresBtn');
const playAgainBox = $('.play-again-box')
const playAgainBtns = document.querySelectorAll('.again');


function hideCover () {
  cover.style.display = 'none';
}
function showCover () {
  cover.style.display = 'block';
}
function showPlayAgain () {
  showCover()
  playAgainBox.style.display = 'grid';
  showChildren(playAgainBox);
}
// showPlayAgain()
function hideCoverChildren () {
  Array.from(cover.children).forEach(child => {
    child.style.display = 'none';
  });
}
function showChildren (el) {
  Array.from(el.children).forEach(child => {
    child.style.display = 'block';
  });
}

function startgame() {
  hideCover();
  hideCoverChildren();
  generateRandomFood()
  state.GAME_HAS_STARTED = true
  return false;
  
}

function showHighestScores () {
  hideCoverChildren();
  highestScoresBox.style.display = 'grid';
}

startButton.addEventListener('click', startgame);
playAgainBtns.forEach(btn => btn.addEventListener('click', startgame))
highestScoresBtn.addEventListener('click', showHighestScores)

window.setInterval(() => {
  if (state.GAME_HAS_STARTED) {
    try {
      updateSnake()
      if (!state.FOOD_POSITION) {
        generateRandomFood()
      }
    } catch (err) {
      console.error(err)
      state.GAME_HAS_STARTED = false
      resetSnake()
    }
  }
}, GAME_ITERATION_MILLISSECONDS)