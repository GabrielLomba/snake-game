import state from './store.js'
import { placeBlockInBoard } from './utils.js'
import { isWithinBody } from './snake.js'

const food = document.getElementById('food');
const apple = 'url("./dist/images/apple.svg")'
const peach = 'url("./dist/images/peach.svg")'
const pear = 'url("./dist/images/pear.svg")'
const cherry = 'url("./dist/images/cherry.svg")'

const generateRandomType = () => {
  let prob = Math.random()
  if(prob < .6){
    food.style.backgroundImage = apple 
  }
  if (prob >=.6 && prob <.8){
    food.style.backgroundImage = cherry
  }
  if (prob >= .8 && prob < .9) {
    food.style.backgroundImage = pear
  }
  if (prob >= .9){
    food.style.backgroundImage = peach
  }
}
export function generateRandomFood() {
  state.FOOD_POSITION = generateRandomPosition()

  while(isWithinBody(state.FOOD_POSITION)) {
    
    state.FOOD_POSITION = generateRandomPosition()
  }
  generateRandomType()
  placeBlockInBoard(food, state.FOOD_POSITION)
}

function generateRandomPosition() {
  const x = Math.floor(Math.random() * state.BOARD_COLS)
  const y = Math.floor(Math.random() * state.BOARD_ROWS)
  return { x, y }
}