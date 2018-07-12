const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
const BOARD = { cols: 100, rows: 100 }

let state = 'alive'
const initialHead = { x: 0, y: 0, direction: null }
const body = [initialHead]

let currentDirection = RIGHT
const foodCss = document.getElementById('food');

let foodPosition = { x: parseInt(foodCss.style.left), y: parseInt(foodCss.style.top)}
console.log(foodPosition);
let foodUpdates = []

const changeDirection = (keyCode) => {
  if (keyCode >= LEFT && keyCode <= DOWN) {
    const isOppositeDirection = Math.abs(currentDirection - keyCode) === 2
    if (!isOppositeDirection) {
      currentDirection = keyCode
    }
  }
}

const setFoodPosition = (position) => {
  foodPosition = position
}

const updateSnake = () => {
  body[0].direction = currentDirection
  checkIfHasEatenFood()
  moveBody()
  if (hasCollided() || hasHitItself()) {
    state = 'dead'
    throw Error('Game Over')
  }
}

const checkIfHasEatenFood = () => {
  if(foodPosition && isEqualPos(body[0])(foodPosition)) {
    console.log('FOOD UPDATE', foodPosition)
    foodUpdates.push(foodPosition)
  }
}

const moveBody = () => {
  const tailCopy = Object.assign({}, body[body.length - 1])
  moveBlock(body[0])
  for (let i = 1; i < body.length; ++i) {
    moveBlock(body[i])
    body[i].direction = body[i - 1].direction
  }

  checkForFoodUpdates(tailCopy)
}

const moveBlock = (block) => {
  switch (block.direction) {
    case UP:
      block.y -= blockSize;
      snakeHead.style.top = `${block.y}px`
      break
    case RIGHT:
      block.x+= blockSize;
      snakeHead.style.left = `${block.x}px`
      break
    case DOWN:
      block.y += blockSize;
      snakeHead.style.top = `${block.y}px`
      break
    case LEFT:
      block.x -= blockSize;
      snakeHead.style.left = `${block.x}px`
      break
  }
}

const checkForFoodUpdates = (tailCopy) => {
  if (foodUpdates.length && isEqualPos(tailCopy)(foodUpdates[0])) {
    console.log('BODY INSCREASED')
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
  return body.some( (block, i) => {
    if (i !== 0) {
      return isEqualPos(body[0])(block)
    }
  })
}

document.addEventListener('keydown', (ev) => {
  changeDirection(ev.keyCode)

})

window.setInterval(() => {
  console.log('BEFORE', body[0].x, body[0].y, body.length)
  updateSnake()
  console.log('AFTER', body[0].x, body[0].y, body.length)
}, 300)

// body[0].x = 10
// body[0].y = 10
currentDirection = RIGHT
// foodPosition = { x: 11, y: 10 }
// currentDirection = LEFT
// updateSnake()
// debugger
