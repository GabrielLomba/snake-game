import { updateBoard } from './board.js'
import state from './store.js'
import { updateSnake, resetSnake } from './snake.js'
import { generateRandomFood } from './food.js'
import { incrementScore, resetScore, createScoreEntry, resetUsernameInput } from './score.js'
import { $, GAME_ITERATION_MILLISSECONDS, SPACE, LEFT, DOWN } from './constants.js'

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
  document.getElementById('bg').pause()
  document.getElementById('loss').play()
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
  state.WAITING_USER_INPUT = true
  document.getElementById('bg').play()
  document.getElementById('bg').loop = true;
  document.getElementById('bg').volume = 0.2;
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
  updateGameState()
  if(state.SPACE_PRESSED) {
    setTimeout(() => updateGameState(), GAME_ITERATION_MILLISSECONDS / 2)
  }
}, GAME_ITERATION_MILLISSECONDS)

function updateGameState() {
  if (state.GAME_HAS_STARTED && !state.WAITING_USER_INPUT) {
    try {
      updateSnake()
      if (!state.FOOD_POSITION) {
        incrementScore()
        generateRandomFood()
      }
    } catch (err) {
      state.GAME_HAS_STARTED = false
      showPlayAgain()
    }
  }
}

window.onresize = function() {
  updateBoard()
  if(state.GAME_HAS_STARTED) {
    state.GAME_HAS_STARTED = false
    showPlayAgain()
  }
}

window.onkeydown = function(event) {
  changeDirection(event.keyCode)
  if (event.keyCode === SPACE) {
    state.SPACE_PRESSED = true
  }
}

const changeDirection = (keyCode) => {
  state.WAITING_USER_INPUT = false
  if (keyCode >= LEFT && keyCode <= DOWN) {
    const headDirection = state.SNAKE_BODY[0].direction
    const isOppositeDirection = Math.abs(headDirection - keyCode) === 2
    if (!isOppositeDirection) {
      state.CURRENT_DIRECTION = keyCode
    }
  }
}

window.onkeyup = function(event) {
  if (event.keyCode === SPACE) {
    state.SPACE_PRESSED = false
  }
}
