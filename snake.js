const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
const BOARD = { cols: 100, rows: 100 }

let state = 'alive'
const initialHead = { x: 1, y: 1, direction: null }
const body = [initialHead]

let currentDirection = RIGHT
let foodPosition
let foodUpdates = []

const changeDirection = (keyCode) => {
  if (keyCode >= LEFT && keyCode <= DOWN) {
    currentDirection = keyCode
  }
}

const setFoodPosition = (position) => {
  foodPosition = position
}

const updateSnake = () => {
  checkIfHasEatenFood()
  moveBody()
  if (hasCollided() || hasHitItself()) {
    state = 'dead'
    throw Error('Game Over')
  }
}

const checkIfHasEatenFood = () => {
  if(isEqualPos(body[0])(foodPosition)) {
    foodUpdates.push(foodPosition)
  }
}

const moveBody = () => {
  body[0].direction = currentDirection
  moveBlock(body[0])

  const tailCopy = Object.assign({}, body[body.length - 1])

  for (let i = 1; i < body.length; ++i) {
    moveBlock(body[i])
    body[i].direction = body[i - 1].direction
  }

  checkForFoodUpdates(tailCopy)
}

const moveBlock = (block) => {
  switch (block.direction) {
    case UP:
      --block.y
      break
    case RIGHT:
      ++block.x
      break
    case DOWN:
      ++block.y
      break
    case LEFT:
      --block.x
  }
}

const checkForFoodUpdates = (tailCopy) => {
  if (foodUpdates.length && isEqualPos(tailCopy)(foodUpdates[0])) {
    body.push(tailCopy)
    foodUpdates.shift()
  }
}

const resetSnake = () => {
  body = [initialHead]
}

const isEqualPos = (a) => (b) => a.x === b.x && a.y === b.y

const hasCollided = () => body[0].x < 0 || body[0].x > BOARD.cols || body[0].y < 0 || body[0].y > BOARD.rows

const hasHitItself = () => {
  return body.some(block => {
    if (i !== 0) {
      return isEqualPos(body[0])(block)
    }
  })
}
