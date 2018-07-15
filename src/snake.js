import { LEFT, UP, RIGHT, DOWN } from './constants.js'
import { placeBlockInBoard } from './utils.js'
import state from './store.js'

const board = document.querySelector('.board');
let bodyElements = [document.querySelector('.snake-head')]
placeBlockInBoard(bodyElements[0], state.SNAKE_BODY[0])

export function updateSnake() {
  state.SNAKE_BODY[0].direction = state.CURRENT_DIRECTION
  checkIfHasEatenFood()
  moveBody()
  if (hasCollided() || hasHitItself()) {
    throw Error('Game Over')
  }
}

const checkIfHasEatenFood = () => {
  if (isEqualPos(state.SNAKE_BODY[0])(state.FOOD_POSITION)) {
    state.FOOD_UPDATES.push(state.FOOD_POSITION)
    state.FOOD_POSITION = null;
    document.getElementById('bite').play()
  }
}

const moveBody = () => {
  const tailCopy = Object.assign({}, state.SNAKE_BODY[state.SNAKE_BODY.length - 1])

  moveBlock(0)
  for (let i = state.SNAKE_BODY.length - 1; i >= 1; --i) {
    moveBlock(i)
    state.SNAKE_BODY[i].direction = state.SNAKE_BODY[i - 1].direction
  }

  checkForFoodUpdates(tailCopy)
}

const moveBlock = (blockIdx) => {
  const block = state.SNAKE_BODY[blockIdx]
  switch (block.direction) {
    case UP:
      block.y -= 1;
      if (blockIdx === 0) {
        rotateHead(180)
      }
      break
    case RIGHT:
      block.x += 1;
      if (blockIdx === 0) {
        rotateHead(-90)
      }
      break
    case DOWN:
      block.y += 1;
      if (blockIdx === 0) {
        rotateHead(0)
      }
      break
    case LEFT:
      block.x -= 1;
      if (blockIdx === 0) {
        rotateHead(90)
      }
      break
  }

  placeBlockInBoard(bodyElements[blockIdx], block)
}

const rotateHead = (degrees) => {
  bodyElements[0].style.transform = `rotate(${degrees}deg)`;
}

const checkForFoodUpdates = (tailCopy) => {
  if (state.FOOD_UPDATES.length && isEqualPos(tailCopy)(state.FOOD_UPDATES[0])) {
    createBodyElement(tailCopy)
    state.SNAKE_BODY.push(tailCopy)
    state.FOOD_UPDATES.shift()
  }
}

const createBodyElement = (block) => {
  const newTailElement = document.createElement('div')
  newTailElement.classList.add('snake-body')
  newTailElement.style.top = `${block.y * state.BLOCK_SIZE}px`
  newTailElement.style.left = `${block.x * state.BLOCK_SIZE}px`
  board.appendChild(newTailElement)
  bodyElements.push(newTailElement)
}

const isEqualPos = (a) => (b) => a.x === b.x && a.y === b.y

const hasCollided = () =>
  state.SNAKE_BODY[0].x < 0 || state.SNAKE_BODY[0].x >= state.BOARD_COLS ||
  state.SNAKE_BODY[0].y < 0 || state.SNAKE_BODY[0].y >= state.BOARD_ROWS

const hasHitItself = () => {
  return isWithinBody(state.SNAKE_BODY[0], false)
}

export function resetSnake() {
  state.SNAKE_BODY.splice(0, state.SNAKE_BODY.length, Object.assign({}, state.INITIAL_HEAD_POSITION))
  state.CURRENT_DIRECTION = RIGHT
  state.FOOD_UPDATES.splice(0, state.FOOD_UPDATES.length)

  bodyElements.slice(1).forEach(el => {
    el.parentNode.removeChild(el)
  })
  bodyElements = [document.querySelector('.snake-head') ]
  rotateHead(-90)
  moveBody(0)
}

export function isWithinBody(block, includeHead = true) {
  let result = false
  const isEqualBlock = isEqualPos(block)

  for (let i = includeHead ? 0 : 1; i < state.SNAKE_BODY.length; ++i) {
    if (isEqualBlock(state.SNAKE_BODY[i])) {
      result = true
      break
    }
  }

  return result
}
