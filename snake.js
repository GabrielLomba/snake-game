import { LEFT, UP, RIGHT, DOWN } from './constants.js'
import { placeBlockInBoard } from './utils.js'
import state from './store.js'

const board = document.querySelector('.board');
const bodyElements = [document.querySelector('.snake-head')]
placeBlockInBoard(bodyElements[0], state.SNAKE_BODY[0])

const changeDirection = (keyCode) => {
  if (keyCode >= LEFT && keyCode <= DOWN) {
    const headDirection = state.SNAKE_BODY[0].direction
    const isOppositeDirection = Math.abs(headDirection - keyCode) === 2
    if (!isOppositeDirection) {
      state.CURRENT_DIRECTION = keyCode
    }
  }
}

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
    console.log('FOOD UPDATE', state.FOOD_POSITION)
    state.FOOD_UPDATES.push(state.FOOD_POSITION)
    state.FOOD_POSITION = null
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
      break
    case RIGHT:
      block.x += 1;
      break
    case DOWN:
      block.y += 1;
      break
    case LEFT:
      block.x -= 1;
      break
  }

  placeBlockInBoard(bodyElements[blockIdx], block)
}

const checkForFoodUpdates = (tailCopy) => {
  if (state.FOOD_UPDATES.length && isEqualPos(tailCopy)(state.FOOD_UPDATES[0])) {
    console.log('BODY INSCREASED')
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
  return state.SNAKE_BODY.some((block, i) => {
    if (i !== 0) {
      return hasSamePositionAsHead(block)
    }
  })
}

document.addEventListener('keydown', (ev) => {
  changeDirection(ev.keyCode)
})

export function resetSnake() {
  state.SNAKE_BODY = [state.INITIAL_HEAD_POSITION]
}

export function hasSamePositionAsHead(block) {
  return isEqualPos(state.SNAKE_BODY[0])(block)
}
