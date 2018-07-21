import { updateBoard } from './board.js'
import state from './store.js'
import { updateSnake, resetSnake } from './snake.js'
import { generateRandomFood } from './food.js'
import { incrementScore, resetScore, createScoreEntry, resetUsernameInput } from './score.js'
import { $, GAME_ITERATION_MILLISSECONDS, SPACE, LEFT, DOWN, RIGHT, UP, LOSE_MESSAGE, WIN_MESSAGE } from './constants.js'

const cover = $('.cover');
const startButton = $('#startGameBtn');
const soundButton = $('.soundBtn');
const soundImg = $('#sound');
const highestScoresBox = $('.highest-scores-box');
const submitScoreBtn = $('#submitScoreBtn');
const playAgainBox = $('.play-again-box')
const messageEl = $('.message')
const playAgainBtns = document.querySelectorAll('.again');

function hideCover() {
  cover.style.display = 'none';
}

function showCover() {
  cover.style.display = 'block';
}

function showPlayAgain() {
  showCover()
  playAgainBox.style.display = 'grid';
  showChildren(playAgainBox);
  document.getElementById('bg').pause()
  if (soundImg.getAttribute('src') == './dist/images/sound.svg') {
    document.getElementById('loss').play()
  }
}

function hideCoverChildren() {
  Array.from(cover.children).forEach(child => {
    child.style.display = 'none';
  });
}
function showChildren(el) {
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
  if (soundImg.getAttribute('src') == './dist/images/sound.svg') {
    document.getElementById('bg').play()
    document.getElementById('bg').loop = true;
    document.getElementById('bg').volume = 0.2;
  }
  return false;
}

function switchSound() {
  switch (soundImg.getAttribute('src')) {
    case './dist/images/sound.svg':
      soundImg.src = './dist/images/nosound.svg';
      state.SOUND = false;
      break;
    case './dist/images/nosound.svg':
      soundImg.src = './dist/images/sound.svg';
      state.SOUND = true;
      break;
  }
}

function showHighestScores() {
  hideCoverChildren();
  highestScoresBox.style.display = 'grid';
}

startButton.addEventListener('click', startgame);
playAgainBtns.forEach(btn => btn.addEventListener('click', startgame))
submitScoreBtn.addEventListener('click', function () {
  createScoreEntry()
  showHighestScores()
})

soundButton.addEventListener('click', switchSound);

window.setInterval(() => {
  updateGameState()
  if (state.SPACE_PRESSED) {
    setTimeout(() => updateGameState(), GAME_ITERATION_MILLISSECONDS / 2)
  }
}, GAME_ITERATION_MILLISSECONDS)

function updateGameState() {
  if (state.GAME_HAS_STARTED && !state.WAITING_USER_INPUT) {
    try {
      updateSnake()
      if (!state.FOOD_POSITION) {
        incrementScore()

        if (state.SNAKE_BODY.length === state.BOARD_ROWS * state.BOARD_COLS) {
          messageEl.innerText = WIN_MESSAGE
          showPlayAgain()
        } else {
          generateRandomFood()
        }
      }
    } catch (err) {
      state.GAME_HAS_STARTED = false
      messageEl.innerText = LOSE_MESSAGE
      showPlayAgain()
    }
  }
}

window.onresize = function () {
  updateBoard()
  if (state.GAME_HAS_STARTED) {
    state.GAME_HAS_STARTED = false
    showPlayAgain()
  }
}

window.onkeydown = function (event) {
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

window.onkeyup = function (event) {
  if (event.keyCode === SPACE) {
    state.SPACE_PRESSED = false
  }
}
          //Arrow Buttons
// const moveUP= changeDirection(UP)
// const arrowUp = $('.btn-up')
// const arrowDown = $('.btn-down')
// const arrowLeft = $('.btn-left')
// const arrowRight = $('.btn-right')

// arrowUp.addEventListener('click', changeDirection(UP))
// arrowDown.addEventListener('click', changeDirection(DOWN))
// arrowLeft.addEventListener('click', changeDirection(LEFT))
// arrowRight.addEventListener('click', changeDirection(RIGHT))


            //swipe
$('#container').addEventListener('touchstart', touch, {passive: false})
$('#container').addEventListener('touchmove', touchMove, {passive: false})
// $('#container').addEventListener('touchend', handleSwipe, {passive: false})


let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;
let threshold = 40;
let diffX = 0;
let diffY = 0;
function touch(ev) {
  ev.preventDefault()
  touchstartX = ev.touches[0].screenX
  touchstartY = ev.touches[0].screenY
}
function touchMove(ev) {
  ev.preventDefault()
  diffX = Math.abs(touchstartX - touchendX)
  diffY = Math.abs(touchstartY - touchendY)
  touchendX = ev.touches[0].screenX;
  touchendY = ev.touches[0].screenY;
  if(diffX>=threshold){
    handleSwipe()
    touchstartX = ev.touches[0].screenX
    touchstartY = ev.touches[0].screenY
  } 
  if(diffY>=threshold){
    handleSwipe()
    touchstartX = ev.touches[0].screenX
    touchstartY = ev.touches[0].screenY} 
}
function handleSwipe() {
  diffX = Math.abs(touchstartX - touchendX)
  diffY = Math.abs(touchstartY - touchendY)

  if (touchendX <= touchstartX && diffX > diffY ) {
    changeDirection(LEFT);
  }

  if (touchendX >= touchstartX && diffX > diffY) {
    changeDirection(RIGHT);
  }

  if (touchendY <= touchstartY && diffY > diffX) {
    changeDirection(UP);
  }

  if (touchendY >= touchstartY && diffY > diffX) {
    changeDirection(DOWN);
  }

}
