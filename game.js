import './board.js'
import state from './store.js'
import { updateSnake, resetSnake } from './snake.js'
import { generateRandomFood } from './food.js'
import { incrementScore, resetScore, createScoreEntry, resetUsernameInput } from './score.js'
import { $, GAME_ITERATION_MILLISSECONDS } from './constants.js' 

const cover = $('.cover');
const startButton = $('#startGameBtn');
const highestScoresBox = $('.highest-scores-box');
const submitScoreBtn = $('#submitScoreBtn');
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
  resetSnake()
  resetScore()
  resetUsernameInput()
  state.GAME_HAS_STARTED = true
  return false;
}

function showHighestScores () {
  hideCoverChildren();
  highestScoresBox.style.display = 'grid';
}

startButton.addEventListener('click', startgame);
playAgainBtns.forEach(btn => btn.addEventListener('click', startgame))
submitScoreBtn.addEventListener('click', function () {
  createScoreEntry()
  showHighestScores()
})

window.setInterval(() => {
  if (state.GAME_HAS_STARTED) {
    try {
      updateSnake()
      if (!state.FOOD_POSITION) {
        incrementScore()
        generateRandomFood()
      }
    } catch (err) {
      console.error(err)
      state.GAME_HAS_STARTED = false
      showPlayAgain()
    }
  }
}, GAME_ITERATION_MILLISSECONDS)