import state from './store.js'
import { placeBlockInBoard } from './utils.js'
import { isWithinBody } from './snake.js'

const food = document.getElementById('food');

export function generateRandomFood() {
  state.FOOD_POSITION = generateRandomPosition()

  while(isWithinBody(state.FOOD_POSITION)) {
    state.FOOD_POSITION = generateRandomPosition()
  }

  placeBlockInBoard(food, state.FOOD_POSITION)
}

function generateRandomPosition() {
  const x = Math.floor(Math.random() * state.BOARD_COLS)
  const y = Math.floor(Math.random() * state.BOARD_ROWS)
  return { x, y }
}