import state from './store.js'
import { updateSnake, resetSnake } from './snake.js'
import { generateRandomFood } from './food.js'
import { GAME_ITERATION_MILLISSECONDS } from './constants.js' 

const cover = document.querySelector('.cover');
const startButton = document.getElementById('startGameBtn');
const highestScoresBox = document.querySelector('.highest-scores-box');
const highestScoresBtn = document.getElementById('highestScoresBtn');
const playAgainBtns = document.querySelectorAll('.again');

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